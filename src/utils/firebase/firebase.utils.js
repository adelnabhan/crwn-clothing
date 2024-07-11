import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup ,GoogleAuthProvider , createUserWithEmailAndPassword} from 'firebase/auth'
import{
  getFirestore,
  doc,
  getDoc,
  setDoc,
}
from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyD8Mv6moeBIjRkW24qduH0MR3QmfEuYz9E",
    authDomain: "test-24afa.firebaseapp.com",
    projectId: "test-24afa",
    storageBucket: "test-24afa.appspot.com",
    messagingSenderId: "137119538699",
    appId: "1:137119538699:web:284989eb7f64f6aca5b10e",
    measurementId: "G-11N1H1LZSS"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef)
    if(!userSnapShot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch(error){
        console.log('error creating the user' , error.message)
      }
    }
    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email|| !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
  }
  