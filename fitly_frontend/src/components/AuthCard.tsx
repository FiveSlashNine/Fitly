"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";
import SignInForm from "@/components/Forms/SignInForm";
import SignUpForm from "@/components/Forms/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabType = "signin" | "signup";

interface AuthCardProps {
  initialTab?: TabType;
}

export default function AuthCard({ initialTab = "signin" }: AuthCardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    router.push(`/auth/${newTab}`);
  };

  const toggleForm = () => {
    handleTabChange(activeTab === "signin" ? "signup" : "signin");
  };

  return (
    <Card className="w-full max-w-md border-none bg-white/80 shadow-lg backdrop-blur-sm">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center">
          <Dumbbell className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">FitBook</CardTitle>
        <CardDescription>Book your gym sessions with ease</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            handleTabChange(value as TabType);
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-4">
            <SignInForm onToggleForm={toggleForm} />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <SignUpForm onToggleForm={toggleForm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
