"use client";
import { useEffect, useState } from "react";
import {
  fetchGymStatistics,
  fetchSessions,
  getGymIdByUserId,
} from "@/app/lib/sessionHandler";
import { useAuthStore } from "@/app/lib/store";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, TrendingUp, Users, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MySessions from "@/components/ui/Mysessions";
import CreateSessionForm from "@/components/Forms/CreateSessionForm";
import SessionDetails from "@/components/SessionDetails";
import { Session } from "@/app/types/session";
import { GymStatistics } from "@/app/types/gym";
import { Pagination } from "@/components/Pagination";
import { redirect } from "next/navigation";

export default function GymOwnerDashboard() {
  const { userId, accessToken, hasHydrated } = useAuthStore();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"sessions" | "statistics">(
    "sessions"
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [gymStatistics, setGymStatistics] = useState<GymStatistics | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    if (!hasHydrated) return;
    if (userId === -1) {
      redirect("/");
    }
  }, [userId, hasHydrated]);

  const fetch = async () => {
    if (!hasHydrated) return;
    setLoading(true);
    try {
      const params: Record<string, any> = {
        userId: userId,
        ownedGymOnly: true,
        page: currentPage - 1,
        size: pageSize,
      };

      const data = await fetchSessions(params);
      setSessions(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGymStats = async () => {
    if (!hasHydrated) return;
    try {
      const gymId = await getGymIdByUserId(userId);
      const data = await fetchGymStatistics(gymId);
      setGymStatistics(data);
    } catch (error) {
      console.error("Error fetching gym statistics:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, [userId, accessToken, currentPage, hasHydrated]);

  useEffect(() => {
    if (activeTab === "statistics") {
      fetchGymStats();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-green-50">
      <header className="flex justify-between items-center px-8 pt-8 pb-2">
        <div className="w-32"></div>
        <Button
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-10 py-6 text-xl font-bold shadow-lg transition-all duration-300"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-6 h-6" />
          Create New Session
        </Button>
      </header>

      <main className="flex-grow px-8 pb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-12 text-center animate-fadeIn">
          Gym Owner Dashboard
        </h1>

        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="bg-emerald-50 p-1 rounded-lg mb-10 flex justify-center gap-0 w-full max-w-xl mx-auto">
            <button
              className={`w-1/2 py-3 text-lg rounded-l-lg font-semibold shadow-sm transition-colors ${
                activeTab === "sessions"
                  ? "bg-white text-emerald-700"
                  : "bg-transparent text-emerald-400 hover:bg-white/70"
              }`}
              onClick={() => setActiveTab("sessions")}
            >
              Sessions
            </button>
            <button
              className={`w-1/2 py-3 text-lg rounded-r-lg font-semibold shadow-sm transition-colors ${
                activeTab === "statistics"
                  ? "bg-white text-emerald-700"
                  : "bg-transparent text-emerald-400 hover:bg-white/70"
              }`}
              onClick={() => setActiveTab("statistics")}
            >
              Statistics
            </button>
          </div>

          <div className="w-full flex justify-center">
            {activeTab === "sessions" && (
              <Card className="w-full max-w-7xl bg-white border border-emerald-100 shadow-lg animate-fadeIn">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-emerald-900">
                    My Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 pb-8">
                  <MySessions
                    sessions={sessions}
                    loading={loading}
                    onRefresh={fetch}
                  />
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            {activeTab === "statistics" && (
              <Card className="w-full max-w-7xl bg-white border border-emerald-100 shadow-lg animate-fadeIn">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-emerald-900">
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 pb-8">
                  {!gymStatistics ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                      <p className="mt-2 text-gray-600">
                        Loading statistics...
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white rounded-lg border border-emerald-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-emerald-100 rounded-full">
                            <TrendingUp className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Total Sessions
                            </p>
                            <p className="text-2xl font-semibold text-emerald-900">
                              {gymStatistics.totalSessions}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-emerald-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-100 rounded-full">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Total Participants
                            </p>
                            <p className="text-2xl font-semibold text-emerald-900">
                              {gymStatistics.totalParticipants}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-emerald-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-purple-100 rounded-full">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Total Revenue
                            </p>
                            <p className="text-2xl font-semibold text-emerald-900">
                              ${gymStatistics.totalRevenue}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {showCreateModal && (
            <CreateSessionForm
              onClose={() => setShowCreateModal(false)}
              onSessionCreated={fetch}
            />
          )}

          <SessionDetails
            session={selectedSession}
            isOpen={!!selectedSession}
            onClose={() => setSelectedSession(null)}
            onSessionDeleted={fetch}
          />
        </div>
      </main>
    </div>
  );
}
