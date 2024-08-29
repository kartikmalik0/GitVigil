import { BorderBeam } from "@/components/ui/border-beam"
import HeroVideoDialog from "@/components/ui/hero-video"

const HeroDemoVideo = () => {
    return (
        <section className="max-w-4xl mx-auto mt-8 flex flex-col justify-center items-center px-7 lg:px-0 relative">
            <div className="relative rounded-2xl p-1 overflow-hidden">
                <BorderBeam />
                <HeroVideoDialog
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                />
            </div>
        </section>
    )
}

export default HeroDemoVideo
