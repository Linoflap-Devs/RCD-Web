import AccessGuard from "@/components/pages/AccessGuard";
import AgentApproval from "@/components/pages/AgentApproval";

export default function Page() {
  return (
    <AccessGuard>
      <AgentApproval />
    </AccessGuard>
  )
}