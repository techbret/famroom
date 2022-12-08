import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../../config/firebase";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({})
  const [profileUrl, setProfileUrl] = useState('')

  const userID = useParams();

  const createUser = (email, password, displayName) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    ).then((userCredential) => {
      setDoc(doc(db, "users", userCredential.user.uid), {
        displayName: displayName,
        email: email,
        _id: userCredential.user.uid,
      });
    });
  };

  const getImage = async (url) => { {
    const imgUrl = await getDownloadURL(ref(storage, url));
    setProfileUrl(imgUrl);
  }

  }

  const updateUser = async ({userData}) => {
    try {
        await updateDoc(doc(db, "users", user.uid), userData);
    } catch (err) {
        console.log(err.message);
        alert(`There was an error: ${err}`)
    }
  }

  const signIn = (email, password) => {       
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoggedIn(false);
    return signOut(auth);
  };

  const getUserInfo = async (docID) => {    
        try {
            const docRef = doc(db, "users", docID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data())
                getImage(docSnap.data().profilePicUrl)
            } else {
                console.log("No such document!")
            }
        } catch (e) {
            console.log(e);
        }      
  }
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {      
      setUser(currentUser);
      if (currentUser) {
        setIsLoggedIn(true);
        getUserInfo(currentUser.uid)
        console.log('It ran again')
      } else {
        setIsLoggedIn(false);
      };    
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, isLoggedIn, profile, updateUser, getImage, profileUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
