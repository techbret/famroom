import React, { useState } from 'react'
import { getDatabase, ref, set } from "firebase/database";

export default function CreateAccount() {
    const [name, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const userId = "12bngfojeojsfalk"

    function writeUserData() {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    }

   


    return (
        <div>
            <h1>This is a Test</h1>
            <form>
                <input type="text" placeholder='UserName' onChange={e => setUsername(e.target.value)} />
                <input type="email" name="email" id="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <input type="text" placeholder='imageUrl' onChange={e => setImageUrl(e.target.value)} />
                <button onClick={writeUserData()}>Test</button>
            </form>


        </div>
    )
}
