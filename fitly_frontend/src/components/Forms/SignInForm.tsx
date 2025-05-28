"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/[locale]/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface SignInFormProps {
  onToggleForm: () => void;
}

export default function SignInForm({ onToggleForm }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("SignInForm");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await login(email, password);
    if (result.success && result.accessToken) {
      router.push("/");
    } else {
      setError(result.error ?? t("invalidCredentials"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="signin-email">{t("emailLabel")}</Label>
        <Input
          id="signin-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">{t("passwordLabel")}</Label>
        <div className="relative">
          <Input
            id="signin-password"
            name="password"
            type={showPassword ? "text" : "password"}
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
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        {t("signInButton")}
      </Button>
      <div className="text-center text-sm">
        <p>
          {t("noAccount")}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-green-600"
            onClick={onToggleForm}
          >
            {t("signUpButton")}
          </Button>
        </p>
      </div>
    </form>
  );
}
