import { SignUp } from '@clerk/nextjs';
import React from 'react';

export default function Signup() {
  return (
    <div className='h-full w-full justify-center items-center'>
      <SignUp />
    </div>
  );
}
