import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loggedInState, userState } from '../../context/recoil/loginAtoms'

export default function ProfileCard() {

    const user = useRecoilState(userState);

    useEffect(() => {
        console.log(user)
    })


  return (
    <div>
        <div className='mx-auto text-center shadow-lg bg-white p-5 rounded-md'>
            <img className='mx-auto mt-4 mb-4 rounded-lg h-24 shadow-lg' src="https://firebasestorage.googleapis.com/v0/b/fambook-c536f.appspot.com/o/userProfilePics%2FSF5BIlAfJ1cFTPz6s1eHbWG3DM53profilePic?alt=media&token=d9b1c589-d354-4ed4-b849-2e3e1c9888bf" alt="" />
            <p>{user[0].firstName} {user[0].lastName}</p>
            <p>Job Title</p>
            <p>Colorado Springs, CO</p>
            <p>Status</p>
            <div>
                <div>
                    Views
                </div>
                <div>
                    Family Connections
                </div>
            </div>
        </div>

    </div>
  )
}
