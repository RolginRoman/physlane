import { useToast, ToastPayload } from '@physlane/ui';
import { useSearchParams } from 'next/navigation';
import { useRef, useEffect } from 'react';

function resolveErrorMessage(errorType: string): ToastPayload {
  return {
    description: errorType.toLowerCase(),
    duration: 10000,
    id: '',
    title: 'Something wrong happened',
  };
}

export function AuthErrorToast() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const signInErrorNotification = useRef(
    null as ReturnType<typeof toast> | null
  );

  const signInError = searchParams.get('error');
  if (signInError && !signInErrorNotification.current) {
    signInErrorNotification.current = toast({
      ...resolveErrorMessage(signInError),
      variant: 'destructive',
    });
  }

  useEffect(() => {
    const dismissToast = () => {
      signInErrorNotification?.current?.dismiss();
    };
    document.addEventListener('pointerdown', dismissToast);

    return () => {
      document.removeEventListener('pointerdown', dismissToast);
      dismissToast();
    };
  }, []);

  return null;
}
