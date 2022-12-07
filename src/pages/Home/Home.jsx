import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import HomeSignUp from '../../components/HomeSignUp/HomeSignUp';
import { loggedInState, tokenState } from '../../context/recoil/loginAtoms'

function Home() {
    const [message, setMessage] = useState('New User')
    const tokenValue = useRecoilValue(tokenState)
    console.log(tokenValue);


   



    return (
        <div>
            <HomeSignUp /> 

        </div>
    )
}

export default Home