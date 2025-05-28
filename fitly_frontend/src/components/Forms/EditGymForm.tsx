"use client";
import { useState } from "react";
import { Gym } from "@/app/[locale]/types/gym";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface EditGymFormProps {
  gym: Gym;
  onSuccess?: () => void;
  onCancel?: () => void;
  onUpdate: (updatedGym: Gym) => Promise<void>;
}

export default function EditGymForm({
  gym,
  onSuccess,
  onCancel,
  onUpdate,
}: EditGymFormProps) {
  const [name, setName] = useState(gym.name);
  const [location, setLocation] = useState(gym.location);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const t = useTranslations("EditGymForm");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onUpdate({ ...gym, name, location });
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 1500);
    } catch (err) {
      console.error("Error updating gym:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <CheckCircle2 className="h-12 w-12 text-emerald-600 mb-4" />
        <p className="text-lg font-medium text-emerald-800">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t("locationLabel")}</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("cancelButton")}
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading ? t("savingButton") : t("saveButton")}
        </Button>
      </div>
    </form>
  );
}
