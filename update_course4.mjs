import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBmwIN7DcXHofMGUJZjA4BG2qaQzBJhUIE",
    authDomain: "trackdemy.firebaseapp.com",
    projectId: "trackdemy",
    storageBucket: "trackdemy.firebasestorage.app",
    messagingSenderId: "24974970866",
    appId: "1:24974970866:web:45a3f1094b4fc7859d256b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    const courseRef = doc(db, 'courses', '4');
    const snap = await getDoc(courseRef);

    if (!snap.exists()) {
        console.log('❌ Course with docId "4" not found in Firestore.');
        process.exit(1);
    }

    const before = snap.data();
    console.log(`\nBefore update:`);
    console.log(`  title: "${before.title}"`);
    console.log(`  price: ${before.price}`);
    console.log(`  originalPrice: ${before.originalPrice}`);
    console.log(`  discountPercentage: ${before.discountPercentage}`);

    await updateDoc(courseRef, {
        title: 'Data Analyst Course 2025',
        price: 1099,
        originalPrice: 1499,
        discountPercentage: 26,
    });

    console.log(`\n✅ Updated successfully!`);
    console.log(`  title: "Data Analyst Course 2025"`);
    console.log(`  price: 1099`);
    console.log(`  originalPrice: 1499`);
    console.log(`  discountPercentage: 26`);

    process.exit(0);
}

run().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
