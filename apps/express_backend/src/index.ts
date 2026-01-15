import express from "express"
import {prisma} from "@repo/db"
const app=express();
app.use(express.json())
app.post("/",async(req,res)=>{
    const user = await prisma.user.create({
        data:{
            name:Math.random().toString(),
            email:Math.random().toString()
        }
    })
    res.json(user)
})
app.listen(3000)