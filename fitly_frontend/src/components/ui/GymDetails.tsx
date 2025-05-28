import { Loader2, XIcon } from "lucide-react";
import { Gym } from "@/app/[locale]/types/gym";
import { User } from "@/app/[locale]/types/user";
import { useTranslations } from "next-intl";

interface GymDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gymDetails: Gym | null;
  userDetails: User | null;
  loading: boolean;
}

export default function GymDetails({
  isOpen,
  onClose,
  gymDetails,
  userDetails,
  loading,
}: GymDetailsModalProps) {
  const t = useTranslations("GymDetails");

  if (!isOpen) return null;

  const handleClickOutsideModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed backdrop-blur-sm bg-black/30 inset-0 bg-opacity-50 flex items-center justify-center z-60"
      onClick={handleClickOutsideModal}
    >
      <div className="bg-white border-4 border-emerald-800 rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-800">{t("title")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="ml-2 text-gray-600">{t("loading")}</span>
          </div>
        ) : gymDetails ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">{t("gymName")}</p>
                <p className="font-medium text-lg">{gymDetails.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t("location")}</p>
                <p className="font-medium text-lg">{gymDetails.location}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-2xl font-bold text-emerald-800">
                {t("userTitle")}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">{t("username")}</p>
                  <p className="font-medium text-lg">{userDetails?.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("email")}</p>
                  <p className="font-medium text-lg">{userDetails?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("phone")}</p>
                  <p className="font-medium text-lg">
                    {userDetails?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500">{t("error")}</p>
        )}
      </div>
    </div>
  );
}
