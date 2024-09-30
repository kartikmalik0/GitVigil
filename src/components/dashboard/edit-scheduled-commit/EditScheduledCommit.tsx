'use client'

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { useSession } from 'next-auth/react'
import { deleteScheduledCommit } from '@/actions/delete-schedule-commit'

interface CommitSchedule {
  id: string
  frequency: string
  dayOfWeek: number | null
  time: string
  customDate: string | null
  timeZone: string | null
}

const EditScheduledCommit = ({ isCommitModalOpen, setIsCommitModalOpen, userId }: { isCommitModalOpen: boolean, setIsCommitModalOpen: (open: boolean) => void, userId: string }) => {


  const { data: commits, isLoading, error } = useQuery<CommitSchedule[]>({
    queryKey: ['scheduledCommits', userId],
    queryFn: () => fetch(`/api/scheduled-commits?userId=${userId}`).then(res => {
      if (!res.ok) throw new Error('Failed to fetch commits')
      return res.json()
    }),
    enabled: isCommitModalOpen,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const formData = new FormData()
      formData.append('id', id)
      return deleteScheduledCommit(formData)
    },
    onSuccess: () => {
      // invalidateQueries({ queryKey: ['scheduledCommits', userId] })
      toast.success("Commit deleted")
    },
    onError: (error: any) => {
      toast.error("Failed to delete the commit. Please try again.", error.message)
    },
  })

  const handleDeleteCommit = (id: string) => {
    deleteMutation.mutate(id)
  }

  const formatSchedule = (commit: CommitSchedule) => {
    if (commit.customDate) {
      return new Date(commit.customDate).toLocaleString()
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return `${commit.frequency} on ${days[commit.dayOfWeek || 0]} at ${commit.time}`
  }

  return (
    <Dialog open={isCommitModalOpen} onOpenChange={setIsCommitModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scheduled Commits</DialogTitle>
          <DialogDescription>
            Manage your upcoming scheduled commits
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          {isLoading ? (
            <p className="text-center">Loading scheduled commits...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error loading scheduled commits. Please try again.</p>
          ) : commits && commits.length === 0 ? (
            <p className="text-center text-muted-foreground">No scheduled commits found.</p>
          ) : (
            <div className="space-y-4">
              {commits?.map((commit) => (
                <Card key={commit.id}>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Scheduled Commit</CardTitle>
                    <CardDescription>{formatSchedule(commit)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Frequency: {commit.frequency}</p>
                    {commit.timeZone && <p className="text-sm">Time Zone: {commit.timeZone}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCommit(commit.id)}
                      disabled={deleteMutation.isPending && deleteMutation.variables === commit.id}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {deleteMutation.isPending && deleteMutation.variables === commit.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => setIsCommitModalOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditScheduledCommit