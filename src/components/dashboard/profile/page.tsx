"use client"
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GitCommitHorizontal, Star, Loader2 } from 'lucide-react';
import UserDetails from './UserDetails';
import { createGitStreakRepo } from '@/actions/create-streak';

const Profile = () => {
    const mutation = useMutation({
        mutationFn: createGitStreakRepo,
        onSuccess: (data) => {
            console.log('Streak maintained successfully:', data);
            // You can add a toast notification here
        },
        onError: (error) => {
            console.error('Error maintaining streak:', error);
            // You can add an error toast notification here
        },
    });

    const handleMaintainStreak = () => {
        mutation.mutate();
    };

    return (
        <Card className='p-1 md:p-6'>
            <CardContent className='pt-6 flex items-center justify-between'>
                <div className='flex items-center'>
                    <Avatar className="h-16 w-16 md:h-28 md:w-28">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <UserDetails />
                </div>
                <div className='md:flex hidden flex-col md:flex-row gap-2'>
                    <Button 
                        className='gap-2' 
                        onClick={handleMaintainStreak}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <GitCommitHorizontal />
                        )}
                        {mutation.isPending ? 'Maintaining...' : 'Maintain Streak'}
                    </Button>
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