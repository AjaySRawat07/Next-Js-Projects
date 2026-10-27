import Users from "@/app/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/dbConnection/dbConfig";

connect();

export async function POST(req : NextRequest){
    try{
        const reqBody = await req.json();
        const {token} = reqBody;

        const user = await Users.findOne({verifyToken : token, 
            verifyTokenExpiry : {$gt : Date.now()}
        });

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status : 400})
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        
        return NextResponse.json({message : "User validation successfully", success : true}, {status : 200})
    }
    catch(error:any){
        return NextResponse.json({error : error.message},{status: 500});
    }
}