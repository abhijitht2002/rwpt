import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const email = "example@gmail.com"

  return (
    <div>Profile</div >
  )
}

export default Profile