// delete_user.mjs
// Deletes mehtapathu@gmail.com from Firebase Auth + Firestore

import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    deleteUser,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBmwIN7DcXHofMGUJZjA4BG2qaQzBJhUIE",
    authDomain: "trackdemy.firebaseapp.com",
    projectId: "trackdemy",
    storageBucket: "trackdemy.firebasestorage.app",
    messagingSenderId: "24974970866",
    appId: "1:24974970866:web:45a3f1094b4fc7859d256b"
};

const EMAIL = 'mehtapathu@gmail.com';

// ⚠️  Put the password for this account here so we can sign in and delete it.
// Firebase client SDK can only delete a user that is currently signed in.
const PASSWORD = process.argv[2]; // pass as: node delete_user.mjs <password>

if (!PASSWORD) {
    console.error('❌  Usage: node delete_user.mjs <password_for_mehtapathu@gmail.com>');
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function deleteSubcollection(parentDocRef, subcollectionName) {
    const snap = await getDocs(collection(db, parentDocRef.path, subcollectionName));
    for (const d of snap.docs) {
        await deleteDoc(d.ref);
        console.log(`  🗑  Deleted ${subcollectionName}/${d.id}`);
    }
}

async function run() {
    console.log(`\n🔐  Signing in as ${EMAIL}...`);
    const cred = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
    const uid = cred.user.uid;
    console.log(`✅  Signed in. UID = ${uid}`);

    // ── 1. Delete Firestore subcollections ──────────────────────────────────
    const userDocRef = doc(db, 'users', uid);

    console.log('\n🗄  Deleting Firestore subcollections...');
    await deleteSubcollection(userDocRef, 'payments');
    await deleteSubcollection(userDocRef, 'notifications');
    await deleteSubcollection(userDocRef, 'badges');

    // ── 2. Delete main users document ───────────────────────────────────────
    await deleteDoc(userDocRef);
    console.log(`✅  Deleted Firestore users/${uid}`);

    // ── 3. Delete Firebase Auth account ─────────────────────────────────────
    await deleteUser(cred.user);
    console.log(`✅  Deleted Firebase Auth account for ${EMAIL}`);

    console.log('\n🎉  Done! The account has been fully removed. You can register fresh.\n');
    process.exit(0);
}

run().catch(err => {
    console.error('\n❌  Error:', err.message);
    process.exit(1);
});
