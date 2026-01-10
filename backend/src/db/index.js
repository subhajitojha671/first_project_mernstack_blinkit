import mongoose from "mongoose"
import { DB_NAME } from "../Constants.js"

const connectDB =async ()=>{
   
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGDB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(error);
       
        process.exit(1);
        
    }
}
export default connectDB;