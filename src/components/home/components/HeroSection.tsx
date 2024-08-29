import HeroDemoVideo from "./HeroDemoVideo"
import HeroImage from "./HeroImage"
import HeroText from "./HeroText"

const HeroSection = () => {
    return (
        <div className="mt-6 ">
            <div className=" flex justify-between items-center">
                <HeroText />
                <HeroImage />
            </div>
            <div>
                <HeroDemoVideo />
            </div>
        </div>
    )
}

export default HeroSection
