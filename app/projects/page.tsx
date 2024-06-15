'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { usePaginatedQuery } from 'convex/react';
import { Loader } from 'lucide-react';

export default function Projects() {
  const { results, loadMore, status, isLoading } = usePaginatedQuery(
    api.projects.allProjects,
    {},
    {
      initialNumItems: 2,
    }
  );
  return (
    <div>
      <div>{JSON.stringify(results, null, 2)}</div>
      <div className='text-2xl'>{status}</div>

      <Button
        disabled={status === 'Exhausted' || isLoading}
        onClick={() => loadMore(1)}
      >
        {isLoading ? <Loader className='h-4 w-4 animate-spin' /> : 'Load More'}
      </Button>
    </div>
  );
}
