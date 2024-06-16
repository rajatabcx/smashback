import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { Id } from '@/convex/_generated/dataModel';
import { FeedbackDetails } from './_components/FeedbackDetails';

import { Navbar } from '@/app/dashboard/_components/Navbar';
import { Button } from '@/components/ui/button';

export default function FeedbackDetailsPage({
  params,
}: {
  params: { feedback: [Id<'projects'>, Id<'feedbacks'>] };
}) {
  return (
    <>
      <Navbar />
      <div className='light:bg-secondary h-[calc(100vh-72px)]'>
        <div className='container mx-auto grid grid-cols-8 gap-8 px-4 py-4 lg:px-6 xl:px-8'>
          <div className='col-span-full'>
            <Link href={`/p/${params.feedback[0]}`}>
              <Button variant='ghost'>
                <ChevronLeft className='h-4 w-4 mr-1' />
                Back
              </Button>
            </Link>
          </div>
          <FeedbackDetails
            feedbackId={params.feedback[1]}
            projectId={params.feedback[0]}
          />
        </div>
      </div>
    </>
  );
}
