'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { BadgeAlert, Filter, OctagonAlert } from 'lucide-react';
import { RequestCard } from '@/components/requests/RequestCard';
import { RequestStatus } from '@/lib/enums';
import { useAuth } from '@clerk/nextjs';
import { ProjectDetailsLoading } from '@/components/ProjectDetailsLoading';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FeedbackOwnerFilter from '@/components/FeedbackOwnerFilter';

interface PropTypes {
  id: Id<'projects'>;
}

export function ProjectDetailsMine({ id }: PropTypes) {
  const { userId } = useAuth();

  const [byOwner, setByOwner] = useState<boolean>(false);

  const router = useRouter();
  const projectDetails = useQuery(api.project.projectDetails, {
    id,
    byOwner,
  });

  useEffect(() => {
    if (projectDetails && !projectDetails.isMine) {
      router.back();
    }
  }, [projectDetails, router]);

  return projectDetails === undefined ? (
    <ProjectDetailsLoading />
  ) : projectDetails ? (
    <div>
      <div className='mb-6 flex justify-between items-center'>
        <h1>Name: {projectDetails.project.name}</h1>
        <FeedbackOwnerFilter byOwner={byOwner} setByOwner={setByOwner} />
      </div>
      <div className='space-y-4'>
        {!projectDetails.feedbacks.length ? (
          <div className='flex flex-col items-center gap-2 my-24'>
            <BadgeAlert className='w-8 h-8' />
            <h1 className=''>
              Wow This Place is So Empty, Try adding a feedback
            </h1>
          </div>
        ) : (
          projectDetails.feedbacks.map((feedback) => (
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
              authorImageURL={feedback.authorImageURL}
              link={`/f/${id}/${feedback._id}`}
              comments={feedback.comments}
              projectId={feedback.projectId}
              feedbackId={feedback._id}
              upvoted={feedback.upvoted}
              editable
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
  );
}
