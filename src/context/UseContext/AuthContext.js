import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../../config/firebase";
import { db } from "../../config/firebase";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  query,
  collection,
  where,
  increment,
  addDoc,
  orderBy,
  deleteField,
  arrayRemove,
  serverTimestamp,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { displayName } from "@heroicons/react/24/outline/MinusCircleIcon";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [profileUrl, setProfileUrl] = useState("");
  const [group, setGroup] = useState("");
  const [messages, setMessages] = useState([]);
  const [upDates, setUpdates] = useState([]);
  const [chats, setChats] = useState([]);

  const uploadProfile = (file) => {
    if (file == null) return;
    const imageRef = ref(
      storage,
      "/userProfilePics/" + profile.displayName + "_profilepic"
    );
    uploadBytes(imageRef, file);
    updateDoc(doc(db, "users", user.uid), { uploadedPicture: true });
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
        status: "Update status",
        notifications: [],
      });
    });
  };

  const getImage = async (url) => {
    const imgUrl = await getDownloadURL(ref(storage, url));
    setProfileUrl(imgUrl);
  };

  const updateUser = async ({ userData }) => {
    try {
      await updateDoc(doc(db, "users", user.uid), userData);
    } catch (err) {
      console.log(err.message);
      alert(`There was an error: ${err}`);
    }
  };

  const updateStatus = async (statusData) => {
    try {
      await updateDoc(doc(db, "users", statusData.id), {status: statusData.status})
        .then(
          await statusData.groups?.forEach((group) => {
            setDoc(doc(db, "updates", statusData.id + group), {
              profileID: statusData.id,
              profilePic: statusData.profilePic,
              timestamp: serverTimestamp(),
              group: group,
              status: statusData.status,
              firstName: statusData.firstName,
              lastName: statusData.lastName
            })            
          })          
          )
    } catch (err) {
      console.log(err)
    }
  }   


  const sendMessage = async (roomID, userData, text) => {
    try {
      await addDoc(collection(db, "chat-rooms", roomID, "messages"), {
        uid: userData._id,
        displayName: userData.displayName,
        text: text.trim(),
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = (roomID, callback) => {
    const q = query(
      collection(db, "chat-rooms", roomID, "messages"),
      orderBy("timestamp", "asc")
    );
    return onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
  };

  const joinGroup = async ({ joinData }) => {
    const map = {
      _id: joinData.id,
      link: "/" + joinData.id,
      name: joinData.id + " (pending)"
    };
    
    const index = joinData.id
    try {
      const imgUrl = await getDownloadURL(ref(storage, joinData.profileURL));
      await addDoc(collection(db, "groups", joinData.id, "pendingMembers"), {
          firstName: joinData.firstName,
          lastName: joinData.lastName,
          link: joinData.displayName,
          profileID: joinData.profileID,
          profilePic: imgUrl
      });
      await updateDoc(doc(db, "users", joinData.profileID), {
        pendingGroups: {
          [index]: map
        },
      });
      const userRef = await getDoc(doc(db, "groups", joinData.id));
      if (userRef.exists()) {
        await updateDoc(doc(db, "users", userRef.data().admin), {
          notifications: arrayUnion({
              firstName: joinData.firstName,
              lastName: joinData.lastName,
              link: joinData.displayName,
              profileID: joinData.profileID,
              groupID: joinData.id,
              type: 1
          }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getGroupAdds = (groupID, callback) => {
    const q = query(
      collection(db, "groups", groupID, "pendingMembers")
    );
    return onSnapshot(q, (querySnapshot) => {
      const subscribers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(subscribers)
    })
  };

  const approveAdd = async (userData) => {    
    try {
      const batch = writeBatch(db)
      batch.update(doc(db, "groups", userData.groupID), {
        members: arrayUnion(userData.uid)
      })
      batch.delete(doc(db, "groups", userData.groupID, "pendingMembers", userData.docRef))
      batch.update(doc(db, "users", userData.uid), {
        groups: arrayUnion({
          _id: userData.groupID,
          link: '/' + userData.groupID,
          name: userData.groupName
        }),
        familyCode: arrayUnion(userData.groupID),
        pendingGroups: arrayRemove(userData.groupID)
      })
      await batch.commit()
    } catch (err) {
      console.log(err)
    }
  }
  

 

  const createPost = async (postData) => {
    try {
      await addDoc(collection(db, "posts"), postData);
      await updateDoc(doc(db, "users", postData.profileID), {
        postCount: increment(1),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createGroup = async ({ groupData }) => {

    const index = groupData.id
    const q = await getDoc(doc(db, "users", groupData.admin))
    const existingMapField = q.data().groups
    const map = {
      ...existingMapField,
      [index]: {
        _id: groupData.id,
        link: "/" + groupData.id,
        name: groupData.groupName,
      }
    }


    try {
      await setDoc(doc(db, "groups", groupData.id), groupData)
        .then(
          await updateDoc(doc(db, "users", groupData.admin), {
            familyCode: arrayUnion(groupData.id),
            groups: map,
          }, {merge: true})
        );
    } catch (err) {
      alert(`There was an error ${err}`);
    }
  };

  const removeFromGroup = async (userID, groupID, link, name) => {
    try {
      await updateDoc(doc(db, "users", userID), {
        familyCode: arrayRemove(groupID),
        groups: arrayRemove({
          _id: groupID,
          link: link,
          name: name,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoggedIn(false);
    return signOut(auth);
  };
  
  const getPosts = (id) => {
    const q = query(
      collection(db, "posts"),
      where("groupID", "in", id.familyCode),
      orderBy("timestamp", "desc")
    );
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setMessages(posts);
      return unsuscribe();
    });
  };

  const getStatuses = (id) => {
    const q = query(
      collection(db, "updates"),
      where("group", "in", id.familyCode),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const statuses = [];
      querySnapshot.forEach((doc) => {
        statuses.push(doc.data());
      })
      setUpdates(statuses);
      return unsubscribe
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoggedIn(true);
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setProfile(doc.data());
          getImage(doc.data().profilePicUrl);
          getPosts(doc.data());
          getStatuses(doc.data());
        });
        console.log("It ran again");
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        isLoggedIn,
        profile,
        updateUser,
        getImage,
        profileUrl,
        createPost,
        createGroup,
        group,
        messages,
        uploadProfile,
        removeFromGroup,
        joinGroup,
        getMessages,
        sendMessage,
        chats,
        getGroupAdds,
        updateStatus,
        upDates,
        approveAdd
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
