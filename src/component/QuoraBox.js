import React from 'react'
import "../css/QuoraBox.css"
import { Avatar } from '@mui/material'
import userEvent from '@testing-library/user-event'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

function QuoraBox() {
  const user =useSelector(selectUser);
  return (
    <div className='quoraBox'>
        <div className='quoraBox__info'>
            <Avatar src={user.photo}/>
            <h5>{user.displayName}</h5>
        </div>
        <div className='quoraBox__quora'>
            <p>What is your Question or link?</p>
        </div>
    </div>
  )
}

export default QuoraBox