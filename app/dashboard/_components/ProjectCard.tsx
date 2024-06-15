import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface PropTypes {
  authorName: string;
  createdAt: number;
  title: string;
  slug: string;
}

export function ProjectCard({ authorName, createdAt, slug, title }: PropTypes) {
  return (
    <div>
      <Link href={`/dashboard/p/${slug}`}>
        <div className='rounded-lg bg-card p-6 shadow-lg group border border-secondary hover:bg-secondary-foreground transition-all'>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold group-hover:text-secondary'>
              {title}
            </h3>
            <p className='text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity'>
              {authorName}, {formatDistanceToNow(createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
