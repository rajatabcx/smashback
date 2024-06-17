'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode } from 'react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
  });
}

interface PropTypes {
  children: ReactNode;
}

export default function PosthogProvider({ children }: PropTypes) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
