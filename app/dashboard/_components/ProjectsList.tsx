import { ProjectCard } from '@/components/ProjectCard';
import { ProjectsLoading } from '@/components/ProjectsLoading';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';

export default function ProjectsList() {
  const projects = useQuery(api.projects.myProjects);
  return (
    <div className='col-span-full md:col-span-4 space-y-4'>
      <h1 className='text-lg md:text-xl'>{projects?.length || 0} Boards</h1>
      <div className='grid md:grid-cols-2 gap-4'>
        {projects === undefined ? (
          <ProjectsLoading />
        ) : projects.length ? (
          projects.map((project) => (
            <ProjectCard
              link={`/dashboard/${project._id}`}
              key={project._id}
              authorName='You'
              createdAt={project._creationTime}
              slug={project.slug}
              title={project.name}
              id={project._id}
              authorImageURL={project.ownerImageURL}
            />
          ))
        ) : (
          <div>No Projects Found</div>
        )}
      </div>
    </div>
  );
}
