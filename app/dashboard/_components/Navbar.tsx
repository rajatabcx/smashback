import { ThemeToggler } from '@/components/ThemeToggler';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Squirrel } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Navbar() {
  const { sessionId } = auth();
  return (
    <header className='px-4 lg:px-6 flex items-center py-4'>
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
        <ThemeToggler />
        {sessionId ? <UserButton afterSignOutUrl='/' /> : null}
      </nav>
    </header>
  );
}
