import { Gym } from "./gym";

export interface Session {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  cost: string;
  startTime: string;
  endTime: string;
  capacity: number;
  status: string;
  imageUrl: string;
  gym: Gym;
  sessionHolder?: [];
}

export const sessionTypes = [
  "YOGA",
  "PILATES",
  "CARDIO",
  "CROSSFIT",
  "WEIGHTLIFTING",
  "ALT",
];

export const sessionStatuses = ["ACTIVE", "FULL", "CANCELLED"];
