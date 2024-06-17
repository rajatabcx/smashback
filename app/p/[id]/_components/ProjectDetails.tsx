'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { BadgeAlert, LayoutDashboard, OctagonAlert } from 'lucide-react';
import { ProjectDetailsLoading } from '../../../../components/ProjectDetailsLoading';
import { RequestCard } from '@/components/requests/RequestCard';
import { RequestStatus } from '@/lib/enums';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FeedbackOwnerFilter from '@/components/FeedbackOwnerFilter';
import { useState } from 'react';

interface PropTypes {
  id: Id<'projects'>;
}

export function ProjectDetails({ id }: PropTypes) {
  const { userId } = useAuth();
  const [byOwner, setByOwner] = useState<boolean>(false);
  const project = useQuery(api.project.projectDetails, {
    id,
    byOwner,
  });

  return project === undefined ? (
    <ProjectDetailsLoading />
  ) : (
    <>
      {project ? (
        <div>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-4'>
              <h1>Name: {project.project.name}</h1>
              {project.isMine ? (
                <Button variant='outline' asChild>
                  <Link
                    href={`/dashboard/${id}`}
                    className='flex items-center gap-1'
                  >
                    View Dashboard <LayoutDashboard />
                  </Link>
                </Button>
              ) : null}
            </div>
            <FeedbackOwnerFilter byOwner={byOwner} setByOwner={setByOwner} />
          </div>
          <div className='space-y-4'>
            {!project.feedbacks.length ? (
              <div className='flex flex-col items-center gap-2 my-24'>
                <BadgeAlert className='w-8 h-8' />
                <h1 className=''>
                  Wow This Place is So Empty, Try adding a feedback
                </h1>
              </div>
            ) : (
              project.feedbacks.map((feedback) => (
                <RequestCard
                  key={feedback._id}
                  authorName={
                    feedback.authorId === userId ? 'You' : feedback.authorName
                  }
                  createdAt={feedback._creationTime}
                  description={feedback.description}
                  title={feedback.title}
                  pledgeAmount={feedback.pledgeAmount}
                  status={feedback.status as RequestStatus}
                  upvotes={feedback.upvotes}
                  upvoted={feedback.upvoted}
                  authorImageURL={feedback.authorImageURL}
                  link={`/f/${id}/${feedback._id}`}
                  comments={feedback.comments}
                  feedbackId={feedback._id}
                  projectId={feedback.projectId}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          <OctagonAlert className='w-10 h-10' />
          <h1 className='text-xl font-semibold'>Project Data Not Available</h1>
        </div>
      )}
    </>
  );
}
