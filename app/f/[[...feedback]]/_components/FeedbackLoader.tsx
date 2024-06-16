import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function FeedbackLoader() {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-20 w-full' />
    </div>
  );
}
