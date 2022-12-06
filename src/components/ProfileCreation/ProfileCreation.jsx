import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProfileCreation() {
    let {userId} = useParams();

  return (
    <div>ProfileCreation {userId}</div>
  )
}
