import { Session } from "@/app/lib/sessionHandler";
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import SessionDetails from "@/components/SessionDetails";
import { CalendarIcon, ClockIcon, UsersIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface MySessionsProps {
  sessions: Session[];
  loading: boolean;
  onRefresh?: () => void;
}

interface SessionCardProps {
  session: Session;
  onClick: () => void;
}

function SessionCard({ session, onClick }: SessionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "full":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card 
      onClick={onClick}
      className="h-full flex flex-col overflow-hidden p-0 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-48">
        <Image
          loader={({ src }) => src}
          src={session.imageUrl || "/placeholder.svg"}
          alt={session.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{session.title}</CardTitle>
          <Badge className={`${getStatusColor(session.status)} text-white`}>
            {session.status}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Type: {session.type}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4 text-sm">{session.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {session.startTime} - {session.endTime}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <UsersIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Capacity: {session.capacity}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 pb-4">
        <div className="text-lg font-semibold">{session.cost}</div>
      </CardFooter>
    </Card>
  );
}

export default function MySessions({ sessions, loading, onRefresh }: MySessionsProps) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleSessionDeleted = () => {
    setSelectedSession(null);
    if (onRefresh) {
      onRefresh();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="mt-4 text-sm text-gray-500">Loading sessions...</p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-emerald-50 p-3 mb-4">
          <svg
            className="h-6 w-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sessions Found</h3>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          Check back later or create a new session.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
            onClick={() => setSelectedSession(session)}
          />
        ))}
      </div>
      <SessionDetails
        session={selectedSession}
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        onSessionUpdated={onRefresh}
        onSessionDeleted={handleSessionDeleted}
      />
    </div>
  );
}