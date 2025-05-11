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
  };
  setFilters: Dispatch<
    SetStateAction<{
      type: string;
      status: string;
      search: string;
    }>
  >;
  sessionTypes: string[];
  sessionStatuses: string[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export function FilterSidebar({
  filters,
  setFilters,
  sessionTypes,
  sessionStatuses,
  setCurrentPage,
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
            <Label htmlFor="type">Session Type</Label>
            <Select
              value={filters.type}
              onValueChange={(value) => {
                if (value === "all") {
                  handleFilterChange("type", "");
                } else {
                  handleFilterChange("type", value);
                }
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

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => {
                if (value === "all") {
                  handleFilterChange("status", "");
                } else {
                  handleFilterChange("status", value);
                }
              }}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {sessionStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
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
