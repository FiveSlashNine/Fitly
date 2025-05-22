import { GymStatistics } from "@/app/types/gym";
import { Loader2, TrendingUp, Users, DollarSign, Euro } from "lucide-react";

interface StatisticsTabProps {
  statistics: GymStatistics | null;
  isLoading: boolean;
}

export default function StatisticsTab({
  statistics,
  isLoading,
}: StatisticsTabProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="mt-2 text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <TrendingUp className="h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-600">No statistics available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Sessions</p>
            <p className="text-2xl font-semibold">{statistics.totalSessions}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Participants</p>
            <p className="text-2xl font-semibold">
              {statistics.totalParticipants}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-full">
            <Euro className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-semibold">${statistics.totalRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
