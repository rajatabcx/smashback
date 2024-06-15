'use client';

import { CircleChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/benefits.png' alt='Empty Search' height={300} width={300} />
      <h2 className='text-2xl font-semibold mt-6'>OOPS!!</h2>
      <p className='text-muted-foreground mt-1 mb-6 text-base'>
        Something went wrong
      </p>
      <Link href='/projects'>
        <Button variant='secondary' size='lg'>
          Go Back <CircleChevronRight className='w-4 h-4 ml-1' />
        </Button>
      </Link>
    </div>
  );
}
