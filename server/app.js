import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http';
import cors from 'cors'

const port = 8000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});//circuit

// middleware
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,

    }))

app.get('/', (req, res) => {
    res.send('hello world');
})
io.on('connection', (socket) => {
    console.log("user connected", socket.id);
    // console.log("Id", socket.id);
    // socket.emit("welcome", `welcome to the server`);
    // socket.broadcast.emit("welcome", `${socket.id} join the server`);

    socket.on("message", ({ room, message }) => {
        console.log({ room, message });
        // socket.broadcast.emit("receive-message", data);
        io.to(room).emit("receive-message", message)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })

});

server.listen(port, () => {
    console.log(`server is runing at port ${port}`)
})