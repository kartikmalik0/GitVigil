'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommitScheduleSchema, CommitSchedule } from '@/types/commitSchedule';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { saveCommitSchedule } from '@/actions/commit-schedule';
import { toast } from 'sonner';
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

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
        submissionData.time = format(submissionData.customDate, 'HH:mm');
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
        <Button variant="outline" size={"lg"} className='gap-2'>
          <Clock className='h-4 w-4'/>
          Schedule Commit
        </Button>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP HH:mm") : <span>Pick a date and time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          const currentDate = field.value || new Date();
                          date.setHours(currentDate.getHours());
                          date.setMinutes(currentDate.getMinutes());
                          field.onChange(date);
                        }
                      }}
                      initialFocus
                    />
                    <div className="p-3 border-t">
                      <Input
                        type="time"
                        value={field.value ? format(field.value, "HH:mm") : ""}
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(':').map(Number);
                          const newDate = new Date(field.value || new Date());
                          newDate.setHours(hours);
                          newDate.setMinutes(minutes);
                          field.onChange(newDate);
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
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