import React, {useState,useEffect} from 'react'
import "../css/Feed.css"
import QuoraBox from './QuoraBox'
import Post from './Post'
import db from '../firebase';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
// import { current } from '@reduxjs/toolkit';

function Feed() {
  const [posts,setPosts]=useState([]);

  useEffect(async() => {

    const querySnapshot = await getDocs(collection(db, "questions"));
    querySnapshot.forEach((doc) =>{
     
      setPosts(current => [...current,{id:doc.id,question:doc.data()}]);
    }
  
    );
    
  }, []); 
  // useEffect(()=>{posts.map((id,question)=>{console.log(id,question.user)})},[posts])  ;
   return (
    <div className='feed'>
        <QuoraBox/>
        {posts.length>0 && posts.map(({ id, question }) => (
        <Post
          key={id}
          Id={id}
          question={question.question}
          imageUrl={question.imageUrl}
          timestamp={question.timestamp}
          quoraUser={question.user}
        />
      ))}
       
    </div>
  )
}

export default Feed