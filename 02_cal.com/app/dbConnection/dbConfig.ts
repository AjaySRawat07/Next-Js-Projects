import mongoose from "mongoose";


export default async function connect(){

    try{
        await mongoose.connect(process.env.MONGO_URI!);
        const server = mongoose.connection;

        server.on('connected', ()=>{
            console.log("DB connected successfully");
        })

        server.on('error', (err) =>{
            console.log(`DB connection error: ${err}`);
            process.exit();
        })
    }
    catch(error){
        console.log(`DB Error: ${error}`);
        throw new Error("Error while connecting DB");
    }
}