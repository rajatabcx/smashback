import { ThemeToggler } from '@/components/ThemeToggler';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Squirrel } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Header() {
  const { sessionId } = auth();
  return (
    <header className='px-4 lg:px-6 py-4 flex items-center border-b-[1px] border-border sticky top-0 bg-background'>
      <div className='flex gap-1 items-center'>
        <Link
          href='/'
          className='flex items-center justify-center gap-2'
          prefetch={false}
        >
          <Squirrel className='h-6 w-6' />
          <h1 className='font-bold'>Smashback</h1>
        </Link>
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
