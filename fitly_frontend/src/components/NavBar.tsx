"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/app/lib/store";
import { CircleUser } from "lucide-react";
import { getGymIdByUserId } from "@/app/lib/sessionHandler";

export default function NavBar() {
  const { accessToken, needsGym, setAuthTokens, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [setAuthTokens]);

  return (
    <div className="flex flex-col bg-white">
      <header className="flex justify-between items-center px-8 py-5 shadow-md bg-gradient-to-b from-emerald-50 to-white z-10">
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
        <nav className="flex items-center gap-6">
          <Link
            href="/contactPage"
            className="text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            Επικοινωνία
          </Link>
          <Link
            href="/availableSessions"
            className="text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            Διαθέσιμα Προγράμματα
          </Link>

          {!loading &&
            (accessToken ? (
              <>
                {needsGym && (
                  <Link
                    href="/registerGym"
                    className="text-sm text-gray-600 hover:text-emerald-700 transition-colors"
                  >
                    Εγγραφή Γυμναστηρίου
                  </Link>
                )}
                <Link
                  href="/bookedSessions"
                  className="text-sm text-gray-600 hover:text-emerald-700 transition-colors"
                >
                  Booked Προγράμματα
                </Link>
                  <Link
                    href="/gymDashboard"
                    className="text-sm text-gray-600 hover:text-emerald-700 transition-colors"
                  title="Προφίλ Γυμναστηρίου"
                >
                  <CircleUser className="w-10 h-10" />
                </Link>
                <Link
                  href="/"
                  onClick={logout}
                  className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-emerald-300 transition-colors"
                >
                  Αποσύνδεση
                </Link>
            
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-emerald-300 transition-colors"
                >
                  Σύνδεση
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Εγγραφή
                </Link>
              </>
            ))}
        </nav>
      </header>
    </div>
  );
}
