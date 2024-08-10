"use client"
import MaxWidhtWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import React from 'react'
import LoginImage from "@/assets/images/login.png"
import Image from 'next/image'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const Login = () => {
    return (
        <MaxWidhtWrapper className='flex items-center justify-around'>
            <div className='space-y-16'>
                <div className='text-center space-y-3'>
                    <div className=' text-4xl md:text-5xl font-bold '>
                        <h1 className='text-themeColor'>Welcome to</h1>
                        <h1>Git Streak Maintianer</h1>
                    </div>
                    <p className='text-subHeading'>
                        Keep your GitHub streak alive with a single click
                    </p>
                </div>
                <div className='flex w-full flex-col gap-3 items-center '>
                    <Button
                        onClick={() => signIn("github")}
                        size={"lg"}
                        className='max-w-[22rem] w-full flex gap-2 items-center'>
                        <Github />
                        Login With GitHub
                    </Button>
                    <div className='flex w-full  max-w-[22rem] items-center justify-between'>
                        <div className='h-[1px] w-[80%] bg-subLighter' />
                        <span className='mx-3'>
                            or
                        </span>
                        <div className='h-[1px] w-[80%] bg-subLighter' />
                    </div>

                    <Link
                        target='_blank'
                        href="https://github.com/signup?source=login"
                        className={`w-full max-w-[22rem] ${buttonVariants({ variant: "outline", size: "lg" })}`}
                    >
                        Create an Account
                    </Link>


                </div>
            </div>
            <div className='hidden md:block'>
                <Image
                    className='max-w-[30rem]'
                    src={LoginImage}
                    alt='Login Page Image'
                    width={557}
                    height={588}
                />
            </div>
        </MaxWidhtWrapper>
    )
}

export default Login
