import { WebSocketServer } from "ws";
import { GameManager } from "./gameManagers.js";
import { prisma } from "@repo/db"
const wss = new WebSocketServer({port:8080});
const manager = new GameManager();

wss.on("connection",(ws)=>{
    console.log("ws connected on port 8080")
    
    manager.addUser(ws);
    manager.addHandler(ws);
    ws.on("close",()=>{
        manager.removeUser(ws)
    })
})