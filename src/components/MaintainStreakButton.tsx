"use client"
import React from 'react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query';
import { createGitStreakRepo } from '@/actions/create-streak';
import { GitCommitHorizontal, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const MaintainStreakButton = () => {
    const mutation = useMutation({
        mutationFn: createGitStreakRepo,

        onSuccess: (data) => {
            if (data.success) {
                toast.success("You maintained streak")
            }
        },
        onError: (error: any) => {
            toast.error("Unable to maintain streak", error.message)
        },
    });

    const handleMaintainStreak = () => {
        mutation.mutate("");
    };
    return (
        <Button
            className='gap-2'
            size={"lg"}
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
    )
}

export default MaintainStreakButton