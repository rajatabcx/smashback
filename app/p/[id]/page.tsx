import { Navbar } from '@/app/dashboard/_components/Navbar';
import { CreateFeedbackForm } from './_components/CreateFeedbackForm';
import { Id } from '@/convex/_generated/dataModel';
import { ProjectDetails } from './_components/ProjectDetails';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: Id<'projects'> };
}) {
  return (
    <>
      <Navbar />
      <div className='light:bg-secondary h-[calc(100vh-72px)]'>
        <div className='container mx-auto grid grid-cols-6 gap-8 px-4 py-4 lg:px-6 xl:px-8'>
          <div className='col-span-full'>
            <Link href='/projects'>
              <Button variant='ghost'>
                <ChevronLeft className='h-4 w-4 mr-1' />
                Back
              </Button>
            </Link>
          </div>
          <div className='flex items-start justify-start col-span-full md:col-span-3'>
            <CreateFeedbackForm projectId={params.id} />
          </div>
          <div className='col-span-full md:col-span-3 space-y-4'>
            <ProjectDetails id={params.id} />
          </div>
        </div>
      </div>
    </>
  );
}
