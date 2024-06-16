import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface PropTypes {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function SigninModal({ open, setOpen }: PropTypes) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please sign in to continue</AlertDialogTitle>
          <AlertDialogDescription>
            I created Smashback to collect feedback from users like you. Sign in
            to post, vote, comment and connect with community.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href='/auth/sign-in'>
            <AlertDialogAction>Continue</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
