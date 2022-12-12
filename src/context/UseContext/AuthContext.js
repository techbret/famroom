import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../../config/firebase";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion, onSnapshot, query, collection, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({})
  const [profileUrl, setProfileUrl] = useState('');
  const [posts, setPosts] = useState([])

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

  const createPost = async ({ postData }) => {
    try {
      await updateDoc(doc(db, "posts", postData.groupID), {
        posts: arrayUnion({ postData })
      });
    } catch (err) {
      alert(`There was an error ${err}`)
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

  const getPosts = async () => {
    const docRef = doc(db, "posts", "lava824");
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists) {
      const posts = docSnapshot.data().posts;
      setPosts(posts);
    } else {
      throw new Error("Document does not exist");
    }
  };

  // const getAllPosts = async () => {
  //   const q = query(collection(db, "posts"));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach((post) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     const arr = []
  //     const docRef = doc(db, "users", user.uid);
  //     const docSnap = getDoc(docRef).data();      
  //     for (let i = 0; docSnap.familyCode.length; i++) {
  //       if (post.id === profile.familyCode[i]) {
  //         console.log(post.id, " => ", post.data());
  //         arr.push(post.data())
          
  //       }
  //     }
  //     console.log(arr)  
  //   });
  // };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoggedIn(true);
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setProfile(doc.data());
          getImage(doc.data().profilePicUrl)
        });
        onSnapshot(doc(db, "posts", "lava824"), (doc) => {
          getPosts();
        })
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
    <UserContext.Provider value={{ createUser, user, logout, signIn, isLoggedIn, profile, updateUser, getImage, profileUrl, createPost, createGroup, posts }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
