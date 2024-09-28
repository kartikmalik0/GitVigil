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
import Link from "next/link";
import CommitScheduleForm from "../commitSchedule/CommitScheduleForm";

const Profile = async () => {

    const { data } = await getUser();

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
                        <Link href={data.html_url} target="_blank">
                            <AvatarImage src={data.avatar_url || "https://github.com/shadcn.png"} />
                        </Link>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <UserDetails user={data} />
                </div>
                <div className='flex flex-col md:flex-row gap-2'>
                    <MaintainStreakButton />
                    <CommitScheduleForm />
                    {/* <Button variant="outline" size={"lg"} className='gap-2 hidden md:flex' asChild>
                        <Link href={"https://github.com/kartikmalik0/GitVigil.git"} target="_blank">
                            <Star />
                            Star on Github
                        </Link>
                    </Button> */}
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;