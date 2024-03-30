import express from 'express'
import dotenv from 'dotenv';
import authroutes from './routes/authroutes.js'
import messageroutes from './routes/message.routes.js';
import userroutes from './routes/user.routes.js';
import connectToMongoDb from './db/connectToMOngoDb.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app=express();
const PORT=process.env.PORT||5001;


app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("hello world hi")
})

app.use("/api/auth",authroutes);
app.use("/api/messages",messageroutes)
app.use("/api/users",userroutes)
app.listen(PORT,()=>{
    connectToMongoDb();
    console.log('server is running');
})