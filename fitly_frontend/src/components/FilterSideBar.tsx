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
import { useTranslations } from "next-intl";

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

  const t = useTranslations("FilterSidebar");

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="w-full md:w-64 shrink-0">
      <Card>
        <CardHeader>
          <CardTitle>{t("filters")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">{t("search")}</Label>
            <Input
              id="search"
              placeholder={t("searchPlaceholder")}
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t("location")}</Label>
            <Input
              id="location"
              placeholder={t("locationPlaceholder")}
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">{t("type")}</Label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) => {
                handleFilterChange("type", value === "all" ? "" : value);
              }}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder={t("allTypes")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allTypes")}</SelectItem>
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
              <Label htmlFor="status">{t("status")}</Label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => {
                  handleFilterChange("status", value === "all" ? "" : value);
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder={t("allStatuses")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allStatuses")}</SelectItem>
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
            <Label htmlFor="sort">{t("sortBy")}</Label>
            <Select
              value={filters.sort || "default"}
              onValueChange={(value) => {
                handleFilterChange("sort", value === "default" ? "" : value);
              }}
            >
              <SelectTrigger id="sort">
                <SelectValue placeholder={t("sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">{t("default")}</SelectItem>
                <SelectItem value="startTime,asc">{t("startAsc")}</SelectItem>
                <SelectItem value="startTime,desc">{t("startDesc")}</SelectItem>
                <SelectItem value="endTime,asc">{t("endAsc")}</SelectItem>
                <SelectItem value="endTime,desc">{t("endDesc")}</SelectItem>
                <SelectItem value="capacity,asc">{t("capacityAsc")}</SelectItem>
                <SelectItem value="capacity,desc">
                  {t("capacityDesc")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleReset}
          >
            {t("reset")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
