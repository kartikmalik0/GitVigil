import React from 'react'
import HeroSectionImage from "../../../../public/heroImage.png"
import Image from 'next/image'
const HeroImage = () => {
    return (
        <Image
            src={HeroSectionImage}
            height={959}
            width={1370}
            alt='Gitvigil hero sectin Image'
            className=' w-[38rem]'
        />
    )
}

export default HeroImage
