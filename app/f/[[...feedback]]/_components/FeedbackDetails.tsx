'use client';

import React, { useState } from 'react';
import FeedbackLoader from './FeedbackLoader';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { CommentForm } from './CommentForm';
import { CommentLoader } from './CommentLoader';
import { CommentCard } from './CommentCard';
import { Button } from '@/components/ui/button';
import { ChevronUp, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { SigninModal } from '@/components/SigninModal';
import { RequestStatusTag } from '@/components/requests/RequestStatusTag';
import { RequestStatus } from '@/lib/enums';
import { useAPIMutation } from '@/lib/useAPIMutation';
import { usePostHog } from 'posthog-js/react';

interface PropTypes {
  feedbackId: Id<'feedbacks'>;
  projectId: Id<'projects'>;
}

export function FeedbackDetails({ feedbackId, projectId }: PropTypes) {
  const posthog = usePostHog();
  const [modalOpen, setModalOpen] = useState(false);

  const { sessionId } = useAuth();

  const feedbackData = useQuery(api.feedback.get, {
    id: feedbackId,
  });

  const { mutate, isPending } = useAPIMutation(api.feedback.upvote);

  const handleUpvote = async () => {
    try {
      if (!sessionId) {
        setModalOpen(true);
        return;
      }
      const res = await mutate({
        feedbackId,
        projectId,
      });
      posthog.capture(res ? 'upvote_added' : 'upvote_removed', {
        feedbackId,
        projectId,
      });
      toast.message(
        res ? 'Upvoted feedback successfully' : 'Removed upvote successfully'
      );
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  return (
    <>
      <div className='flex items-start justify-start col-span-full md:col-span-4'>
        {feedbackData === undefined ? (
          <FeedbackLoader />
        ) : (
          <div className='flex gap-4 w-full'>
            <div>
              <Button
                variant={feedbackData.upvoted ? 'default' : 'outline'}
                className='flex flex-col gap-2 h-auto'
                onClick={handleUpvote}
                disabled={isPending}
              >
                <ChevronUp className='h-5 w-5' />
                {isPending ? (
                  <Loader className='animate-spin w-5 h-5' />
                ) : (
                  feedbackData.feedback.upvotes
                )}
              </Button>
            </div>
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <h1 className='text-lg sm:text-2xl font-semibold'>
                  {feedbackData.feedback.title}
                </h1>
                <div className='flex items-center gap-2'>
                  <RequestStatusTag
                    status={feedbackData.feedback.status as RequestStatus}
                  />
                  {feedbackData.feedback.pledgeAmount ? (
                    <div className='rounded-full px-2 py-1 text-xs font-medium bg-primary text-primary-foreground'>
                      ${feedbackData.feedback.pledgeAmount} pledged
                    </div>
                  ) : null}
                </div>
              </div>
              <p className='text-sm sm:text-base text-muted-foreground'>
                {feedbackData.feedback.description}
              </p>
              <div className='mt-6 flex gap-1 items-center'>
                {feedbackData.feedback.authorImageURL ? (
                  <Image
                    src={feedbackData.feedback.authorImageURL}
                    alt='Profile Image'
                    height={24}
                    width={24}
                    className='rounded-full'
                  />
                ) : null}
                <p className='text-xs sm:text-base text-muted-foreground'>
                  {feedbackData.feedback.authorName},
                </p>
                <p className='text-xs sm:text-base text-muted-foreground'>
                  {formatDistanceToNow(feedbackData.feedback._creationTime)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='col-span-full md:col-span-4 space-y-10'>
        <div className='col-span-full'>
          <CommentForm feedbackId={feedbackId} />
        </div>
        <div className='col-span-full'>
          {feedbackData === undefined ? (
            <CommentLoader />
          ) : (
            <div>
              {feedbackData.comments.length ? (
                <div className='space-y-4'>
                  {feedbackData.comments.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      authorName={comment.authorName}
                      comment={comment.comment}
                      createdAt={comment._creationTime}
                      authorImageURL={comment.authorImageURL}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <h1>No Comments yet...</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <SigninModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
