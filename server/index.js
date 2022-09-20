
import  express  from "express";
import {createServer} from 'http'
// const cors = require("cors");
import cors from "cors"
import { Server } from "socket.io";

const app = express()

const httpServer = createServer(app)
// const server = http.createServer(app);

app.use(cors())

app.get("/",(req,res)=>{
    res.send("Well its Working !")
 })

const io= new Server(httpServer,{

    cors: {
        origin:"http://localhost:3000",
        methods: ["GET","POST"],       
    }
    
})

io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.on("joinRoom",room=>{socket.join(room)})

    socket.on("newMessage",({newMessage,room})=>{
        // console.log(room,newMessage);
        io.in(room).emit("getLatestMessage",newMessage)
    });
    

  });

// io - mtlb connection 
// io.on("connection",()=>{
//     console.log("New Connection")
// })

const port = 9000||process.env.PORT;

httpServer.listen(port,()=>{
console.log(`server is running on http://localhost:${port}`)
})