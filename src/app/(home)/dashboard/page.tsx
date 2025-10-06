import AccessGuard from "@/components/pages/AccessGuard";
import Dashboard from "@/components/pages/Dashboard";

export default function Page() {
  return (
    <AccessGuard>
      <Dashboard />
    </AccessGuard>
  )
}