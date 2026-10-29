"use client"

import axios from "axios"
import { useRouter } from "next/navigation";



const Logout = () =>{
    const router = useRouter();

    async function handleLogout(){
        await axios.get("/api/users/logout");
        router.push("/login");
    }

      return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
      )
}

export default Logout;