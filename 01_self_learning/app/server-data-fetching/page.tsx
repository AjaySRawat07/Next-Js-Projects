import { Suspense, use } from "react";

interface Product{
    id : number,
    title : string,
    price : number,
    rating : number
}

interface ProductResponse{
    products : Product[],
    total : number
}


async function getData(): Promise<ProductResponse>{
    const resp = await fetch('https://dummyjson.com/products');
    if(!resp.ok){
        throw new Error("Error while fetching data");
    }
    return resp.json();
}

function ServerSideFetching(){
    const productList = use(getData())

    return(
        <div>
            <h1>Server Site rendering Product List</h1>
            <h3>{productList?.total}</h3>
            {
                productList?.products?.map((item) => (
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

export default function Page(){
    return(<Suspense fallback={<p>Loading...</p>}>
        <ServerSideFetching />
</Suspense>)
}