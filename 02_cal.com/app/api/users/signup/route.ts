import connect from "@/app/dbConnection/dbConfig";
import Users from "@/app/model/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendEmail from "@/lib/mailer";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        console.log(reqBody);
        const {username, email, password} = reqBody;

        const user = await Users.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const saltPassword = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, saltPassword);

        const newUser = new Users({
            username,
            email,
            password : hashPassword
        })
        const saveUser = await newUser.save();
        console.log(saveUser);

        await sendEmail({email, emailType: "VERIFY" , userId : saveUser._id.toString()});

        return NextResponse.json({
            message: "User registered Successfully",
            success: true,
            saveUser
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        return NextResponse.json({error : error.message},{status : 500})
    }
}