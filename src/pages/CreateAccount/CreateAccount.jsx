import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  loggedInState,
  tokenState,
  userState,
} from "../../context/recoil/loginAtoms";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [authState, setAuthState] = useRecoilState(loggedInState);
  const [token, setToken] = useRecoilState(tokenState);
  const famUser = useRecoilValue(userState);

  // USER ACCOUNT CREATION //
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const userData = {
    uid: userID,
    email: email,
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    city: city,
    state: state,
    zip: zip,
  };

  useEffect(() => {
    auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        setIsLoggedIn(true);
        setAuthState(true);
        window.localStorage.setItem("auth", "true");
        userCredential.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        window.localStorage.setItem("auth", "false");
      }
    });
  }, []);

  const createNewAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const setAccountInDb = async (e) => {
    e.preventDefault();
    setUserID(getAuth().currentUser);
    const { uid } = getAuth().currentUser;

    try {
      await setDoc(doc(db, "users", uid), userData);
    } catch (err) {
      console.log(err);
      alert(`Im sorry there was an error ${err}`);
    }
  };

  const goToProfile = () => {
    const { uid } = getAuth().currentUser;
    navigate('/upload/' + uid)
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Welcome {famUser.email}</h1>
          <h3>
            Please fill out the form below to finish setting up your account
          </h3>
          <form>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <input
              type="date"
              name="Birthday"
              id="birthday"
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
            <input
              type="text"
              name="City"
              id="city"
              placeholder="City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <input
              type="text"
              name="State"
              id="state"
              placeholder="State"
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
            <input
              type="text"
              name="Zip Code"
              id="zip"
              placeholder="Zipcode"
              onChange={(e) => {
                setZip(e.target.value);
              }}
            />
            <button onClick={setAccountInDb}>Submit</button>
          </form>
          <button className="bg-blue-500 px-6 py-3" onClick={goToProfile}>Upload Image</button>
        </>
      ) : (
        <div>
          <h1>Welcome to FamRoom,</h1>
          <h3>Please Create an Account</h3>

          <form>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={createNewAccount}>Create Account</button>
          </form>
          
        </div>
      )}
    </div>
  );
}
