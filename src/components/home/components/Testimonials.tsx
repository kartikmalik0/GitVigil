"use client"

import { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import testimonials from '@/utils/testimonials.json'
import Ahmad from '@/assets/images/ahmad.jpg'
import Yogesh from "../../../../public/yogesh.png"
import Kunal from "../../../../public/kunal.png"
import { MagicCard } from '@/components/animation/MagicCard'
import { useTheme } from 'next-themes'

type TestimonialImage = 'ahmad.jpg' | 'yogesh.png' | 'kunal.png'

const imageMap: Record<TestimonialImage, StaticImageData> = {
  'ahmad.jpg': Ahmad,
  'yogesh.png': Yogesh,
  'kunal.png': Kunal,
}

interface Testimonial {
  id: number
  text: string
  name: string
  position: string
  image: TestimonialImage
}

const Testimonials = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server-side and first render on client-side
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <section>
      {currentTheme === "light" ? (
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#e8c89a,transparent)]"></div>
          </div>
        </div>
      ) : (
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="relative h-full w-full bg-black">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            </div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
            </div>
          </div>
        </div>
      )
      }
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(testimonials as Testimonial[]).map((testimonial) => (
              <MagicCard
                key={testimonial.id}
                className="p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                gradientColor={currentTheme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <p className="text-card-foreground mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-4 relative">
                    <Image
                      src={imageMap[testimonial.image]}
                      alt={`${testimonial.name}'s profile picture`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials