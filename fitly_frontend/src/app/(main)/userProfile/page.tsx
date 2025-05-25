import EditUserDetailsForms from "@/components/Forms/EditUserDetailsForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserProfilePage() {
  return (
    <div className="bg-gradient-to-b from-white to-green-50">
    <div className="container mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Credentials</CardTitle>
          <CardDescription>
            View and update your account information. Your email address cannot
            be changed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <EditUserDetailsForms />
        </CardContent>
      </Card>
    </div></div>
  );
}
