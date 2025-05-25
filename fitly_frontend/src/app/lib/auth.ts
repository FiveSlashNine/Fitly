"use client";
import { useAuthStore } from "@/app/lib/store";
import axios from "@/app/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface LoginResult {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { accessToken, refreshToken, userId, needsGym, isGymOwner } =
      response.data;
    const setAuthTokens = useAuthStore.getState().setAuthTokens;
    const setUserId = useAuthStore.getState().setUserId;
    const setNeedsGym = useAuthStore.getState().setNeedsGym;
    const setIsGymOwner = useAuthStore.getState().setIsGymOwner;
    setAuthTokens(accessToken, refreshToken);
    setUserId(userId);
    setNeedsGym(needsGym === "true");
    setIsGymOwner(isGymOwner === "true");
    return { success: true, accessToken };
  } catch (err: any) {
    console.error("Login error:", err);
    const message = err.response?.data?.error || "Invalid email or password.";
    return { success: false, error: message };
  }
}

export interface RegisterParams {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  isGymOwner: boolean;
  roles: string;
  sessions: any[];
}

export interface RegisterResult {
  success: boolean;
  userId?: string;
  error?: string;
}

export async function register(
  params: RegisterParams
): Promise<RegisterResult> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/users`, params);
    return { success: true, userId: response.data.id };
  } catch (err: any) {
    console.error("Registration error:", err);

    const message =
      err.response?.data?.error ||
      err.message ||
      "An unexpected error occurred.";

    return { success: false, error: message };
  }
}

export interface RegisterGymResult {
  success: boolean;
  gymId?: string;
  error?: string;
}

export async function registerGym(
  gymName: string,
  gymLocation: string,
  userId: number
): Promise<RegisterGymResult> {
  const payload = {
    name: gymName,
    location: gymLocation,
    ownerUser: { id: userId },
    sessionList: [],
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/gyms`, payload, {
      params: { userId },
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: true,
      gymId: response.data.id,
    };
  } catch (err: any) {
    console.error("Gym Registration error:", err);
    const message =
      err.response?.data?.error ||
      err.message ||
      "An unexpected error occurred during gym registration.";
    return {
      success: false,
      error: message,
    };
  }
}
