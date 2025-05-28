"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationMessage({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) {
  const t = useTranslations("DeleteConfirmationMessage");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg border-2 border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-red-800">{t("title")}</h2>
        </div>

        <p className="text-gray-600 mb-6">{t("message")}</p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {t("confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
}
