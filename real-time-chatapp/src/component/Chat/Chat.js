import React, { useEffect, useRef, useState } from 'react'
import "../Chat/Chat.css";
import { useLocation } from 'react-router-dom';
import Moment from 'react-moment';
// import 'moment-timezone';
import { io } from "socket.io-client";

function Chat() {

  const location = useLocation()
  const msgBoxRef = useRef()

  const [data,setData] = useState({})
  const [msg,setMsg] = useState("")
  const [allMessages,setMessages] = useState([])
  const [socket,setSocket] = useState()


  useEffect(()=>{
    const socket = io("http://localhost:9000");

    setSocket(socket);
    socket.on("connect", () => {
      // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      socket.emit("joinRoom",location.state.room)
    });

},[])

useEffect(()=>{

  if(socket){
    socket.on("getLatestMessage",(newMessage) => {
      setMessages([...allMessages,newMessage])
      msgBoxRef.current.scrollIntoView({behavior:"smooth"})

      setMsg("")


    })
  }
 
},[socket,allMessages])

  const handleChange =(e)=>{
    setMsg(e.target.value)
 
   }


   const handleEnter = e => e.keyCode===13 ? onSubmit() : ""


   useEffect(()=>{
    setData(location.state)
 },[location])

 
   const onSubmit = ()=>{

    if(msg){
     const newMessage = {time: new Date(),msg,name:data.name} 
    //  setMessages([...allMessages,newMessage])
    socket.emit("newMessage",{newMessage,room:data.room});


    }
   }


  return (
    <div className='py-4 mt-5 col-md-ms-0 col-md-me-0  w-30  shadow text-dark  rounded container mainbody '  >
        <div className='text-center px-3 mb-4 text-capitalize'>
                  <h1 className='heading  mb-4' >{data?.room} Chat-Room </h1>
        </div>
        <div className=' border rounded p-3 mb-4  chatroom' style={{height:"430px", overflowY:"scroll"}} >
          {
           
            allMessages.map(msg => {
              return data.name === msg.name 
              ? 
              <div className="row justify-content-end pl-5 "  >
              <div className="d-flex flex-column align-items-end m-2 shadow p-2  border rounded w-auto" style={{background:"#536aa5"}}>
                  <div>
                      <strong className="m-1">{msg.name}</strong>
                      <small className="text-muted m-1 "><Moment fromNow>{msg.time}</Moment></small>
                  </div>
                  <h4 className="m-1">{msg.msg}</h4>
              </div>
          </div>
          :
          <div className="row justify-content-start">
              <div className="d-flex flex-column m-2 p-2 shadow  border rounded w-auto" style={{ background:  '#62bc9b'}}>
                  <div>
                      <strong className="m-1">{msg.name}</strong>
                      <small className="text-mmuted m-1"><Moment fromNow>{msg.time}</Moment></small>
                  </div>
                  <h4 className="m-1">{msg.msg}</h4>
              </div>
          </div>
              
            })
          }

          <div ref={msgBoxRef} > </div>
        </div>

        <div className='form-group d-flex' >

 <input type="text" className="form-control inputtextbg " name='message' onKeyDown={handleEnter} onChange={handleChange} placeholder='Type your message here....'  value={msg} />
 <button type='button' className='btn mx-2  chatsendbtn ' onClick={onSubmit} >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg>
 </button>

        </div>
       
    </div>
    

  )
}

export default Chat;
