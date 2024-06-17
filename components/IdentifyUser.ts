'use client';
import { useUser } from '@clerk/nextjs';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

export function IdentifyUser() {
  const user = useUser();
  const posthog = usePostHog();

  useEffect(() => {
    if (user.isLoaded && user.isSignedIn) {
      posthog.identify(user.user.id, {
        name: user.user.fullName,
        userName: user.user.username,
        id: user.user.id,
        imageURL: user.user.imageUrl,
        primaryEmailAddress: user.user.primaryEmailAddress?.emailAddress,
      });
    }
  }, [user, posthog]);

  return null;
}
