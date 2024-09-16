import Image, { StaticImageData } from 'next/image'
import testimonials from '@/utils/testimonials.json'

import Ahmad from '@/assets/images/ahmad.jpg'
import Yogesh from "../../../../public/yogesh.png"
import Kunal from "../../../../public/kunal.png"
// import Yogesh1 from '@assets/images/yogesh.png'

type TestimonialImage = 'ahmad.jpg'  | 'yogesh.png' | 'kunal.png'

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

  // we are mapping here the tes
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(testimonials as Testimonial[]).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials