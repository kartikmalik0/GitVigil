import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import UserDetails from './UserDetails';
import MaintainStreakButton from '@/components/MaintainStreakButton';
import { getUser } from '@/actions/get-user';

const Profile = async () => {

    const { data } = await getUser()
    console.log(data)
    // const { data: user, isLoading } = useQuery({
    //     queryKey: ["fetchUser"],
    //     queryFn: getUser
    // })

    // console.log(user)

    return (
        <Card className='p-1 md:p-6'>
            <CardContent className='pt-6 flex items-center justify-between'>
                <div className='flex items-center'>

                    <Avatar className="h-16 w-16 md:h-28 md:w-28">
                        <AvatarImage src={data.avatar_url || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <UserDetails user={data} />


                </div>
                <div className='md:flex hidden flex-col md:flex-row gap-2'>
                    <MaintainStreakButton />
                    <Button variant="outline" className='gap-2'>
                        <Star />
                        Star on Github
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;