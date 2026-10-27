import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please provide an username"],
        unique : true
    },
    email : {
        type : String,
        required : [true, "Please provide an email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Required Field"],
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin: {
        type : Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})


const Users = mongoose.model("users", userSchema);

export default Users;