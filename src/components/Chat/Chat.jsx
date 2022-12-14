import React, { useState } from 'react'
import { getDatabase, ref, set } from "firebase/database";
import { UserAuth } from '../../context/UseContext/AuthContext';
import { useParams } from 'react-router-dom';
import { collection } from 'firebase/firestore';

export default function CreateAccount() {
    const { profile } = UserAuth()
    const [message, setMessage] = useState('')

       

    function writeUserData() {
        const db = getDatabase();
        set(collection(db, 'chats/' + profile.displayName), {
            username: profile.displayName,
            message: message,                        
        });
    }  


    return (
        <div>
            <h1>Chat</h1>
            <form>
                <input type="text" placeholder='UserName' onChange={e => setMessage(e.target.value)} />
                
                <button onClick={writeUserData()}>Test</button>
            </form>


        </div>
    )
}
