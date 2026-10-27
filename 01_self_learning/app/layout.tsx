import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";


export const metadata : Metadata = {
    title : "My app",
    description : "My next application",
}

export default function RootLayout({children,} : Readonly<{children : React.ReactNode;}>){
        return(
            <html>
                <body>
                    <header>
                        <nav>
                            <Link href={"/"} className="p-4 m-2">Home </Link>
                            <Link href={"/products"} className="p-4 m-2">Product</Link>
                        </nav>
                    </header>
                    {children}
                </body>
            </html>
        )
}