import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { loggedInState, tokenState } from '../../context/recoil/loginAtoms'

function Home() {
    const [message, setMessage] = useState('New User')
    const tokenValue = useRecoilValue(tokenState)
    console.log(tokenValue);


   



    return (
        <div>
            Welcome 

        </div>
    )
}

export default Home