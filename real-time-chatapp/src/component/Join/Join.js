import React, { useState } from 'react'
import "../Join/Join.css"
import Textractlg from "../../images/Textractlg.png"
// import {Link} from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';

let user;


// const navigate = useNavigate()
function Join() {

  // const sendUser =()=>{
  //  user = document.getElementById('joinInput').value;    
  // }
  const navigate = useNavigate()
  const [error,setError]= useState(""); 
  const [data,setdata] = useState({name:"",room:""});




  const handleChange =(e)=>{

    console.log(e.target.name,e.target.value)
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })

  }

  const validation = () =>{

    if(!data.room && !data.name)
    {
      setError("Please Enter the require details before clicking Login")
      toast.error("Please Enter the require details before clicking Login")
      return false;

    }

    if(!data.name){
      setError("Please Enter your name !")
      toast.error("Please Enter your name !")
      return false;
    }
    if(!data.room){
      setError("Please select Room !")
      toast.error("Please select Room !")
      return false;
    }
    setError("")
    return true
  }


  const handleSubmit = (e) =>{
    e.preventDefault()
    const isValid = validation()
    // if it is valid then submit the form 
  console.log(isValid)

  // console.log(error)
    if(isValid){
      navigate(`/chat/${data.room}`,{state:data})
    }
  }

  return (
    <div className='JoinPage' >
      <div className='JoinContainer' >
        

        <img src={Textractlg} ></img>
        <h1>Textract</h1>
        {/* <form onSubmit={handleSubmit}> */}
        <input type="text" name='name'  id="joinInput" placeholder='Enter your name' onChange={handleChange}  />
        <div > 
        <select className="optionform" name='room' onChange={handleChange}   >
          <option value="" >Select Room</option>
          <option value="News" >News</option>
          <option value="Fun" >Fun</option>
          <option value="Strangers" >Strangers</option>
          <option value="Gaming" >Gaming</option>
          <option value="Coding" >Coding</option>
          <option value="A Talk on A.I" >A Talk on A.I</option>
          <option value="Geopolitics" >Geopolitics</option>
          </select>
       
        </div>
        <button onClick={handleSubmit}  className='joinBtn'>Login</button>
       {/* <Link to="/chat"> <button onSubmit={handleSubmit}  className='joinBtn'>Login</button> </Link> */}
       {/* </form> */}

      </div>
 
     
    </div>
    
  )

}

export default Join
export {user}
