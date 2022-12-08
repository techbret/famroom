import React, { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInState, tokenState, paramState } from '../../context/recoil/loginAtoms';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [token, setToken] = useRecoilState(tokenState);
    const [paramID, setParamID] = useRecoilState(paramState);
    const [authState, setAuthState] = useRecoilState(loggedInState);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false || window.localStorage.getItem("auth") === "true");
    const navigate = useNavigate();

    const auth = getAuth();

    useEffect(() => {
        auth.onAuthStateChanged((userCredential) => {
            if (userCredential) {
                setIsLoggedIn(true);
                setAuthState(true);
                window.localStorage.setItem("auth", "true");
                userCredential.getIdToken().then((token) => {
                    setToken(token)
                })
                setParamID(userCredential.user.uid);
            } else {
                window.localStorage.setItem("auth", "false");
            }
        });
    }, []);

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential) {
                    setUser(userCredential.user);
                    setIsLoggedIn(true);
                    window.localStorage.setItem("auth", "true");
                    setAuthState(true)
                    setParamID(userCredential.user.uid)
                    navigate('/user/' + userCredential.user.uid)
                    
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    const logout = (e) => {
        signOut(auth).then(() => {
          window.localStorage.setItem("auth", "false");
          navigate('/')           
        }).catch((error) => {
          // An error happened.
        });
      }

    return (
        <div>
            
            {isLoggedIn ? (
                <div>
                <h1>Welcome {user.id}</h1>
                <button onClick={logout}>Logout</button>
                </div>
                
            ) : (
                <div>
                    <h1>Welcome Please Login</h1>
                    <form>
                        <input 
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder='Email' 
                        />
                        <input 
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        placeholder='Password' 
                        />
                        <button 
                        type="button" 
                        className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={login}
                        >Submit</button>
                    </form>
                </div>
            )}

        </div>
    )
}

export default Login