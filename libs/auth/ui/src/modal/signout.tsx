'use client';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@physlane/ui';
import { signOut } from 'next-auth/react';

export function SignOut() {
  return (
    <Dialog>
      <DialogTrigger>Sign out</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you leaving?</DialogTitle>
          <DialogDescription className="pt-4">
            You're already missing, Champ
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
