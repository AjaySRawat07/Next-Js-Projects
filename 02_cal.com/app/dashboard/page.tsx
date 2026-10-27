import { buttonVariants, Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
import NavigationMenuDemo from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import TrustedByComponies from "@/components/trusted-by";


export default function Dashboard(){
     return (
        <div className="min-h-screen bg-[#f4f4f5] px-4 w-full">
            <div className="relative w-full border-b border-neutral-300/80 px-4">
        <div className="relative flex flex-col gap-4 mx-auto w-full max-w-300 border-b border-x border-neutral-300/80 px-4">
          <div className=" flex justify-between w-full max-w-300 items-center border border-neutral-200 rounded-md bg-white shadow-sm  px-2 py-3 ">
          <h2 className="shrink-0 font-semibold text-3xl tracking-tight text-neutral-900 pr-8">Cal.com</h2>
          <NavigationMenuDemo />
          <div className="flex shrink-0 items-center gap-4">
          <a href="#" className={buttonVariants({ variant: "secondary", size: "sm" })}>Sign in</a>
          <Button variant="secondary" className={" font-bold bg-neutral-900 text-white hover:bg-neutral-800 rounded-md"}>Get Started <ArrowRight size={16} /></Button>  
          </div>
            </div>
            <HeroSection />
                <span className="pointer-events-none absolute -bottom-2.5 -left-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
                    +
                </span>
                <span className="pointer-events-none absolute -bottom-2.5 -right-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
                    +
                </span>
            </div>
            <TrustedByComponies />
            <span className="pointer-events-none absolute -bottom-2.5 -left-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
                    +
                </span>
                <span className="pointer-events-none absolute -bottom-2.5 -right-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
                    +
                </span>
            </div>
        </div>
  );
}