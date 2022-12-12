import React from 'react'
import { UserAuth } from '../../context/UseContext/AuthContext'

export default function Settings() {

    const { profile } = UserAuth()


  return (
    <div>Welcome {profile.firstName}</div>
  )
}
