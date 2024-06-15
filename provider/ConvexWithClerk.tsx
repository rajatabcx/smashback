'use client';

import { FullPageLoading } from '@/components/FullPageLoading';
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  useAuth,
} from '@clerk/nextjs';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';

interface PropTypes {
  children: ReactNode;
}

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const clerkPublishableKey = process.env
  .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export function ConvexWithClerk({ children }: PropTypes) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>{children}</ClerkLoaded>
        <ClerkLoading>
          <FullPageLoading />
        </ClerkLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
