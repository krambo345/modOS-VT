import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "${{ secrets.FIREBASE_API }}",
  authDomain: "modos-webos.firebaseapp.com",
  projectId: "modos-webos",
  storageBucket: "modos-webos.firebasestorage.app",
  messagingSenderId: "403933601096",
  appId: "1:403933601096:web:6cd2d539530a8f00b8e77d",
  measurementId: "G-Z5TBYHEBZW"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getPackages() {
  const libCollection = collection(db, 'lib');
  const snapshot = await getDocs(libCollection);
  const list = snapshot.docs.map(doc => doc.data());
  return list;
}
