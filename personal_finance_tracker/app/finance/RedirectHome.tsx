'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectHome() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after short delay (optional)
    const timer = setTimeout(() => {
      router.push('/');
    }, 100); // or 0 for instant

    return () => clearTimeout(timer);
  }, [router]);

  return null; // Or show a loading spinner briefly
}
