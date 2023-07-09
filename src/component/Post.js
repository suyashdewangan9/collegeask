import React, { useEffect, useState } from 'react'
import "../css/Post.css"
import { Avatar } from '@mui/material'
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ArrowUpwardRounded, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOnOutlined, RepeatOutlined, ShareOutlined } from '@mui/icons-material'
import Modal from 'react-modal'
import { selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestionId, selectQuestionName, setQuestionInfo } from "../features/questionSlice";
import db from '../firebase'
import { collection, addDoc } from "firebase/firestore"; 

Modal.setAppElement('#root');

function Post({id,question,imageUrl,timestamp,quoraUser}) {
  const [date,setDate] = useState(new Date(timestamp.seconds * 1000 + timestamp.nanoseconds/1000000))
  useEffect(()=>{
   
    
  },[])
   
  const user =useSelector(selectUser)
  const [openModal,setOpenModal] =useState(false)
  
  const dispatch =useDispatch()

  const questionId = useSelector(selectQuestionId)
  const [answer, setAnswer] = useState("");
  const questionName= useSelector(selectQuestionName)
 
  
  const handleAnswer=async(e)=>{
    // console.log("hello");
    e.preventDefault()
    console.log(questionId);
    if(questionId){
      console.log("hello");
      const docRef = await addDoc(collection(db, "questions").doc(questionId).collection("answers"), {
        answer: answer,
        user: user
      });

      // console.log(questionId, questionName)
      setAnswer("")
      setOpenModal(false);
    }
  }

  return (
    <div 
    className="post"
      onClick={() =>
        dispatch(
          setQuestionInfo({
            questionId: id,
            questionName: question,
          })
        )
      }
    >
        <div className='post__info'>
            {quoraUser&&<Avatar src={quoraUser?.photo}/>}
            <h5>{quoraUser?.displayName?quoraUser?.displayName:quoraUser?.email}</h5>
            <small>{date.toString()}</small>
        </div>
      
        <div className='post__body'>
            <div className='post__question'>
                <p>{question}</p>
                <button onClick= {()=>setOpenModal(true)} className='post__btnAnswer'>Answer
                </button>
                <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {quoraUser.displayName ? quoraUser.displayName : quoraUser.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                {date.toString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button onClick={handleAnswer} type="submit" className="add">
                Add Answer
              </button>
            </div>
          </Modal>
            </div>
            <div className='post__answer'>
                <p></p>
            </div>

            <img src={imageUrl} alt =""/>
            
        </div>

        <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined/>
          <ArrowDownwardOutlined />
        </div>

        <RepeatOnOutlined />
        <ChatBubbleOutlineOutlined />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
    </div>
  )
}

export default Post