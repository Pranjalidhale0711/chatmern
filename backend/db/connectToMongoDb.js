import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDb=async()=>{
   
    try{
     await mongoose.connect("mongodb+srv://adminnew:Pranjali@cluster0.kdkqihl.mongodb.net/?retryWrites=true&w=majority");
    }
    catch(e){
        console.log(process.env.MONGO_URL)
        console.log(e);
    }
}
export default connectToMongoDb;