"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/app/[locale]/lib/store";
import { CircleUser } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function NavBar() {
  const { accessToken, needsGym, setAuthTokens, logout, isGymOwner } =
    useAuthStore();

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("NavBar");

  useEffect(() => {
    setLoading(false);
  }, [setAuthTokens]);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const targetLocale = currentLocale === "el" ? "en" : "el";

  const switchLocale = () => {
    router.push(pathname, { locale: targetLocale });
  };

  return (
    <div className="flex flex-col bg-white relative">
      <header className="flex justify-between items-center px-8 py-5 shadow-md bg-gradient-to-b from-emerald-50 to-white z-55">
        <div className="flex items-center">
          <Image
            src="/Fitly_Check.svg"
            alt="FITLY Logo"
            width={60}
            height={65}
            className="mr-3 h-auto"
          />
          <Link href="/" className="text-2xl font-bold text-emerald-700">
            FITLY
          </Link>
        </div>
        <nav className="flex items-center gap-6 relative">
          <button
            onClick={switchLocale}
            className="text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            {targetLocale.toUpperCase()}
          </button>
          <Link
            href="/contactPage"
            className="hidden md:inline text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            {t("contact")}
          </Link>
          <Link
            href="/availableSessions"
            className="hidden md:inline text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            {t("sessions")}
          </Link>

          {!loading && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="focus:outline-none"
                title="Μενού χρήστη"
              >
                <CircleUser className="w-10 h-10 text-gray-700 hover:text-emerald-700 transition-colors" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="flex flex-col p-2">
                    <Link
                      href="/contactPage"
                      className="block md:hidden text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t("contact")}
                    </Link>
                    <Link
                      href="/availableSessions"
                      className="block md:hidden text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t("sessions")}
                    </Link>

                    {accessToken ? (
                      <>
                        {needsGym && (
                          <Link
                            href="/registerGym"
                            className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                            onClick={() => setMenuOpen(false)}
                          >
                            {t("registerGym")}
                          </Link>
                        )}
                        <Link
                          href="/bookedSessions"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          {t("booked")}
                        </Link>
                        <Link
                          href="/userProfile"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          {t("profile")}
                        </Link>
                        {isGymOwner && !needsGym && (
                          <Link
                            href="/gymDashboard"
                            className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                            onClick={() => setMenuOpen(false)}
                          >
                            {t("dashboard")}
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setMenuOpen(false);
                          }}
                          className="text-sm text-left text-red-600 hover:bg-gray-100 px-4 py-2 rounded"
                        >
                          {t("logout")}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/signin"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          {t("signin")}
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          {t("signup")}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
