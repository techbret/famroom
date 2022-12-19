import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../../config/firebase";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion, onSnapshot, query, collection, where, increment, addDoc, orderBy, deleteField, arrayRemove, serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { displayName } from "@heroicons/react/24/outline/MinusCircleIcon";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({})
  const [profileUrl, setProfileUrl] = useState('');
  const [group, setGroup] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([])

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

  const sendMessage = async (roomID, userData, text) => {
    try {
      await addDoc(collection(db, 'chat-rooms', roomID, 'messages'), {
        uid: userData._id,
        displayName: userData.displayName,
        text: text.trim(),
        timestamp: serverTimestamp(),
      })

    } catch (err) {
      console.log(err);
    }
  }

  const getMessages = (roomID, callback) => {
    const q = query(collection(db, 'chat-rooms', roomID, 'messages'), orderBy('timestamp', 'asc'));
    return onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages)
    })
  }

  

  const joinGroup = async ({joinData}) => {
    try {
      await updateDoc(doc(db, "groups", joinData.id), {
        pendingMembers: arrayUnion({
          firstName: joinData.firstName,
          lastName: joinData.lastName,
          link: joinData.displayName,
          profileID: joinData.profileID,
        })
      })
      await updateDoc(doc(db, "users", joinData.profileID), {
        pendingGroups: arrayUnion({
          _id: joinData.id,
          link: '/' + joinData.id,
          name: joinData.id + ' (pending)'
        })
      })

    } catch (err) {
      console.log(err)
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

  const removeFromGroup = async (userID, groupID, link, name) => {
    try {
      await updateDoc(doc(db, "users", userID), {
        familyCode: arrayRemove(groupID),
        groups: arrayRemove({
          _id: groupID,
          link: link,
          name: name
        })
      })
    } catch (err) {
      console.log(err)

    }
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoggedIn(false);
    return signOut(auth);
  };
  

  const getPosts = (id) => {
    const q = query(collection(db, "posts"), where("groupID", "in", id.familyCode), orderBy("timestamp", "desc"));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setMessages(posts)
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
    <UserContext.Provider value={{ createUser, user, logout, signIn, isLoggedIn, profile, updateUser, getImage, profileUrl, createPost, createGroup, group, messages, uploadProfile, removeFromGroup, joinGroup, getMessages, sendMessage, chats}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
