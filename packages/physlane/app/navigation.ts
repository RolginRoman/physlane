import { useSearchParams } from 'next/navigation';

export const useRelativeQueryParams = () => {
  const searchParams = useSearchParams();
  const resolveRelativeParams: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    resolveRelativeParams[key] = value;
  }
  return (newParams: Record<string, string | null>) => {
    const urlSearchParams = new URLSearchParams(resolveRelativeParams);
    for (const [key, value] of Object.entries(newParams)) {
      if (value == null) {
        urlSearchParams.delete(key);
        continue;
      }
      urlSearchParams.set(key, value);
    }

    return urlSearchParams.toString() === ''
      ? undefined
      : urlSearchParams.toString();
  };
};
