'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommitScheduleSchema, CommitSchedule } from '@/types/commitSchedule';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { saveCommitSchedule } from '@/actions/commit-schedule';

export default function CommitScheduleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTimeZone, setUserTimeZone] = useState('');

  useEffect(() => {
    setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<CommitSchedule>({
    resolver: zodResolver(CommitScheduleSchema),
    defaultValues: {
      frequency: 'daily',
      time: '12:00',
    },
  });

  const frequency = watch('frequency');

  const onSubmit = async (data: CommitSchedule) => {
    setIsSubmitting(true);
    try {
      await saveCommitSchedule({ ...data, timeZone: userTimeZone });      
      // Handle success (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., show an error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            <Input type="datetime-local" {...field} value={field.value ? field.value.toISOString().slice(0, 16) : ''} />
          )}
        />
      )}
      {errors.customDate && <p className="text-red-500">{errors.customDate.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Schedule'}
      </Button>
    </form>
  );
}