import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export function ProjectsLoading() {
  return Array(12)
    .fill(0)
    .map((item, index) => <Skeleton key={index} className='h-[120px]' />);
}
