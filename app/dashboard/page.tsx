'use client';

import { CreateProjectForm } from './_components/CreateProjectForm';
import { Navbar } from './_components/Navbar';
import ProjectsList from './_components/ProjectsList';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className='light:bg-secondary h-[calc(100vh-72.8px)]'>
        <div className='container mx-auto grid grid-cols-6 gap-8 px-4 py-12 lg:px-6 xl:px-8'>
          <div className='flex items-start justify-center col-span-full md:col-span-2'>
            <CreateProjectForm />
          </div>
          <ProjectsList />
        </div>
      </div>
    </>
  );
}
