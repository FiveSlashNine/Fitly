"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dispatch, SetStateAction } from "react";

interface FilterSidebarProps {
  filters: {
    type: string;
    status: string;
    search: string;
    location: string;
    sort: string;
  };
  setFilters: Dispatch<
    SetStateAction<{
      type: string;
      status: string;
      search: string;
      location: string;
      sort: string;
    }>
  >;
  sessionTypes: string[];
  sessionStatuses: string[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  showStatusFilter?: boolean;
}

export function FilterSidebar({
  filters,
  setFilters,
  sessionTypes,
  sessionStatuses,
  setCurrentPage,
  showStatusFilter = true,
}: FilterSidebarProps) {
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      type: "",
      status: "",
      search: "",
      location: "",
      sort: "",
    });
    setCurrentPage(1);
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="w-full md:w-64 shrink-0">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search sessions..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter location..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Session Type</Label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) => {
                handleFilterChange("type", value === "all" ? "" : value);
              }}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {sessionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {capitalizeFirstLetter(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showStatusFilter && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => {
                  handleFilterChange("status", value === "all" ? "" : value);
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {sessionStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {capitalizeFirstLetter(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="sort">Sort By</Label>
            <Select
              value={filters.sort || "default"}
              onValueChange={(value) => {
                handleFilterChange("sort", value === "default" ? "" : value);
              }}
            >
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="startTime,asc">Start Time (Asc)</SelectItem>
                <SelectItem value="startTime,desc">
                  Start Time (Desc)
                </SelectItem>
                <SelectItem value="endTime,asc">End Time (Asc)</SelectItem>
                <SelectItem value="endTime,desc">End Time (Desc)</SelectItem>
                <SelectItem value="capacity,asc">Capacity (Asc)</SelectItem>
                <SelectItem value="capacity,desc">Capacity (Desc)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
