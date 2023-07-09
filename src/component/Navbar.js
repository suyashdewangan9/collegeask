import React, { useState } from 'react'

import logo from "../images/logo.jpg" 
import {  AssignmentTurnedInOutlined, ExpandMore, FeaturedPlayListOutlined, Home, Language, LinkOff, LinkOutlined, NotificationsOutlined, PeopleAltOutlined, Search } from '@mui/icons-material'
import { Avatar, Button, Input, Link } from '@mui/material'
import "../css/Navbar.css"
import { useSelector } from 'react-redux'
import { selectUser } from "../features/userSlice";
import { auth } from '../firebase'
import db from '../firebase'
import Modal from 'react-modal';
import { serverTimestamp } from 'firebase/firestore'
import { collection, addDoc } from "firebase/firestore"; 


function Navbar() {
    const user=useSelector(selectUser);
    const [openModal,setOpenModal]=useState(false);
    const [input,setInput] =useState("");
    const [inputUrl,setInputUrl]=useState("");
    

    const handleQuestion=async(e)=>{
        e.preventDefault();        
        setOpenModal(false);

        

        const docRef = await addDoc(collection(db, "questions"), {
            question:  input,
            imageUrl: inputUrl,
            timestamp: serverTimestamp(),
            user: user
          });

        

        setInput("");
        setInputUrl("");
        
    }

  return (
    <div className='qHeader'>
        <div className='qHeader__logo'>
            <img src={logo }alt=''/>
        </div>
        <div className="qHeader__icons">
            <div className="qHeader__icon">
                 <Home/>
            </div>
            <div className="qHeader__icon">
                <FeaturedPlayListOutlined/>
            </div>
            <div className="qHeader__icon">
                <AssignmentTurnedInOutlined/>
            </div>
            <div className="qHeader__icon">
                <PeopleAltOutlined/>
            </div>
            <div className="qHeader__icon">
                <NotificationsOutlined/>
            </div>
        </div>

        <div className='qHeader__input'>
            <Search/>
            <input type='text' placeholder='Search CollegeAsk'/>
        </div>
        <div className='qHeader__Rem'>
            <div className='qHeader__avatar'>
                <Avatar onClick={() => auth.signOut()}
            className="Avatar" src={user.photo}/>
                
            </div>
            
            <Button onClick={()=>setOpenModal(true)}>Ask Questions</Button>
            <Modal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
          <div className="modal__title">
            <h5>Add Question</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={
                user.photo
                  ? user.photo
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <p>{user.displayName? user.displayName : user.email} asked</p>
            <div className="modal__scope">
              <PeopleAltOutlined/>
              <p>Public</p>
              <ExpandMore />
            </div>
          </div>
          <div className="modal__Field">
            <Input
            required
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              
              type="text"
              placeholder="Write your query here...."
            />
            <div className="modal__fieldLink">
              <LinkOutlined/>
              <input
                value={inputUrl}
                onChange={(e)=>setInputUrl(e.target.value)}
                
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setOpenModal(false)}>
              Cancel
            </button>
            <button onClick={handleQuestion} type="sumbit"  className="add">
              Add Question
            </button>
          </div>
        </Modal>
        </div>
    </div>
  )
}

export default Navbar