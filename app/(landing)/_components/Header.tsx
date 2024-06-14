import { ThemeToggler } from '@/components/ThemeToggler';
import { Squirrel } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Header() {
  return (
    <header className='px-4 lg:px-6 h-14 flex items-center'>
      <div className='flex gap-1 items-center'>
        <Link
          href='/'
          className='flex items-center justify-center'
          prefetch={false}
        >
          <Squirrel className='h-6 w-6' />
          <span className='sr-only'>Smashback</span>
        </Link>
        <h1 className='font-bold'>Smashback</h1>
      </div>
      <nav className='ml-auto flex gap-4 sm:gap-6 items-center'>
        <Link
          href='/open-requests'
          className='text-sm font-medium hover:underline underline-offset-4'
          prefetch={false}
        >
          Feature Requests
        </Link>
        <Link
          href='#howitworks'
          className='text-sm font-medium hover:underline underline-offset-4'
          prefetch={false}
        >
          How It Works
        </Link>
        <Link
          href='/pricing'
          className='text-sm font-medium hover:underline underline-offset-4'
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href='/auth/sign-up'
          className='text-sm font-medium hover:underline underline-offset-4'
          prefetch={false}
        >
          Get Started
        </Link>
        <ThemeToggler />
      </nav>
    </header>
  );
}
