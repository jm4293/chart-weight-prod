'use client';

import { useIsMutating } from '@tanstack/react-query';
import Loading from './Loading';

export default function GlobalLoading() {
  const isMutating = useIsMutating();

  if (isMutating === 0) {
    return null;
  }

  return <Loading />;
}
