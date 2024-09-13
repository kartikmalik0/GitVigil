import React from 'react'
import Logo from './Logo'
import { ModeToggle } from './ThemeToggle'
import AddToken from './dashboard/add-token/page'
import ProfileDropDown from './profile-dropdown/page'
import { getGitHubToken } from '@/actions/get-github-token'
import { auth } from '@/auth'

const Sitenav = async () => {
  const session = await auth()
  const token = await getGitHubToken()
  console.log(token)
  return (
    <header className="sticky top-0 bg-background z-50 px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Logo />
        <div className='space-x-3 flex items-center'>
          <ModeToggle />
          <>
            {
              session ?
                <AddToken token={token} /> : <></>
            }
          </>
          <ProfileDropDown />
        </div>
      </nav>
    </header>
  )
}

export default Sitenav
