import React from "react";
import { UserCircle, Loader2, X as XIcon } from "lucide-react";
import { User } from "@/app/types/user";

interface ParticipantsListProps {
  participants: User[];
  onClose: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function ParticipantsList({
  participants,
  onClose,
  error,
  isLoading,
}: ParticipantsListProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-[425px] w-full mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Participants</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <p className="mt-2 text-gray-600">Loading participants...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : participants.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No participants yet
            </p>
          ) : (
            participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <UserCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">
                    {participant.username}
                  </h3>
                  <p className="text-sm text-gray-600">{participant.email}</p>
                  <p className="text-sm text-gray-600">
                    {participant.phoneNumber}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
