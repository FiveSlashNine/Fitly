"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerGym, RegisterGymResult } from "@/app/lib/auth";
import { useAuthStore } from "@/app/lib/store";

export default function SignUpGymForm() {
  const router = useRouter();
  const { userId, setNeedsGym } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      return;
    }

    setError(null);

    const formData = new FormData(event.currentTarget);
    const gymName = formData.get("gymName") as string;
    const gymLocation = formData.get("gymLocation") as string;

    let result: RegisterGymResult;
    try {
      result = await registerGym(gymName, gymLocation, userId);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      return;
    }

    if (result.success) {
      router.push("/");
      setNeedsGym(false);
    } else {
      setError(
        result.error ??
          "Registration failed. Please check your details and try again."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="GymName">Gym Name</Label>
        <Input
          id="GymName"
          name="gymName"
          type="text"
          pattern="[a-zA-Z0-9._]{1,20}"
          title="Gym name must have at least 1 character and contain only letters, numbers, underscores or hyphens."
          placeholder="Your Gym's Name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="GymLocation">Gym Location</Label>
        <Input
          id="GymLocation"
          name="gymLocation"
          type="text"
          placeholder="Egnatia 156, Thessaloniki"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Register Gym
      </Button>
    </form>
  );
}
