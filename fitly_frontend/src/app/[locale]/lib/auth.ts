"use client";
import { useAuthStore } from "@/app/[locale]/lib/store";
import axios, { isAxiosError } from "@/app/[locale]/lib/axios";
import { Session } from "@/app/[locale]/types/session";

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
  } catch (err: unknown) {
    console.error("Login error:", err);

    let message = "Invalid email or password.";
    if (isAxiosError(err) && err.response?.data?.error) {
      message = err.response.data.error;
    }

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
  sessions: Session[];
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
  } catch (err: unknown) {
    console.error("Registration error:", err);

    let message = "An unexpected error occurred.";
    if (isAxiosError(err)) {
      message = err.response?.data?.error || err.message || message;
    }

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
  } catch (err: unknown) {
    console.error("Gym Registration error:", err);

    let message = "An unexpected error occurred during gym registration.";
    if (isAxiosError(err)) {
      message = err.response?.data?.error || err.message || message;
    }
    return {
      success: false,
      error: message,
    };
  }
}
