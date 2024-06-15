import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export function ProjectDetailsLoading() {
  return (
    <div className='flex flex-col space-y-3'>
      <div className='mb-6'>
        <Skeleton className='h-8 w-full' />
      </div>
      <div className='space-y-4'>
        {Array(5)
          .fill(0)
          .map((_item, index) => (
            <Skeleton className='h-[175px] w-full' key={index} />
          ))}
      </div>
    </div>
  );
}
