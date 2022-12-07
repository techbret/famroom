import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  loggedInState,
  tokenState,
  userState,
} from "../../context/recoil/loginAtoms";


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



  const navigate = useNavigate();

  const auth = getAuth();



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
        navigate('/user/' + userCredential.user.uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };



  

  return (
    <div>
      {isLoggedIn ? (
       <div>Hi</div>
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
