import CalSlideShow from "@/components/cal_slide_show";
import CalSolvingProblems from "@/components/cal_solves";
import Image from "next/image";

const dataForHowToHelp = [
    {
      "id" : "01",
      "title" : "Eliminate no shows",
      "content" : "Automated reminders, follow-ups, and smart routing make sure the right people show up, across time zones.",
      "image" : "https://framerusercontent.com/images/Wds4slJZAtNkodl0iRNUMbKN1lk.png?width=756&height=578"
    },
    {
        "id" : "02",
        "title" : "Stop wasting time on scheduling",
        "content" : "Cut the time you spend on admin work, manual booking assignments, and  handoffs that slow everything down.",
        "image" : "https://framerusercontent.com/images/SevxFj1XwL6NlA5c7mpixhgmRk.png?width=370&height=445"
    },
    {
        "id" : "03",
        "title" : "Get leads into calls faster",
        "content" : "Route leads to the right person instantly so meetings happen while interest is high.",
        "image" : "https://framerusercontent.com/images/xd2BYXgnjnzO9tOkQmwIJyGujo.png?scale-down-to=1024&width=682&height=1183"
    }
]

export default function KeyBenefits(){
    return(
        <section className="w-full bg-[#f4f4f5] px-4">
         <div className="relative mx-auto w-full max-w-300 border-x border-b gap-20 border-neutral-300/80 px-6 py-16 md:px-16">
             <CalSolvingProblems />
        
        <span className="pointer-events-none absolute -bottom-2.5 -left-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
          +
        </span>
        <span className="pointer-events-none absolute -bottom-2.5 -right-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
          +
        </span>

         </div>
         <div className="relative flex flex-col  mx-auto w-full max-w-300 border-x border-b  order-neutral-300/80 gap-20 px-6 py-16 md:px-16">
              {
                dataForHowToHelp.map((data) => (
                    <div key={data.id} className="flex items-center justify-between gap-10 md:flex-row md:gap-16">
                        <div className="w-full md:w-1/2 flex justify-center items-center gap-10 ">

                        <div className="w-full max-w-[480px] overflow-hidden rounded-4xl p-3 shadow-sm">
                            <Image
                                src={data.image}
                                alt="Key benefits icon"
                                width={100}
                                height={100}
                                unoptimized
                                className="h-auto max-h-[380px] w-full rounded-xl object-contain"
                                />
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center gap-3 md:w-1/2">
                            <span className="rounded-md bg-neutral-200/80 px-2.5 py-1 font-mono text-xs font-semibold text-neutral-700">{data.id}</span>
                            <h3 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">{data.title}</h3>
                            <p className="max-w-md text-base leading-relaxed text-neutral-500">{data.content}</p>
                        </div>
                    </div>
                ))
              }
         </div>
         <div className="relative mx-auto w-full max-w-300 border-x border-b gap-20 border-neutral-300/80 px-6 py-16 md:px-16">
           <CalSlideShow />
           <span className="pointer-events-none absolute -bottom-2.5 -left-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
          +
        </span>
        <span className="pointer-events-none absolute -bottom-2.5 -right-[5.5px] select-none font-mono text-sm leading-none text-neutral-400">
          +
        </span>
         </div>
        </section>
    )
}