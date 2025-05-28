"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/app/[locale]/lib/auth";
import { useAuthStore } from "@/app/[locale]/lib/store";
import { Session } from "@/app/[locale]/types/session";
import { useTranslations } from "next-intl";

interface SignUpFormProps {
  onToggleForm: () => void;
}

export default function SignUpForm({ onToggleForm }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setNeedsGym } = useAuthStore();
  const t = useTranslations("SignUpForm");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      return;
    }

    setError(null);
    const formData = new FormData(event.currentTarget);

    const newUser = {
      username: formData.get("username") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      isGymOwner: formData.get("ownsGym") !== null,
      roles: "Simple",
      sessions: [] as Session[],
    };

    try {
      const result = await register(newUser);

      if (result.success) {
        setNeedsGym(newUser.isGymOwner);
        onToggleForm();
      } else {
        setError(result.error ?? t("registrationFailed"));
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || t("unexpectedError"));
      else setError(t("unexpectedError"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="username">{t("usernameLabel")}</Label>
        <Input
          id="username"
          name="username"
          placeholder="JohnDoe"
          pattern="[a-zA-Z0-9._]{1,20}"
          required
          title={t("usernamePatternTitle")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">{t("phoneNumberLabel")}</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="6912345678"
          pattern="[0-9]{0,14}$"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("passwordLabel")}</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            minLength={6}
            required
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
              {showPassword ? t("hidePassword") : t("showPassword")}
            </span>
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="ownsGym" name="ownsGym" />
        <Label
          htmlFor="ownsGym"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("ownsGymLabel")}
        </Label>
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        {t("createAccountButton")}
      </Button>
      <div className="text-center text-sm">
        <p>
          {t("alreadyHaveAccount")}
          <Button
            variant="link"
            className="h-auto p-0 text-green-600"
            onClick={onToggleForm}
          >
            {t("signInButton")}
          </Button>
        </p>
      </div>
    </form>
  );
}
