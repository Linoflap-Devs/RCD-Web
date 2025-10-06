import AccessGuard from "@/components/pages/AccessGuard";
import AgentsList from "@/components/pages/AgentsList";

export default function Page() {
  return (
    <AccessGuard>
      <AgentsList />
    </AccessGuard>
  );
}
