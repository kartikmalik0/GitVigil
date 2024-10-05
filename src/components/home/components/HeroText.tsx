import { Button } from "@/components/ui/button"
import PulsatingButton from "@/components/ui/pulse-button"
import { Star } from "lucide-react"
import Link from "next/link"

const HeroText = () => {
  return (
    <div className="space-y-8 w-full md:w-fit">
      <div className=" flex flex-col gap-4 text-center">
        <h1 className="leading-[2rem] md:leading-[3rem]">
          Master Your <br />
          Git Streak
        </h1>
        <p className="text-subHeading max-w-[490px]">
          Supercharge your GitHub profile and maintain your streak with ease. Master version control like a pro.
        </p>
      </div>
      <div className="flex gap-6 justify-center">
        <Link href={"/dashboard"}>
          <PulsatingButton pulseColor="#FFAE36">
            Get Started
          </PulsatingButton>
        </Link>
        <Button variant="outline" size={"lg"} className='gap-2' asChild>
          <Link href={"https://github.com/kartikmalik0/GitVigil.git"} target="_blank">
            <Star />
            Star on Github
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default HeroText
