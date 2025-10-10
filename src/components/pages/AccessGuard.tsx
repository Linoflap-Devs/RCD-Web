'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

interface AccessGuardProps {
  children: React.ReactNode;
}

export default function AccessGuard({ children }: AccessGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // useEffect(() => {
  //   async function verifyToken() {
  //     try {
  //       console.log("Checking token via /api/auth/verify...");

  //       // Fetch from your verify route — cookies are automatically included
  //       const res = await fetch("/api/auth/verify", {
  //         method: "GET",
  //         credentials: "include", // send HTTP-only cookies
  //       });


  //       const data = await res.json();
  //       console.log("Verify response:", data);

  //       if (res.ok && data?.success) {
  //         console.log("Token valid. Access granted.");
  //         setIsAuthorized(true);
  //       } else {
  //         console.warn("Invalid or missing token. Redirecting...");
  //         router.replace("/");
  //       }
  //     } catch (err) {
  //       console.error("Error verifying token:", err);
  //       router.replace("/");
  //     } finally {
  //       setChecking(false);
  //     }
  //   }

  //   verifyToken();
  // }, [router]);

  // if (checking) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <Loader className="animate-spin h-8 w-8 text-primary" />
  //     </div>
  //   );
  // }

  //return isAuthorized ? <>{children}</> : null;
  return <>{children}</>

}
