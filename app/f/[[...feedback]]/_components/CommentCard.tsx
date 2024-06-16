import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface PropTypes {
  comment: string;
  authorName: string;
  createdAt: number;
  authorImageURL?: string;
}

export function CommentCard({
  authorName,
  comment,
  createdAt,
  authorImageURL,
}: PropTypes) {
  return (
    <div>
      <h1 className='text-base text-primary-foreground'>{comment}</h1>
      <div className='mt-1 flex gap-1 items-center'>
        {authorImageURL ? (
          <Image
            src={authorImageURL}
            alt='Profile Image'
            height={24}
            width={24}
            className='rounded-full'
          />
        ) : null}
        <p className='text-xs text-muted-foreground'>{authorName},</p>
        <p className='text-xs text-muted-foreground'>
          {formatDistanceToNow(createdAt)}
        </p>
      </div>
    </div>
  );
}
