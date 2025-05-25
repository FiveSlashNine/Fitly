"use client";

import { getUserDetails, UpdateUserDetails } from "@/app/lib/sessionHandler";
import { useAuthStore } from "@/app/lib/store";
import { User } from "@/app/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserDetailsForms() {
  const { userId, hasHydrated } = useAuthStore();
  const [user, setUser] = useState<User>();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (userId === -1) {
      redirect("/");
    }
  }, [userId, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated || userId === -1) return;

    const fetchUserDetails = async () => {
      setUser(await getUserDetails(userId));
    };

    fetchUserDetails();
  }, [userId, hasHydrated]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      return;
    }

    setError(null);
    const formData = new FormData(event.currentTarget);

    const updatedUser: User = {
      ...user!,
      username: formData.get("username") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      password: (formData.get("password") as string) || undefined,
    };

    setLoading(true);
    try {
      const res = await UpdateUserDetails(updatedUser);
      setUser(res);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !user) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email}
          disabled
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          defaultValue={user.username}
          pattern="[a-zA-Z0-9._]{1,20}"
          title="Username must have at least 1 character and contain only letters, numbers, underscores or hyphens."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          pattern="[0-9]{0,14}$"
          defaultValue={user.phoneNumber}
          title="Phone Numbers Can Contain Up to 14 Digits (Not Characters)"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">
          New Password (leave blank to keep current)
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="******"
            minLength={6}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-10"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
