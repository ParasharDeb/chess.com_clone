import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port:8080});
wss.on("connection",(ws)=>{
    ws.send("ws connected on port 8080")
    ws.on("message",()=>{
        console.log("message sent")
        ws.send("message sent")
    })
})