import EditUserDetailsForms from "@/components/Forms/EditUserDetailsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function UserProfilePage() {
  const t = useTranslations("UserProfilePage");
  return (
    <div className="bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <EditUserDetailsForms />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
