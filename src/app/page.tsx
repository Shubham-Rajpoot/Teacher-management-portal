'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.replace('/dashboard');
    }
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          aria-label="Loading"
        ></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Redirecting to Dashboard...
        </h1>
        <p className="text-gray-600">Please wait</p>
      </div>
    </div>
  );
}
