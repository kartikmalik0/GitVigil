'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommitScheduleSchema, CommitSchedule } from '@/types/commitSchedule';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { saveCommitSchedule } from '@/actions/commit-schedule';
import { toast } from 'sonner';

export default function CommitScheduleForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [userTimeZone, setUserTimeZone] = useState('');

  useEffect(() => {
    setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const { control, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, reset } = useForm<CommitSchedule>({
    resolver: zodResolver(CommitScheduleSchema),
    defaultValues: {
      frequency: 'daily',
      time: '12:00',
    },
  });

  const frequency = watch('frequency');

  useEffect(() => {
    if (frequency !== 'custom') {
      setValue('customDate', undefined);
    }
  }, [frequency, setValue]);

  const onSubmit = async (data: CommitSchedule) => {
    try {
      let submissionData = { ...data };
      if (frequency === 'custom' && submissionData.customDate) {
        // customDate is already a Date object, so we just need to extract the time
        submissionData.time = submissionData.customDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        
      }
      const result = await saveCommitSchedule({ ...submissionData, timeZone: userTimeZone });
      if (result.success) {
        toast.success("Your commit is scheduled");
        setIsOpen(false);
        reset();
      } else {
        throw new Error("Failed to save schedule");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Unable to schedule commit");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Schedule Commit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Commit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.frequency && <p className="text-red-500">{errors.frequency.message}</p>}

          {frequency === 'weekly' && (
            <Controller
              name="dayOfWeek"
              control={control}
              render={({ field }) => (
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day of week" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                      <SelectItem key={index} value={index.toString()}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
          {errors.dayOfWeek && <p className="text-red-500">{errors.dayOfWeek.message}</p>}

          {frequency !== 'custom' && (
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <Input type="time" {...field} />
              )}
            />
          )}
          {errors.time && <p className="text-red-500">{errors.time.message}</p>}

          {frequency === 'custom' && (
            <Controller
              name="customDate"
              control={control}
              render={({ field }) => (
                <Input
                  type="datetime-local"
                  {...field}
                  value={field.value instanceof Date ? field.value.toISOString().slice(0, 16) : ''}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    field.onChange(isNaN(date.getTime()) ? '' : date);
                  }}
                />
              )}
            />
          )}
          {errors.customDate && <p className="text-red-500">{errors.customDate.message}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Schedule'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}