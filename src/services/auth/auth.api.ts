import axiosInstance from "../../lib/axios";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    username: string;
  };
  message: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login-employee", data);
  //console.log(response);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await axiosInstance.delete("/auth/logout-employee");
    //console.log("Logout response:", response.data);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export interface CurrentUserResponse {
  success: boolean;
  data: UserItem;
  message: string;
}

export interface UserItem {
    userName?: string;
    branch?: number;
    position?: string;
}

export const getCurrentUser = async (p0: { signal: AbortSignal; }): Promise<UserItem> => {
  const response = await axiosInstance.get<CurrentUserResponse>("/auth/web/current-user", {
  });
  //console.log("Axios current-user response:", response.data);
  return response.data.data;
};

export interface AddEmployeePayload {
  userCode: string;
  userName: string;
  empName: string;
  password: string;
  role: string;
  branchID:  number;
}

export interface EmployeeResponse {
  success: boolean;
  data: UserItem;
  message: string;
}

export const registerEmployee = async (payload: AddEmployeePayload): Promise<EmployeeResponse> => {
  const response = await axiosInstance.post<EmployeeResponse>("/auth/register-employee", payload);
  return response.data;
}


