import TrustedByComponies from "@/components/trusted-by";
import Dashboard from "./dashboard/page";
import CalSolvingProblems from "@/components/cal_solves";
import KeyBenefits from "./key_benefits/page";
import CalSlideShow from "@/components/cal_slide_show";


export default function Home() {
  return(
      <div>
           <Dashboard />
           <KeyBenefits />         
      </div>
  )
}
