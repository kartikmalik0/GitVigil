"use client"
import React from 'react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query';
import { createGitStreakRepo } from '@/actions/create-streak';
import { GitCommitHorizontal, Loader2 } from 'lucide-react';

const MaintainStreakButton = () => {
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
