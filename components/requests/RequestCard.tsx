import { RequestStatus } from '@/lib/enums';
import { ChevronUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { RequestStatusTag } from './RequestStatusTag';
import Image from 'next/image';

interface PropTypes {
  title: string;
  description: string;
  authorName: string;
  createdAt: number;
  upvotes: number;
  comments: number;
  status: RequestStatus;
  pledgeAmount?: number;
  authorImageURL?: string;
  link: string;
  disabled?: boolean;
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
}: PropTypes) {
  return (
    <div className='rounded-lg shadow-md bg-card border border-secondary group'>
      <div className='p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold'>{title}</h3>
          <div className='flex items-center gap-2'>
            <RequestStatusTag status={status} />
            <div className='rounded-full px-2 py-1 text-xs font-medium bg-primary text-primary-foreground'>
              ${pledgeAmount || 0} pledged
            </div>
          </div>
        </div>
        <p className='text-muted-foreground'>{description}</p>
        <div className='flex items-center justify-between'>
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
            <Button variant='secondary'>
              <ChevronUp className='h-5 w-5 mr-2 -ml-[6px]' />
              <span>{upvotes}</span>
            </Button>
            <Button variant='secondary'>
              <MessageSquare className='h-5 w-5 mr-2 -ml-[6px]' />
              <span>{comments}</span>
            </Button>
            <Button
              asChild
              variant='outline'
              size='default'
              disabled={!!disabled}
            >
              <Link href={link} prefetch={false} className='px-6 block'>
                View
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
