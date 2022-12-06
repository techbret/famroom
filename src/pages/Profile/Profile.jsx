import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Profile() {
  const [user, setUser] = useState({});
  let { userId } = useParams();
  

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      setUser({ ...docSnap.data() });
      console.log(docSnap.data());
    };
    getData();
  }, []);


  return (
    <div>
      Profile {userId}
      <h1>Welcome {user.firstName} {user.lastName}</h1>
      <h3>{user.city}, {user.state}</h3>

    </div>
  );
}
