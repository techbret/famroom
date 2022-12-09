import React from 'react'
import { UserAuth } from '../../context/UseContext/AuthContext'

export default function ThoughtLog() {
    const { profileUrl, profile } = UserAuth();


  return (
    <div className='mt-4 bg-white rounded-lg shadow-lg p-4'>
        <div className="flex">
      <div className="mr-4 flex-shrink-0">
        <img 
        className="h-16 w-16 border border-gray-300 bg-white text-gray-300 rounded-md"
        src={profileUrl} alt="" />        
      </div>
      <div>
        <h4 className="text-lg font-bold">{profile.firstName} {profile.lastName}</h4>
        <p className="mt-1">
          Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus
          quidem ipsam quia iusto.
        </p>
      </div>
    </div>

    </div>
  )
}
