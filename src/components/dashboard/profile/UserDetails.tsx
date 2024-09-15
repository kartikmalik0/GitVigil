"use client"
import { getUser } from '@/actions/get-user';
import { useQuery } from '@tanstack/react-query';
import { UsersRound } from 'lucide-react'
import { Octokit } from 'octokit';
import React from 'react'


const UserDetails = ({ user }: { user: any }) => {
    return (
        <div className='mx-2 md:mx-4'>
            <h2 className='text-xl md:text-2xl p-1 font-bold'>{user.name && user.name}</h2>
            <div className='flex text-subHeading items-center gap-1'>
                <UsersRound />
                <p>
                    <strong className='dark:text-white  text-black'>{user.followers && user.followers}</strong> followers
                </p>.
                <p>
                    <strong className='dark:text-white  text-black'>{user.following && user.following}</strong> following
                </p>
            </div>
        </div>
    )
}

export default UserDetails
