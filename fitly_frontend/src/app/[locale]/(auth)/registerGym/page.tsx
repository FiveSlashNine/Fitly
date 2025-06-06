"use client";
import { useAuthStore } from "@/app/[locale]/lib/store";
import SignUpGymForm from "@/components/Forms/SignUpGymForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function RegisterGym() {
  const { needsGym } = useAuthStore();
  const t = useTranslations("RegisterGymPage");

  if (!needsGym) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center space-y-4">
        <div className="border-t-4 border-green-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 w-full items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6 md:w-1/2">
        <Card className="w-full max-w-md border-none bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <Dumbbell className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpGymForm />
          </CardContent>
        </Card>
      </div>

      <div className="relative hidden w-1/2 md:block">
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div className="absolute bottom-8 left-8 z-20 max-w-md">
          <h2 className="mb-2 text-3xl font-bold text-white">{t("quote")}</h2>
          <p className="text-white/90">{t("subheading")}</p>
        </div>
        <Image
          src="/gym-image.jpg"
          alt="Gym workout"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
