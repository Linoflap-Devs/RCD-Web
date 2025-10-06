import AccessGuard from "@/components/pages/AccessGuard";
import AgentsRegistrations from "@/components/pages/AgentsRegistration";

export default function Page() {
  return (
    <AccessGuard>
      <AgentsRegistrations />
    </AccessGuard>
  )
}