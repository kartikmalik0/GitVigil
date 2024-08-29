import { Button } from "@/components/ui/button"
import PulsatingButton from "@/components/ui/pulse-button"

const HeroText = () => {
  return (
    <div className="space-y-8">
      <div className=" flex flex-col gap-4">
        <h1 className="leading-[3rem]">
          Master Your <br />
          Git Streak
        </h1>
        <p className="text-subHeading">
          Boost your github productivity and manage your git streak with ease.
        </p>
      </div>
      <div className="flex gap-6">
        <PulsatingButton pulseColor="#FFAE36">
          Get Started For Free
        </PulsatingButton>
        <Button variant={"outline"}>
          Demo
        </Button>
      </div>
    </div>
  )
}

export default HeroText
