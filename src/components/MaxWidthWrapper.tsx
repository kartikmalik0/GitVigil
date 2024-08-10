import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWidhtWrapper = ({
    className,
    children
}:{
    className?: string
    children:ReactNode
}) => {
  return (
    <section className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20',className)}>
      {children} 
    </section>
  )
}

export default MaxWidhtWrapper