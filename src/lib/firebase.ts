import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
	apiKey: 'AIzaSyBrLP9UODt2HHwBiaHHN5Rw4IZaqlecPDE',
	authDomain: 'lifting-kesval-com.firebaseapp.com',
	projectId: 'lifting-kesval-com',
	storageBucket: 'lifting-kesval-com.appspot.com',
	messagingSenderId: '742666023933',
	appId: '1:742666023933:web:89672fb0cab43d52c6df94',
	measurementId: 'G-8HX9KEZPJ2'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const firestore = getFirestore(app);
