import React from 'react'
import Logo from './Logo'
import { ModeToggle } from './ThemeToggle'
import AddToken from './dashboard/secreate-button/page'

const Sitenav = () => {
  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Logo />
        <div className='space-x-2 flex items-center'>
          <ModeToggle />
          <AddToken />
        </div>
      </nav>
    </header>
  )
}

export default Sitenav
