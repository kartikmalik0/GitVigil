import { UsersRound } from 'lucide-react'
import React from 'react'

const UserDetails = () => {
    return (
        <div className='mx-2 md:mx-4'>
            <h2 className='text-xl md:text-2xl p-1 font-bold'>Kartik Malik</h2>
            <div className='flex text-subHeading items-center gap-1'>
                <UsersRound />
                <p>
                    <strong className='dark:text-white  text-black'>{32}</strong> followers
                </p>.
                <p>
                    <strong className='dark:text-white  text-black'>{10}</strong> following
                </p>
            </div>
        </div>
    )
}

export default UserDetails
