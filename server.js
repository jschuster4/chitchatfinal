const express = require('express'); 
const app = express() 
const port = 8000; 
const cookieParser = require("cookie-parser")
const {Server} = require("socket.io");
const cors = require("cors");

// added from video: 
// const http = require("http")


// app.use(cors())

// add connection to database here if needed
require("./server/config/mongoose.config");

// app.use(cors(corsOptions)); 
app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json(), express.urlencoded({extended: true}))

// add connection to routes
const userRoutes = require("./server/routes/user.routes")
userRoutes(app)


const server = app.listen(port, () => console.log(`Running on port ${port}`))

const io = require('socket.io')(server, { cors: true });

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined the room with id: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receieve_message", data);
    })



    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})


