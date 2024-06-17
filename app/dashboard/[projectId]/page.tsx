'use client';
import { Id } from '@/convex/_generated/dataModel';
import { ChevronLeft, Copy, MoveUpRight } from 'lucide-react';
import { ProjectDetailsMine } from './_components/ProjectDetailsMine';
import { Navbar } from '../_components/Navbar';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function ProjectDetailsPage({
  params,
}: {
  params: { projectId: Id<'projects'> };
}) {
  return (
    <div>
      <Navbar />
      <div className='bg-secondary dark:bg-background h-[calc(100vh-72.8px)]'>
        <div className='container mx-auto grid grid-cols-8 gap-8 px-4 py-4 lg:px-6 xl:px-8'>
          <div className='col-span-full'>
            <Link href='/dashboard'>
              <Button variant='ghost'>
                <ChevronLeft className='h-4 w-4 mr-1' />
                Back
              </Button>
            </Link>
          </div>
          <div className='flex items-start justify-start col-span-full md:col-span-3'>
            <div className='w-full'>
              <p>Public Link</p>
              <div className='border p-4 rounded-lg overscroll-auto overflow-auto text-sm no-scrollbar mt-2'>{`${location.origin}/p/${params.projectId}`}</div>

              <div className='flex mt-4 gap-2'>
                <Button
                  size='icon'
                  variant='secondary'
                  onClick={() =>
                    window.open(`${location.origin}/p/${params.projectId}`)
                  }
                >
                  <MoveUpRight className='w-4 h-4' />
                </Button>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size='icon'
                      variant='secondary'
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${location.origin}/p/${params.projectId}`
                        );
                        toast.success('Link copied to clipboard');
                      }}
                    >
                      <Copy className='w-4 h-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='col-span-full md:col-span-5 space-y-4'>
            <ProjectDetailsMine id={params.projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
