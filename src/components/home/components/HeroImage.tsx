
import React from 'react'
import Image from 'next/image'
import heroImage from "../../../../public/heroImage.png"

const HeroImage = () => {


    return (
        <Image
            src={heroImage}
            height={959}
            width={1370}
            alt='Gitvigil hero section Image'
            className='lg:w-[28rem] md:w-[20rem] hidden md:block'
            priority
            quality={100}
        />
    )
}

export default HeroImage