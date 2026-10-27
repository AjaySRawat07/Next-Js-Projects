"use client"

import { useEffect } from "react"

export default function ErrorPage({
    error,
    reset,
}: {
    error : Error & {digest ? : string}
    reset : () => void
}){

    useEffect(()=> {
        // Log the error to reporting service
        // console.log(error);
    },[error])

    return(
        <div>
            <h2>Something went wrong </h2>
            <p className="text-red-600">{error?.message || "An error occured"}</p>
            <button onClick={() => reset()}>Retry</button>
        </div>
    )
}