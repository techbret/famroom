import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({name: "New User"});

    const navigate = useNavigate();

    const auth = getAuth();

    

    const createNewAccount = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                console.log(userCredential)                         
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }



    return (
        <div>
            <h1>Welcome to FamRoom, {user.uid}</h1>
            <h3>Please Create an Account</h3>

            <form>
                <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button onClick={createNewAccount}>Create Account</button>

            </form>



        </div>
    )
}
