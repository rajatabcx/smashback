'use client';

import { RequestStatus } from '@/lib/enums';
import { ChevronUp, Loader, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { RequestStatusTag } from './RequestStatusTag';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { SigninModal } from '../SigninModal';
import { useAPIMutation } from '@/lib/useAPIMutation';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePostHog } from 'posthog-js/react';

interface PropTypes {
  title: string;
  description: string;
  authorName: string;
  createdAt: number;
  upvotes: number;
  upvoted: boolean;
  comments: number;
  status: RequestStatus;
  pledgeAmount?: number;
  authorImageURL?: string;
  link: string;
  disabled?: boolean;
  projectId?: Id<'projects'>;
  feedbackId?: Id<'feedbacks'>;
  editable?: boolean;
}

export function RequestCard({
  authorName,
  createdAt,
  description,
  pledgeAmount,
  status,
  title,
  upvotes,
  comments,
  authorImageURL,
  link,
  disabled,
  feedbackId,
  projectId,
  upvoted,
  editable,
}: PropTypes) {
  const posthog = usePostHog();
  const { sessionId } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const { mutate, isPending } = useAPIMutation(api.feedback.upvote);
  const { mutate: updateStatus, isPending: updatingStatus } = useAPIMutation(
    api.feedback.updateStatus
  );

  const handleUpvote = async () => {
    try {
      if (!feedbackId || !projectId) {
        return;
      }
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

  const handleStatusUpdate = async (newStatus: RequestStatus) => {
    try {
      if (!feedbackId || !projectId) {
        return;
      }
      if (!sessionId) {
        setModalOpen(true);
        return;
      }
      await updateStatus({
        feedbackId,
        status: newStatus,
      });

      posthog.capture('feedback_status_updated', {
        feedbackId,
        projectId,
        status: newStatus,
      });

      toast.message('Updated status successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  return (
    <>
      <div className='rounded-lg shadow-md bg-card border border-secondary group'>
        <div className='p-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-xl font-bold'>{title}</h3>
            <div className='flex items-center gap-2'>
              <RequestStatusTag status={status} />
              {pledgeAmount ? (
                <div className='rounded-full px-2 py-1 text-xs font-medium bg-primary text-primary-foreground'>
                  ${pledgeAmount} pledged
                </div>
              ) : null}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground'>{description}</p>
            {editable ? (
              <div>
                <Select
                  onValueChange={handleStatusUpdate}
                  disabled={!!updatingStatus}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder={status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='New'>New</SelectItem>
                    <SelectItem value='Work In Progress'>
                      Work In Progress
                    </SelectItem>
                    <SelectItem value='Added to Roadmap'>
                      Added To Roadmap
                    </SelectItem>
                    <SelectItem value='Cancelled'>Cancelled</SelectItem>
                    <SelectItem value='Shipped'>Shipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </div>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 select-none'>
              <p className='text-muted-foreground flex gap-1 items-center text-sm'>
                {authorImageURL ? (
                  <Image
                    src={authorImageURL}
                    alt='Profile Image'
                    height={24}
                    width={24}
                    className='mr-1 rounded-full'
                  />
                ) : null}
                {authorName}, {formatDistanceToNow(createdAt)}
              </p>
            </div>
            <div className='flex gap-4'>
              <Button
                variant={upvoted ? 'default' : 'secondary'}
                disabled={!!disabled}
                onClick={handleUpvote}
                className='disabled:opacity-100'
              >
                <ChevronUp className='h-5 w-5 mr-2 -ml-[6px]' />
                {isPending ? (
                  <Loader className='h-4 w-4 animate-spin' />
                ) : (
                  <span>{upvotes}</span>
                )}
              </Button>
              <Button variant='secondary'>
                <MessageSquare className='h-5 w-5 mr-2 -ml-[6px]' />
                <span>{comments}</span>
              </Button>
              <Button asChild variant='outline' size='default'>
                <Link href={link} prefetch={false} className='px-6 block'>
                  View
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SigninModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
