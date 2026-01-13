import WebSocket from "ws"

export class Game{
    private player1:WebSocket
    private player2:WebSocket
    public Board:String // here should come the logic of chess.js
    public time:Date
    public winner:String|null
    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2;
        this.Board=" ";
        this.time= new Date()
        this.winner=null
    }
}