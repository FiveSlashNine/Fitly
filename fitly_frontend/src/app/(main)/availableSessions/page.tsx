"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/app/lib/axios";
import SessionCard from "@/components/SessionCard";
import { Pagination } from "@/components/Pagination";
import { FilterSidebar } from "@/components/FilterSideBar";
import { useRouter } from "next/navigation";
import { Session, sessionStatuses, sessionTypes } from "@/app/types/session";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AvailableSessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const searchParams = useSearchParams();

  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";

  const [filters, setFilters] = useState({
    type: type,
    status: searchParams.get("status") || "",
    search: searchParams.get("search") || "",
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const params = Object.fromEntries(
          Object.entries({ location, type }).filter(([_, value]) => value)
        );

        const response = await axios.get<Session[]>(
          `${API_BASE_URL}/api/v1/sessions/public/getSessions`,
          {
            params,
          }
        );

        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [location, type]);

  useEffect(() => {
    const newFilters = {
      type: searchParams.get("type") || "",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
    };
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.type) {
      params.set("type", filters.type);
    } else {
      params.delete("type");
    }

    router.push(`?${params.toString()}`);
  }, [filters]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  const filteredSessions = sessions.filter((session) => {
    const matchesType =
      !filters.type || session.type === filters.type.toUpperCase();
    const matchesStatus =
      !filters.status || session.status === filters.status.toUpperCase();
    const matchesSearch =
      !filters.search ||
      session.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      session.description.toLowerCase().includes(filters.search.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = filteredSessions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full py-8 px-20 bg-green-50">
      <h1 className="text-3xl font-bold mb-6">Available Sessions</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          sessionTypes={sessionTypes}
          sessionStatuses={sessionStatuses}
          setCurrentPage={setCurrentPage}
        />

        <div className="flex-1">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
            {paginatedSessions.map((session) => (
              <li key={session.id}>
                <SessionCard session={session} />
              </li>
            ))}
          </ul>

          {filteredSessions.length > 0 ? (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No sessions match your filters. Try adjusting your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
