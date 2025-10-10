"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function IdleLogout({ timeout = 300000 }) { // 5 minutes
  const router = useRouter();
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const logoutUser = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "You’ve been logged out due to inactivity",
        description: "Please log in again to continue.",
        duration: 3000,
      });
      setTimeout(() => {
        router.push("/"); // redirect after toast
      }, 1500);
    } catch (error) {
      console.error("Logout failed", error);
      router.push("/"); // fallback redirect
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      logoutUser(); // call logout
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // start initial timer

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}
