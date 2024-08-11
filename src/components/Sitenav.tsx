import React from 'react'
import Logo from './Logo'
import { ModeToggle } from './ThemeToggle'

const Sitenav = () => {
  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Logo />
        <ModeToggle />
      </nav>
    </header>
  )
}

export default Sitenav
