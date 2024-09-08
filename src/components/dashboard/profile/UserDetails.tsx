"use client"
import { getUser } from '@/actions/get-user';
import { useQuery } from '@tanstack/react-query';
import { UsersRound } from 'lucide-react'
import { Octokit } from 'octokit';
import React from 'react'


const UserDetails = ({ user }: any) => {
    console.log(user)

    return (
        <div className='mx-2 md:mx-4'>
            {/* <h2 className='text-xl md:text-2xl p-1 font-bold'>{user.name}</h2> */}
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
