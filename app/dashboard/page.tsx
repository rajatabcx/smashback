import { fetchQuery } from 'convex/nextjs';

import { CreateProjectForm } from './_components/CreateProjectForm';
import { Navbar } from './_components/Navbar';
import { ProjectCard } from './_components/ProjectCard';
import { api } from '@/convex/_generated/api';
import { getAuthToken } from '@/lib/auth';
import { ScrollArea } from '@/components/ui/scroll-area';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const token = await getAuthToken();
  const projects = await fetchQuery(api.projects.myProjects, {}, { token });

  return (
    <>
      <Navbar />
      <div className='light:bg-secondary h-[calc(100vh-56px)]'>
        <div className='container mx-auto grid grid-cols-6 gap-8 px-4 py-12 lg:px-6 xl:px-8'>
          <div className='flex items-start justify-center col-span-full md:col-span-2'>
            <CreateProjectForm />
          </div>
          <div className='col-span-full md:col-span-4 space-y-4'>
            <h1 className='text-lg md:text-xl'>
              {projects.length || 0} Boards
            </h1>
            <div className='grid md:grid-cols-2 gap-4'>
              {projects.length ? (
                projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    authorName={project.ownerName}
                    createdAt={project._creationTime}
                    slug={project.slug}
                    title={project.name}
                  />
                ))
              ) : (
                <div>No Projects Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
