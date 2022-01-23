// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCtBYUi_ncJwNGC4w8AqxP-f41IwMt-PJ8',
	authDomain: 'sgm-music-7b246.firebaseapp.com',
	projectId: 'sgm-music-7b246',
	storageBucket: 'sgm-music-7b246.appspot.com',
	messagingSenderId: '1012685283392',
	appId: '1:1012685283392:web:ca78fb599f06553c557fa5',
	measurementId: 'G-RWN093WGLE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
