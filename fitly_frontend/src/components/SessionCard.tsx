import {
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Session } from "@/app/[locale]/types/session";
import { Button } from "./ui/button";
import { getStatusColor } from "@/app/[locale]/lib/sessionHandler";
import { useTranslations } from "next-intl";

interface SessionCardProps {
  session: Session;
  buttonLabel?: string;
  action?: () => void;
}

export default function SessionCard({
  session,
  buttonLabel,
  action,
}: SessionCardProps) {
  const handleClick = () => {
    if (action) action();
  };

  const t = useTranslations("SessionCard");

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
          {t("type", { type: session.type })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4 text-sm">{session.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <BuildingIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium">{session.gym.name}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{session.gym.location}</span>
          </div>
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
            <span>{t("capacity", { count: session.capacity })}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 pb-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
          {t("cost", { cost: session.cost })}
        </div>
        {buttonLabel && <Button onClick={handleClick}>{buttonLabel}</Button>}
      </CardFooter>
    </Card>
  );
}
