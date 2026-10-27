"use client"

import { useEffect, useState } from "react";

interface Product{
    id : number,
    title : string,
    price : number,
    rating : number
}

interface ProductsResponse{
    products : Product[],
    total : number        
}
export default function ClientSideData(){
    const[data , setData] = useState<ProductsResponse | null>([]);
    const [loading, setLoading] = useState(true);

    async function  fetchListOfUser(){
        try{
            const resp = await  fetch('https://dummyjson.com/products', 
                { cache : "force-cache" }
            );
            const result = resp.json();
            setData(await result);
        }
        catch(error){
            console.log("Fetching error : ", error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchListOfUser()
    },[])
    
    if(loading) return <div>Loading...</div>
    console.log(data);

    return(
        <div>
            <h1>Server Site rendering Product List</h1>
            <h3>{data?.total}</h3>
            {
                data?.products.map((item) => (
                    <div key={item.id} className=" border border-black my-2">
                        <h2>Id : {item?.id}</h2>
                        <h2>Title : {item?.title}</h2>
                        <p>Price : {item?.price}</p>
                        <p>Rating : {item.reviews[0]?.rating ?? "No review yet"}</p>
                    </div>
                ))
            }
        </div>
    )
}


