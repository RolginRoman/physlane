import { useCallback, useEffect, useMemo, useRef } from "react";

export default function useTimeout(callback: () => unknown, delay: number) {
  const timeoutRef = useRef<number | null>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      timeoutRef.current && window.clearTimeout(timeoutRef.current);
    };
  }, [timeoutRef]);

  const memoizedCallback = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      callbackRef.current?.();
    }, delay);
  }, [delay, timeoutRef, callbackRef]);

  return useMemo(() => [memoizedCallback], [memoizedCallback]);
}
