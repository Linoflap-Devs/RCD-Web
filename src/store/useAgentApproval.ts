import { create } from "zustand";
import { AgentsRegisItem } from "@/services/agents/agents.api";

type AgentApprovalState = {
  selectedAgent: AgentsRegisItem | null;
  setSelectedAgent: (agent: AgentsRegisItem | null) => void;
  clearSelectedAgent: () => void;
};

export const useAgentApproval = create<AgentApprovalState>((set) => ({
  selectedAgent: null,

  setSelectedAgent: (agent) => set({ selectedAgent: agent }),

//   addSelectedAgent: (agent) =>
//     set((state) => {
//       const exists = state.selectedAgent.some(
//         (a) => a.AgentRegistrationID === agent.AgentRegistrationID
//       );
//       if (exists) return state;
//       return { selectedAgent: [...state.selectedAgent, agent] };
//     }),

//   removeSelectedAgent: (id) =>
//     set((state) => ({
//       selectedAgent: state.selectedAgent.filter(
//         (a) => a.AgentRegistrationID !== id
//       ),
//     })),

  clearSelectedAgent: () => set({ selectedAgent: null }),
}));
