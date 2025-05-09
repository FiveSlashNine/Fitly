import AuthCard from "@/components/AuthCard";
import Image from "next/image";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const { tab: rawTab } = await searchParams;
  const tab = rawTab === "signup" ? "signup" : "signin";

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 w-full items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6 md:w-1/2">
        <AuthCard initialTab={tab} />
      </div>

      <div className="relative hidden w-1/2 md:block">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="absolute bottom-8 left-8 z-20 max-w-md">
          <h2 className="mb-2 text-3xl font-bold text-white">
            Train smarter, not harder
          </h2>
          <p className="text-white/90">
            Book your gym sessions in advance and never miss a workout again.
          </p>
        </div>
        <Image
          src="/gym-image.jpg"
          alt="Gym workout"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
