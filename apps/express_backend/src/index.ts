import express from "express"
import { prisma } from "@repo/database";

const app=express();
app.use(express.json())

app.post("/",async(req,res)=>{
    const user = await prisma.user.create({
        data:{
            email:Math.random().toString(),
            name:Math.random().toString()
        }
    })
})
app.listen(3000)