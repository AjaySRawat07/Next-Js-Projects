import Users from "@/app/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connect from "@/app/dbConnection/dbConfig";
import jwt from "jsonwebtoken"

connect();

export async function POST(req: NextRequest){
    try{
        
        const reqBody = await req.json();
        const {email, password} = reqBody;


        const checkUser = await Users.findOne({email});

        if(!checkUser){
            return NextResponse.json({error : "Invalid credentials"}, {status : 400});
        }

        const passwordCheck = await bcrypt.compare(password, checkUser.password);

        if(!passwordCheck){
            return NextResponse.json({error : "Invalid credentials"}, {status : 401});
        }

        const tokenData = {
            id : checkUser._id,
            username : checkUser.username,
            email : checkUser.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn : "1d"})

        const response =  NextResponse.json({ message : "User login successfully", success : true},{status : 200 })

        response.cookies.set("token", token , {
            httpOnly : true,
            path : "/"
        })
        
        return response;
    }
    catch(error : any){
        return NextResponse.json({ error : error.message}, {status : 500})
    }
}