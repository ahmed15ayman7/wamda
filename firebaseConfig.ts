// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB38MybdADsZWgn-tkOfAJnuAM-R6oPxk8",
    authDomain: "wamda-electric.firebaseapp.com",
    projectId: "wamda-electric",
    storageBucket: "wamda-electric.appspot.com",
    messagingSenderId: "181386000993",
    appId: "1:181386000993:web:fc6403f439a0e8482e4820",
    measurementId: "G-8HHPGBZHWK"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
