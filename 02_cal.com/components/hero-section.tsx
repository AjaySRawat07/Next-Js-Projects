import { Button } from "@/components/ui/button"
import {
    Card
  } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image";

  
export default function HeroSection(){
    return(
        <Card className="">
              <div className="p-2"></div>
              <div className="flex flex-col shrink-0 justify-center items-center gap-3">
                   <p className="border rounded-full  p-1 text-xs">We are know offering 7 days trails</p>
                    <h1 className="text-6xl font-bold text-shadow-2xs p-1">Simple Scheduling for teams</h1>
                    <h6 className="text-md text-gray-400 m-2">Every meeting gets booked with the right person, every time.</h6>
                    <Button variant="secondary" className={" font-bold bg-neutral-900 text-white hover:bg-neutral-800 rounded-md mb-6"}>Get Started Free <ArrowRight size={16} /></Button>
                    <Image src="/bannerImg.avif" width={1200}  height={600}  alt="Banner"  className="w-full h-auto object-contain"/>
              </div>
        </Card>
    )
}