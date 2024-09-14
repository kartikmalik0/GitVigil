import { BorderBeam } from "@/components/ui/border-beam"
import HeroVideoDialog from "@/components/ui/hero-video"

const HeroDemoVideo = () => {
    return (
        <section className="max-w-4xl mx-auto mt-8 flex flex-col justify-center items-center px-7 lg:px-0 relative">
            <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
            <div className="relative rounded-2xl p-1 overflow-hidden">
                <BorderBeam />
                <HeroVideoDialog
                    animationStyle="from-center"
                    videoSrc="https://utfs.io/f/OZgJSIdXCLxfZpqiaGkkdUYu4OR2XbKr9o5G6si7xgev0Z8f"
                    thumbnailSrc="https://utfs.io/f/OZgJSIdXCLxfv8MLL1E7cJ4wM9AGrWOeQyPs1mj8t2k03Rqu"
                    thumbnailAlt="Hero Video"
                />
            </div>
        </section>
    )
}

export default HeroDemoVideo
