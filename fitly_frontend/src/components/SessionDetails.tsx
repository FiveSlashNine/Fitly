import { Session } from "@/app/types/session";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import EditSessionForm from "./Forms/EditSessionForm";
import {
  deleteSession,
  getStatusColor,
  updateSession,
} from "@/app/lib/sessionHandler";
import { useAuthStore } from "@/app/lib/store";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  XIcon,
  DumbbellIcon,
  Users,
} from "lucide-react";
import ParticipantsList from "./ParticipantsList";
import { getSessionParticipants } from "@/app/lib/sessionHandler";
import { User } from "@/app/types/user";

interface SessionDetailsProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSessionUpdated?: () => void;
  onSessionDeleted?: () => void;
}

export default function SessionDetails({
  session,
  isOpen,
  onClose,
  onSessionUpdated,
  onSessionDeleted,
}: SessionDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { accessToken } = useAuthStore();
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [participantsError, setParticipantsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    setIsEditing(false);
    setShowDeleteConfirm(false);
    setShowParticipants(false);
    setParticipants([]);
    setParticipantsError(null);
  }, [session]);

  if (!session || !isOpen) return null;

  const handleDelete = async () => {
    if (!accessToken) return;

    try {
      await deleteSession(session.id);
      onClose();
      if (onSessionDeleted) {
        onSessionDeleted();
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!session || !accessToken) return;

    session.status = newStatus;
    try {
      await updateSession(session);
      if (onSessionUpdated) {
        onSessionUpdated();
      }
      onClose();
    } catch (error) {
      console.error("Error updating session status:", error);
    }
  };

  const handleViewParticipants = async () => {
    if (!session || !accessToken) return;

    setIsLoadingParticipants(true);
    setParticipantsError(null);

    try {
      const users = await getSessionParticipants(session.id);
      setParticipants(users);
      setShowParticipants(true);
    } catch (error) {
      console.error("Error fetching participants:", error);
      setParticipantsError("Failed to load participants");
    } finally {
      setIsLoadingParticipants(false);
    }
  };

  if (isEditing) {
    return (
      <EditSessionForm
        session={session}
        onClose={() => setIsEditing(false)}
        onSessionUpdated={() => {
          setIsEditing(false);
          onClose();
          if (onSessionUpdated) {
            onSessionUpdated();
          }
        }}
      />
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg p-6 max-w-[425px] w-full mx-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">{session.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                    session.status
                  )}`}
                >
                  {session.status}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <DumbbellIcon className="h-4 w-4" />
                  {session.type}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Description</h4>
              <p className="text-gray-600 text-lg leading-relaxed break-words whitespace-pre-line overflow-auto max-h-[150px] overflow-wrap-anywhere">
                {session.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-600">{session.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-600">
                  {session.startTime} - {session.endTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-600">
                  Capacity: {session.capacity} spots
                </span>
              </div>
            </div>

            {!showDeleteConfirm ? (
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex-1"
                >
                  Edit Session
                </Button>
                <Button
                  variant="outline"
                  onClick={handleViewParticipants}
                  className="flex-1"
                  disabled={isLoadingParticipants}
                >
                  <Users className="w-4 h-4" />
                  {isLoadingParticipants ? "Loading..." : "View Participants"}
                </Button>
                <select
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={session.status}
                >
                  <option value="ACTIVE">Set Active</option>
                  <option value="CANCELLED">Set Cancelled</option>
                  <option value="FULL">Set Full</option>
                </select>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex-1"
                >
                  Delete Session
                </Button>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete this session?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex-1"
                  >
                    Confirm Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showParticipants && (
        <ParticipantsList
          participants={participants}
          onClose={() => {
            setShowParticipants(false);
            setParticipants([]);
          }}
          error={participantsError}
          isLoading={isLoadingParticipants}
        />
      )}
    </>
  );
}
