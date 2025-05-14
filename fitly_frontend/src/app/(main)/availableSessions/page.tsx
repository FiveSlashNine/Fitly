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
  const searchParams = useSearchParams();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    status: searchParams.get("status") || "",
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    sort: searchParams.get("sort") || "",
  });

  const itemsPerPage = 20;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const params: Record<string, any> = {
          location: filters.location,
          type: filters.type,
          status: filters.status,
          searchQuery: filters.search,
          page: currentPage - 1,
          size: itemsPerPage,
        };

        if (filters.sort && filters.sort !== "default") {
          const [sortField, sortOrder] = filters.sort.split(",");
          params.sort = `${sortField},${sortOrder}`;
        }

        const response = await axios.get<{
          content: Session[];
          totalPages: number;
        }>(`${API_BASE_URL}/api/v1/sessions/public/getSessions`, {
          params,
        });

        setSessions(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [filters, currentPage]);

  useEffect(() => {
    const newFilters = {
      type: searchParams.get("type") || "",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
      location: searchParams.get("location") || "",
      sort: searchParams.get("sort") || "",
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

    if (filters.status) {
      params.set("status", filters.status);
    } else {
      params.delete("status");
    }

    if (filters.search) {
      params.set("search", filters.search);
    } else {
      params.delete("search");
    }

    if (filters.location) {
      params.set("location", filters.location);
    } else {
      params.delete("location");
    }

    if (filters.sort) {
      params.set("sort", filters.sort);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`);
  }, [filters]);

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
            {sessions.map((session) => (
              <li key={session.id}>
                <SessionCard session={session} />
              </li>
            ))}
          </ul>

          {sessions.length > 0 ? (
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
