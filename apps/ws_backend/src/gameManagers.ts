import WebSocket from "ws"
import { Game } from "./games"
import { INIT_GAME, MOVE } from "./constants"

export class GameManager{
    private waitingplayer:WebSocket|null
    public Games:Game[]
    public Users:WebSocket[]//dk if it is necessary
    constructor(){
        this.waitingplayer=null
        this.Games=[]
        this.Users=[] 
    }
    public addUser(socket:WebSocket){
        this.Users.push(socket)
    }
    public removeUser(socket:WebSocket){
        this.Users = this.Users.filter(user => user !== socket);
        // if the closing socket was the waiting player, clear it so another player can wait
        if (this.waitingplayer === socket) {
            this.waitingplayer = null;
        }
    }
    public addHandler(socket:WebSocket){
        
        socket.on("message",(data)=>{
            
            const message = JSON.parse(data.toString());
            console.log(message)
            if(message.type==INIT_GAME){
                console.log(this.waitingplayer)
                if(this.waitingplayer){
                    //Should have a check for ratings. We'll come to it when we come to it
                    const newgame= new Game(socket,this.waitingplayer)
                    this.Games.push(newgame)
                    socket.send("game started")
                    this.waitingplayer=null
                }
                else{
                    this.waitingplayer=socket;
                    socket.send("Waiting...")
                }
                
            }
        })
        
    }
}