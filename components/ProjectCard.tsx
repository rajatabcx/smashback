import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PropTypes {
  authorName: string;
  createdAt: number;
  title: string;
  slug: string;
  id: string;
  link: string;
  authorImageURL?: string;
}

export function ProjectCard({
  authorName,
  createdAt,
  title,
  link,
  authorImageURL,
}: PropTypes) {
  return (
    <div>
      <Link href={link}>
        <div className='rounded-lg bg-card p-6 shadow-lg group border border-secondary hover:bg-secondary-foreground transition-all'>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold group-hover:text-secondary'>
              {title}
            </h3>
            <p className='text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center'>
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
        </div>
      </Link>
    </div>
  );
}
