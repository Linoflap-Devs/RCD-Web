'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useAuth } from '@/store/useAuth';

interface AccessGuardProps {
  allowedTypes?: number[];
  children: React.ReactNode;
}

export default function AccessGuard({ allowedTypes = [], children }: AccessGuardProps) {
  const router = useRouter();
  const { user, loading, initialized } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingStorage, setCheckingStorage] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const isLoggingOut = sessionStorage.getItem("loggingOut");

    //console.log("AccessGuard mounted");
    //console.log("path:", path);
    //console.log("loggingOut flag:", isLoggingOut);
    //console.log("user:", user);

    if (isLoggingOut) {
      //console.log("Skipping AccessGuard check (logging out...)");
      setIsAuthorized(false);
      setCheckingStorage(false);
      return;
    }

    // Allow home/login/register without validation
    const publicPaths = ["/", "/login", "/register"];
    if (publicPaths.includes(path)) {
      //console.log("Public path, skipping guard");
      setIsAuthorized(true);
      setCheckingStorage(false);
      return;
    }

    const storedAuth = sessionStorage.getItem('auth-storage');
    if (!storedAuth) {
      //console.warn("No auth-storage found — redirecting to /not-found");
      router.replace('/not-found');
      return;
    }

    try {
      const parsed = JSON.parse(storedAuth);
      const storedUser = parsed?.state?.user;

      //console.log("storedUser:", storedUser);

      if (!storedUser) {
        //console.warn("storedUser empty — redirecting");
        router.replace('/not-found');
        return;
      }

      if (storedUser.userName && storedUser.branch && storedUser.position) {
        setIsAuthorized(true);
      } else if (storedUser.UserType && allowedTypes.includes(storedUser.UserType ?? 2)) {
        setIsAuthorized(true);
      } else {
        console.warn("User not allowed — redirecting");
        router.replace('/not-found');
      }
    } catch (error) {
      console.error('Invalid auth-storage format:', error);
      router.replace('/not-found');
    } finally {
      setCheckingStorage(false);
    }
  }, [router, allowedTypes]);

  if (checkingStorage) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
