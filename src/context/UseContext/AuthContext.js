import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../../config/firebase";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion, onSnapshot, query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({})
  const [profileUrl, setProfileUrl] = useState('');
  const [group, setGroup] = useState('');

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
        status: "Update status"
      });
    });
  };

  const getImage = async (url) => {
    const imgUrl = await getDownloadURL(ref(storage, url));
    setProfileUrl(imgUrl);
  }

  const updateUser = async ({ userData }) => {
    try {
      await updateDoc(doc(db, "users", user.uid), userData);
    } catch (err) {
      console.log(err.message);
      alert(`There was an error: ${err}`)
    }
  }

   const createPost = async ( postData ) => {
    try {
      const newID = postData;      
      await addDoc(collection(db, 'group-posts', newID.groupID, 'posts' ),  postData)
    } catch (error) {
      console.log(error)
    }
  }

  

  const createGroup = async ({ groupData }) => {
    try {
      await setDoc(doc(db, "groups", groupData.id), groupData).then(await setDoc(doc(db, "posts", groupData.id), { "posts": [] })).then(
        await updateDoc(doc(db, "users", groupData.admin), {
          familyCode: arrayUnion({
            _id: groupData.id,
            name: groupData.groupName,
            link: '/' + groupData.id
          })
        })
      );

    } catch (err) {
      alert(`There was an error ${err}`)
    }
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoggedIn(false);
    return signOut(auth);
  };
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoggedIn(true);
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setProfile(doc.data());
          getImage(doc.data().profilePicUrl);
          setGroup(doc.data().familyCode[0])  
        });
        console.log('It ran again');


      } else {
        setIsLoggedIn(false);
      };
    });
    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, isLoggedIn, profile, updateUser, getImage, profileUrl, createPost, createGroup, group}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
