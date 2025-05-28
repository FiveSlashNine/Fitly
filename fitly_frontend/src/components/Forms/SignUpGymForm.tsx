"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerGym, RegisterGymResult } from "@/app/[locale]/lib/auth";
import { useAuthStore } from "@/app/[locale]/lib/store";
import { useTranslations } from "next-intl";

export default function SignUpGymForm() {
  const router = useRouter();
  const { userId, setNeedsGym } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("SignUpGymForm");

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
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || t("unexpectedError"));
      else setError(t("unexpectedError"));
      return;
    }

    if (result.success) {
      router.push("/");
      setNeedsGym(false);
    } else {
      setError(result.error ?? t("registrationFailed"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="GymName">{t("gymNameLabel")}</Label>
        <Input
          id="GymName"
          name="gymName"
          type="text"
          pattern="[a-zA-Z0-9._]{1,20}"
          title={t("gymNamePatternTitle")}
          placeholder={t("gymNamePlaceholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="GymLocation">{t("gymLocationLabel")}</Label>
        <Input
          id="GymLocation"
          name="gymLocation"
          type="text"
          placeholder="Egnatia 156, Thessaloniki"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        {t("registerGymButton")}
      </Button>
    </form>
  );
}
