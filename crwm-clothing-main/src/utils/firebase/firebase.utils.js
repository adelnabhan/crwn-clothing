import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup ,GoogleAuthProvider, signOut , onAuthStateChanged , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import{
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs

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


  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef, object.title.toLowerCase())
      batch.set(docRef,object)
    })

    await batch.commit();

  }
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
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
    return userSnapshot;
  };

  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email|| !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
  };

  export const createSignInWithEmailAndPassword = async (email,password)=>{
    if(!email|| !password) return;
    return await signInWithEmailAndPassword(auth, email,password);
  
  };

  export const signOutUser = async () => await signOut(auth);
  export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)

  export const getCategoriesAndDocuments = async () => {

    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    //   const{ title, items} = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // },{})

    // return categoryMap

  }

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      )
    })
  }