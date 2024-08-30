import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { GitCommitHorizontal, Star } from 'lucide-react'
import UserDetails from './UserDetails'


const Profile = () => {
    return (
        <Card className='p-1 md:p-6'>
            <CardContent className=' pt-6 flex items-center justify-between'>
                <div className='flex items-center'>
                    <Avatar className=" h-16 w-16 md:h-28 md:w-28 ">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {/* followers container */}
                    <UserDetails />
                </div>
                <div className='md:flex hidden flex-col md:flex-row gap-2'>
                    <Button className=' gap-2'>
                        <GitCommitHorizontal />
                        Maintain Streak
                    </Button>
                    <Button variant={"outline"} className=' gap-2'>
                        <Star />
                        Star on Github
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile
