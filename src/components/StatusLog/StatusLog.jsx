import React from 'react'
import { UserAuth } from '../../context/UseContext/AuthContext'

export default function StatusLog() {
    const { upDates } = UserAuth();
    
    const uniqueStatus = upDates.filter((message, index, self) => self.findIndex(m => m.profileID === message.profileID) === index);



    return (
        <>
        <div className='bg-white mt-4 px-4 rounded-md shadow-sm text-lg font-bold text-center text-emerald-500 border border-emerald-500 border-solid'>Status Log</div>
        <div className='mt-1 px-4'>
      <ul className="divide-y divide-emerald-500">
        {uniqueStatus.map((status, index) => (
          <li key={index} className="py-4">
            <div className="flex space-x-3">
              <img className="h-6 w-6 rounded-full" src={status.profilePic} alt="" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{status.firstName} {status.lastName}</h3>
                  <p className="text-sm text-gray-500">{Math.floor((new Date().getTime() - status.timestamp?.toDate().getTime()) / (1000 * 60 * 60))}h</p>
                </div>
                <p className="text-sm text-gray-500">
                  is {status.status}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
    )
}