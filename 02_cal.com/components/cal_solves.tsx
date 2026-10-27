import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function CalSolvingProblems(){
    return(
        <div className = "relative flex justify-center items-center max-w-7xl min-h-min">
            <div className = "relative flex  flex-col justify-center items-center gap-4">
                  <div className="flex justify-center items-center text-sm gap-1 border shadow-md max-w-50 p-1">
                  <Image
                        src="https://framerusercontent.com/images/FmSEnTtARJ0DHyAZcZRpyA9344.svg?width=24&height=24"
                        alt="Key benefits icon"
                        width={16}
                        height={16}
                        unoptimized
                        className="size-4 shrink-0"
                        />
                  <span>key benefits</span>
                  </div>
                  <h1  className="text-5xl font-bold max-w-250">Cal.com solves scheduling problems that hurt your team's business.</h1>
                  <h5 className="text-gray-500">Speed up your online bookings so your business grows instead of slows.</h5>
                  <div className="flex gap-2">
                  <Button variant="secondary" className={" font-bold bg-neutral-900 text-white hover:bg-neutral-800 rounded-md mb-6"}>Get Started Free <ArrowRight size={16} /></Button>
                  <Button variant="secondary" className={" font-bold bg-neutral-900 text-black bg-yellow-50 hover:bg-neutral-800 rounded-md mb-6"}>Talk to sales</Button>
                  </div>
            </div>
        </div>
    )
}