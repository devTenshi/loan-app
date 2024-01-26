import mongoose from "mongoose";
import { MONGO_CONNECTION_STRING } from "./ENVconnection.config.mjs"

const connectDb = async () =>  {
    try {
        const connect = await mongoose.connect(MONGO_CONNECTION_STRING);
        console.log("Database connected:" , connect.connection.host, connect.connection.name)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDb;