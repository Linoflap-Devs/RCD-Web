import AccessGuard from "@/components/pages/AccessGuard";
import Dashboard from "@/components/pages/Dashboard";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <AccessGuard>
        <Dashboard />
      </AccessGuard>
    </Suspense>
  )
}