import Users from "@/app/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/dbConnection/dbConfig";
import { getUsetTokenId } from "@/lib/getUserTokenId";

connect();


export const POST = async(req : NextRequest) => {
    const userId = await getUsetTokenId(req);

    const user = await Users.findOne({_id : userId}).select("-password");
    
    if(!user){
        return NextResponse.json({message : "Invalid token! Try Login"},{status : 404})
    }

    return NextResponse.json({
        message : "User found",
        data : user
    })
}