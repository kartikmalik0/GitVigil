'use client'

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import HeroSectionDarkImage from "../../../../public/heroImage-dark.png"
import HeroSectionLightImage from "../../../../public/heroImage-light.png"

const HeroImage = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const imageSrc = resolvedTheme === 'dark' ? HeroSectionDarkImage : HeroSectionLightImage

    return (
        <Image
            src={imageSrc}
            height={959}
            width={1370}
            alt='Gitvigil hero section Image'
            className='lg:w-[38rem] md:w-[30rem] hidden md:block'
            priority
        />
    )
}

export default HeroImage