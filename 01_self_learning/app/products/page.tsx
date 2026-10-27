
import Link from "next/link"

const items = [
    {
        id: 1,
        name: "Mobile",
        price: "30000"
    },
    {
        id: 2,
        name: "Laptop",
        price: "40000"
    },
    {
        id: 3,
        name: "TV",
        price: "20000"
    }
]
export default function ProductList() {
    const shouldError =  Math.random() > 0.5;
    
    console.log("Random value : ", shouldError);
    if(shouldError){
        throw new Error("Failed to fetch Items");
    }
    return (<div className="grid grid-3">
        <h1>This is the product list Component</h1>
        <div>
            {items.map((product) => (
                <div key={product.id} className="border  p-4 rounded my-2">
                    <h2>{product.name}</h2>
                    <h4>{product.price}</h4>
                    <Link href={`/products/${product.id}`}> View Details</Link>
                </div>
            ))}
        </div>
    </div>)
}