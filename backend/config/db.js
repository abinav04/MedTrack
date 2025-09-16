import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected");

    }catch(e){
        console.error("Mongo DB connection Error: ",e.message);
    }
}

export default connectDB;