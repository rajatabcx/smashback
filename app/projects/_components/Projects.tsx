'use client';

import { ProjectCard } from '@/components/ProjectCard';
import { ProjectsLoading } from '@/components/ProjectsLoading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/nextjs';
import { usePaginatedQuery } from 'convex/react';
import { Loader } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export function Projects() {
  const { userId } = useAuth();
  const posthog = usePostHog();
  const [search, setSearch] = useDebounceValue('', 500);

  const {
    results: projects,
    loadMore,
    status,
    isLoading,
  } = usePaginatedQuery(
    api.projects.allProjects,
    {
      name: search,
    },
    {
      initialNumItems: 12,
    }
  );

  useEffect(() => {
    if (search) {
      posthog.capture('search_all_projects', {
        search,
      });
    }
  }, [search, posthog]);

  return (
    <>
      <div className='mb-4'>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search projects...'
        />
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {!projects.length && !isLoading ? (
          <div className='col-span-full'>
            <h1 className='text-2xl text-center'>No Projects Available</h1>
          </div>
        ) : isLoading ? (
          <ProjectsLoading />
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              authorName={
                project.ownerId === userId ? 'You' : project.ownerName
              }
              createdAt={project._creationTime}
              slug={project.slug}
              title={project.name}
              id={project._id}
              link={`/p/${project._id}`}
              authorImageURL={project.ownerImageURL}
            />
          ))
        )}
      </div>

      <div className='flex justify-center mt-6'>
        {status === 'Exhausted' ? null : (
          <Button disabled={isLoading} onClick={() => loadMore(10)} size='lg'>
            {isLoading ? (
              <Loader className='h-4 w-4 animate-spin' />
            ) : (
              'Load More'
            )}
          </Button>
        )}
      </div>
    </>
  );
}
