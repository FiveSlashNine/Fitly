import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Session } from "@/app/types/session";

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
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
    <Card className="h-full flex flex-col overflow-hidden p-0">
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
