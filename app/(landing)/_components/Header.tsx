import { ThemeToggler } from '@/components/ThemeToggler';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Squirrel } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Header() {
  const { sessionId } = auth();
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
          href='/projects'
          className='text-sm font-medium hover:underline underline-offset-4'
          prefetch={false}
        >
          All Projects
        </Link>
        {!sessionId ? null : (
          <Link
            href='/dashboard'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}
          >
            Dashboard
          </Link>
        )}
        {!sessionId ? (
          <>
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
          </>
        ) : null}
        {sessionId ? null : (
          <Link
            href='/auth/sign-in'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}
          >
            Get Started
          </Link>
        )}
        <ThemeToggler />
        {sessionId ? <UserButton /> : null}
      </nav>
    </header>
  );
}
