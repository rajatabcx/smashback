import { RequestStatus } from '@/lib/enums';
import { ChevronUp } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { RequestStatusTag } from './RequestStatusTag';

interface PropTypes {
  title: string;
  description: string;
  authorName: string;
  createdAt: number;
  upvotes: number;
  status: RequestStatus;
  pledgeAmount: number;
}

export function RequestCard({
  authorName,
  createdAt,
  description,
  pledgeAmount,
  status,
  title,
  upvotes,
}: PropTypes) {
  return (
    <div className='rounded-lg shadow-md bg-card border border-secondary group'>
      <div className='p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold'>{title}</h3>
          <div className='flex items-center gap-2'>
            <RequestStatusTag status={status} />
            <div className='rounded-full px-2 py-1 text-xs font-medium bg-primary text-primary-foreground'>
              ${pledgeAmount} pledged
            </div>
          </div>
        </div>
        <p className='text-muted-foreground'>{description}</p>
        <div className='flex items-center justify-between'>
          <div className='flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 select-none'>
            <p className='text-muted-foreground'>{authorName},</p>
            <p className='text-muted-foreground'>
              {formatDistanceToNow(createdAt)}
            </p>
          </div>
          <div className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <Button variant='secondary'>
                <ChevronUp className='h-5 w-5 mr-2' />
                <span>{upvotes} upvotes</span>
              </Button>
            </div>
            <Button asChild variant='outline' size='default'>
              <Link
                href='/open-requests'
                prefetch={false}
                className='px-6 block'
              >
                View
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
