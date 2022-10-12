import express from "express"
import cors from "cors"
import { createServer } from "http";
import { Server } from "socket.io";
import game from "./controllers/game.js"

const PORT = process.env.PORT || 4000 ;

const app = express()
const httpServer = createServer();
const io =  new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



//Route
game.start(io)
// Socket Method

let server = app.listen(PORT,() => {
  console.log(`Sever started at port ${PORT}`)
})


io.listen(server)
