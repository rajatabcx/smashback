import { Rocket } from 'lucide-react';
import React from 'react';

export function FullPageLoading() {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Rocket className='h-20 w-20 animate-pulse' />
        <p className='text-xl font-semibold'>Loading Awesome Experience....</p>
      </div>
    </div>
  );
}
