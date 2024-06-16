import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export function CommentLoader() {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-10 w-full' />
    </div>
  );
}
