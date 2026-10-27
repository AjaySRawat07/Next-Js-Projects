const features = [
    "role-based permissions",
    "instant meetings",
    "restriction schedules",
    "custom domains",
    "round-robin routing",
    "workflow automations",
  ];


export default function CalSlideShow(){
    return(
        // <div className="flex justify-center items-center">
            <div className="relative flex justify-center items-center w-full gap-4 h-36 text-xl font-bold overflow-hidden">
                <div className="relative">Cal.com doesn't miss on</div>
                <div className="animate-marqueeY ">
                    {[...features,...features].map((itm,idx) => (
                        <div key={idx} className="">
                               {itm}
                        </div>
                    ))}
                </div>
            </div>
        // </div>
    )
}