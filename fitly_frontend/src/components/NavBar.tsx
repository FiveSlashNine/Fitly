"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/app/lib/store";
import { CircleUser } from "lucide-react";

export default function NavBar() {
  const { accessToken, needsGym, setAuthTokens, logout, isGymOwner } =
    useAuthStore();

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [setAuthTokens]);

  return (
    <div className="flex flex-col bg-white relative">
      <header className="flex justify-between items-center px-8 py-5 shadow-md bg-gradient-to-b from-emerald-50 to-white z-600">
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
          <Link
            href="/contactPage"
            className="hidden md:inline text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            Επικοινωνία
          </Link>
          <Link
            href="/availableSessions"
            className="hidden md:inline text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            Διαθέσιμα Προγράμματα
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
                      Επικοινωνία
                    </Link>
                    <Link
                      href="/availableSessions"
                      className="block md:hidden text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      Διαθέσιμα Προγράμματα
                    </Link>

                    {accessToken ? (
                      <>
                        {needsGym && (
                          <Link
                            href="/registerGym"
                            className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                            onClick={() => setMenuOpen(false)}
                          >
                            Εγγραφή Γυμναστηρίου
                          </Link>
                        )}
                        <Link
                          href="/bookedSessions"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          Booked Προγράμματα
                        </Link>
                        <Link
                          href="/userProfile"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          Το profile μου
                        </Link>
                        {isGymOwner && !needsGym && (
                          <Link
                            href="/gymDashboard"
                            className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                            onClick={() => setMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setMenuOpen(false);
                          }}
                          className="text-sm text-left text-red-600 hover:bg-gray-100 px-4 py-2 rounded"
                        >
                          Αποσύνδεση
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/signin"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          Σύνδεση
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          Εγγραφή
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
