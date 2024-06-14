import { SignIn } from '@clerk/nextjs';
import React from 'react';

export default function Signin() {
  return (
    <div className='h-full w-full justify-center items-center'>
      <SignIn />
    </div>
  );
}
