import { initializeApp } from 'firebase/app';

import { getAuth , signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD9cLfdHyJCiMyOxO7k5zMeWV-wrYD2el0",
    authDomain: "crwn-clothing-dcb74.firebaseapp.com",
    projectId: "crwn-clothing-dcb74",
    storageBucket: "crwn-clothing-dcb74.appspot.com",
    messagingSenderId: "432131407158",
    appId: "1:432131407158:web:1b1ac21aa03f8f69474797"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) =>{
        const userDocRef = doc(db, 'users', userAuth.uid);

        console.log(userDocRef);

        const userSnapshot = await getDoc(userDocRef);
        console.log(userSnapshot.exists());
    

    //if user data does not exist
    //create/set the document with the data from userAuth in my collection    
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, { displayName, email, createdAt})
        } 
        catch(error){
           console.log('error creating the user', error.message);
        }
    }
    
        
    //if user data exists
    //return userDocRef
    return userDocRef;
    

  };