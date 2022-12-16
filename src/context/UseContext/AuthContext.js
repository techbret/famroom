import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../../config/firebase";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion, onSnapshot, query, collection, where, increment, addDoc, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({})
  const [profileUrl, setProfileUrl] = useState('');
  const [group, setGroup] = useState('');
  const [messages, setMessages] = useState([]);

  const uploadProfile = (file) => {
    if (file == null) return;
    const imageRef = ref(storage, "/userProfilePics/" + profile.displayName + "_profilepic");
    uploadBytes(imageRef, file);
    updateDoc(doc(db, "users", user.uid), {uploadedPicture: true});
    
  };

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
      await addDoc(collection(db, 'posts'),  postData);
      await updateDoc(doc(db, 'users', postData.profileID), {postCount: increment(1)})
    } catch (error) {
      console.log(error)
    }
  }  

  const createGroup = async ({ groupData }) => {
    try {
      await setDoc(doc(db, "groups", groupData.id), groupData).then(await setDoc(doc(db, "posts", groupData.id), { "posts": [] })).then(
        await updateDoc(doc(db, "users", groupData.admin), {
          familyCode: arrayUnion(groupData.id),
          groups: arrayUnion({
            _id: groupData.id,
            link: '/' + groupData.id,
            name: groupData.groupName
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
  
  // const getPosts(callback, groupRef) {
  //   return onSnapshot(
  //     query(
  //       collection(db, "group-posts", groupRef, "posts"),
  //       orderBy("timestamp", "desc")
  //     ),
  //     (querySnapshot) => {
  //       const posts = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       callback(posts);
  //     }
  //   )
  // }

  const getPosts = (id) => {
    const q = query(collection(db, "posts"), where("groupID", "in", id.familyCode), orderBy("timestamp", "desc"));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setMessages(posts)
      console.log(posts)
      return unsuscribe()
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoggedIn(true);
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setProfile(doc.data());
          getImage(doc.data().profilePicUrl); 
          getPosts(doc.data()) 
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
    <UserContext.Provider value={{ createUser, user, logout, signIn, isLoggedIn, profile, updateUser, getImage, profileUrl, createPost, createGroup, group, messages, uploadProfile}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
