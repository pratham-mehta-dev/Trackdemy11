import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';

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
    const snapshot = await getDocs(collection(db, 'courses'));

    console.log(`\nTotal courses in Firestore: ${snapshot.size}\n`);
    snapshot.forEach(d => {
        const data = d.data();
        console.log(`docId: "${d.id}" | id field: "${data.id}" | title: "${data.title}" | price: ${data.price}`);
    });

    // Check if course with docId '4' exists
    const hasId4 = snapshot.docs.some(d => d.id === '4');
    if (!hasId4) {
        console.log('\n⚠️  No document with docId "4" found. Creating it now...');
        await setDoc(doc(db, 'courses', '4'), {
            id: '4',
            title: 'Data Analyst Course 2025',
            description: 'The skills you need to become a BI Analyst - Stats, Data Vis, SQL, Tableau, and more.',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
            instructor: 'Rahul Verma',
            duration: '18 Hours',
            rating: 4.5,
            price: 1099,
            originalPrice: 1499,
            discountPercentage: 27,
            category: 'Business',
            ratingCount: 2200,
            lectures: 140,
            level: 'All Levels',
            bestseller: false,
            lastUpdated: '01/2025',
            language: 'English',
            enrolledCount: 1200
        });
        console.log('✅ Course "Data Analyst Course 2025" created in Firestore with docId "4"!');
    } else {
        console.log('\n✅ Course with docId "4" already exists.');
    }

    process.exit(0);
}

run().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
