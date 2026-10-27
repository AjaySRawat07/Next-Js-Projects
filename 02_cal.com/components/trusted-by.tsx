const logos = [
    "coinbase",
    "storyblok",
    "AngelList",
    "Raycast",
    "▲ Vercel",
    "⚡ supabase",
    "udemy",
    "Rho",
    "deel.",
    "Framer",
    "ramp ↗",
  ];


  export default function TrustedByComponies(){
        return(
            <div className="flex justify-center items-center w-full">
                <div className="relative mx-auto flex items-center justify-between max-w-300 w-full border border-gray-300 border-x gap-8 m-1 p-8">
                    <p className="shrink-0 text-md leading-relaxed text-gray-500 md:max-w-60">Trusted by fast-growing companies around the world</p>
                
                <div className="flex-1 overflow-hidden">
                    <div className="animate-marquee flex items-center gap-10">
                        {
                            [...logos, ...logos].map((logo, index) =>(
                                <span key={index} className="border  shadow-md p-2 mx-1 shrink-0 text-xl font-bold tracking-tight">
                                        {logo}
                                </span>
                            ))
                        }
                    </div>
                    </div>
                </div>
            </div>
        )
  }