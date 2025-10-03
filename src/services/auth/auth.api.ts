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
  console.log(response);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await axiosInstance.delete("/auth/logout-employee");
    console.log("Logout response:", response.data);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const getCurrentUser = async (): Promise<{ Email: string; UserType: number }> => {
  const response = await axiosInstance.get("/auth/current-user");
  return response.data.data;
};