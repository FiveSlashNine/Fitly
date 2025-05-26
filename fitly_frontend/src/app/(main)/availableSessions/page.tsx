"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Session, sessionStatuses, sessionTypes } from "@/app/types/session";
import { useAuthStore } from "@/app/lib/store";
import { bookSession, fetchSessions } from "@/app/lib/sessionHandler";
import { FilterSidebar } from "@/components/FilterSideBar";
import SessionCard from "@/components/SessionCard";
import { Pagination } from "@/components/Pagination";

const itemsPerPage = 20;

function AvailableSessionsPage() {
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
  const { userId, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    const fetch = async () => {
      const params: Record<string, string | number | null> = {
        location: filters.location,
        type: filters.type,
        status: "ACTIVE",
        searchQuery: filters.search,
        userId: userId === -1 ? null : userId,
        page: currentPage - 1,
        size: itemsPerPage,
      };

      if (filters.sort && filters.sort !== "default") {
        const [sortField, sortOrder] = filters.sort.split(",");
        params.sort = `${sortField},${sortOrder}`;
      }

      const response = await fetchSessions(params);
      setSessions(response.content);
      setTotalPages(response.totalPages);
    };

    fetch();
  }, [filters, currentPage, userId, hasHydrated]);

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
  }, [filters, router, searchParams]);

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
          showStatusFilter={false}
        />

        <div className="flex-1">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
            {sessions.map((session) => (
              <li key={session.id}>
                <SessionCard
                  session={session}
                  buttonLabel={userId !== -1 ? "Book Session" : undefined}
                  action={
                    userId !== -1
                      ? async () => {
                          await bookSession(userId, session.id);
                          const params: Record<string, string | number | null> =
                            {
                              location: filters.location,
                              type: filters.type,
                              status: "ACTIVE",
                              searchQuery: filters.search,
                              userId: userId === -1 ? null : userId,
                              page: currentPage - 1,
                              size: itemsPerPage,
                            };
                          const updated = await fetchSessions(params);
                          setSessions(updated.content);
                          setTotalPages(updated.totalPages);
                        }
                      : undefined
                  }
                />
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

export default function AvailableSessionsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AvailableSessionsPage />
    </Suspense>
  );
}
