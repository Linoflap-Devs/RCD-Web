import axiosInstance from "@/lib/axios";

export interface AgentsItem {
  AgentID: number;
  AgentCode: string;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  ContactNumber: string;
  DivisionID: string;
  AgentTaxRate: number;
  CivilStatus: string;
  Sex: string;
  Address: string;
  Birthdate: string; // ISO date string
  PositionID: number;
  ReferredByID: number;
  UpdateBy: number;
  LastUpdate: string; // ISO date string
  PRCNumber: string;
  DSHUDNumber: string;
  IsActive: number;
  ReferredCode: string;
  PersonEmergency: string;
  ContactEmergency: string;
  AddressEmergency: string;
  AffiliationDate: string; // ISO date string
  Religion: string | null;
  Birthplace: string | null;
  TelephoneNumber: string | null;
  SSSNumber: string | null;
  PhilhealthNumber: string | null;
  PagIbigNumber: string | null;
  TINNumber: string | null;
  EmployeeIDNumber: string | null;
}

export interface AgentsResponse {
  success: boolean;
  data: AgentsItem[];
  message?: string;
}

export const getAgents = async (): Promise<AgentsResponse> => {
  const response = await axiosInstance.get<AgentsResponse>("/agents");
  return response.data; 
};

//////////////////===============================

export interface ProfileImage {
  FileName: string;
  ContentType: string;
  FileExt: string;
  FileSize: number;
  FileContent: string; // base64 or binary as string
}

export interface ExperienceItem {
  AgentWorkExpID: number;
  Company: string;
  EndDate: string;
  JobTitle: string;
  StartDate: string;
}

export interface AgentsRegisItem {
  AgentID: number;
  AgentRegistrationID: number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  Password: string;
  Gender: string;
  CivilStatus: string;
  Religion: string;
  Birthdate: string; // ISO date string
  Birthplace: string;
  Address: string;
  TelephoneNumber: string;
  ContactNumber: string;
  SssNumber: string;
  PhilhealthNumber: string;
  PagibigNumber: string;
  TinNumber: string;
  PrcNumber: string;
  DshudNumber: string;
  EmployeeIdNumber: string;
  ProfileImage: ProfileImage;
  Experience: ExperienceItem[];
}

export interface AgentsRegisResponse {
  success: boolean;
  data: AgentsRegisItem[];
  message?: string; 
}

export const getAgentsRegistrations = async (): Promise<AgentsRegisResponse> => {
  const response = await axiosInstance.get<AgentsRegisResponse>("/agents/registrations");
  console.log(response);
  return response.data; 
}

//////////////////===============================

export interface ApproveAgentResponse {
  success: boolean;
  data: AgentsRegisItem[];
  message?: string; 
}

export const approveAgent = async (agentRegistrationId: number, agentId?: number): Promise<ApproveAgentResponse> => {
  const response = await axiosInstance.post<ApproveAgentResponse>(
    `/auth/approve-registration`,
    { agentRegistrationId, 
      agentId
    }
  );
  return response.data;
}
