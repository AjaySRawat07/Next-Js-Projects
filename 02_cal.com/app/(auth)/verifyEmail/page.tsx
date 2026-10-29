"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"


const VerifyEmail = () =>{
    const router = useRouter();
    const [value, setValue] = useState("");
     async function verifyEmail(){
        await axios.post("/api/users/verifyEmail", {token : value})
        router.push("/");
     }
    

    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <input type="text" className="border border-black p-2" onChange={(e) => setValue(e.target.value)} value={value}/>
            <button onClick={verifyEmail} className="m-1 border border-black p-1">Verify you mail</button>
        </div>
    )
}

export default VerifyEmail;