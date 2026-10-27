import { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
    title : "My Products",
    description : "My next product",
}

export default async function  ProductLayout({children, } : Readonly<{children : React.ReactNode}>){
        return(
            <div className="flex my-4">
                <aside>
                    <nav>
                        <li>
                            <Link href={"/products"}>All Products</Link>
                        </li>
                        <li>
                            <Link href={"/product/analyist"}>Product Details</Link>
                        </li>
                        <li>
                            {/* <Link href={`/products/${id}`}>Products Id</Link> */}
                        </li>
                    </nav>
                </aside>
                <div className="flex-1 m-4">{children}</div>
            </div>
        )
}