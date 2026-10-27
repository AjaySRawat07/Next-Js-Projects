"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";




export default function Profile(){
    const route = useRouter();
    const pathName =  usePathname();  // basically when you want give specific access to any path
    const searchParams = useSearchParams();

    const handleNav = () =>{
        route.push("/dashboard");
    }
    console.log(searchParams.size);
    console.log(searchParams.has("name"));
    console.log(searchParams.getAll("name"));

    console.log(`As a path name: , ${pathName}`)
    return(
        <div>
            <h1>User Profile</h1>
            <p>Navigate to level <button onClick={handleNav}>Here</button></p>
        </div>
    )
}