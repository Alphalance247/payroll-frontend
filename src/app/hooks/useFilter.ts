// hooks/useFilter.ts
import { useMemo, useState } from "react";

export interface FilterState {
  [key: string]: string;
}

function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function useFilter<T>(
  data: T[],
  keysToSearch: (keyof T | string)[] = []
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({});

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesAllFilters = Object.entries(filters).every(
        ([key, value]) => {
          if (!value) return true;
          const field = getNestedValue(item, key);
          return (
            typeof field === "string" &&
            field.toLowerCase().includes(value.toLowerCase())
          );
        }
      );

      const matchesSearch =
        keysToSearch.length === 0 ||
        keysToSearch.some((key) => {
          const field = getNestedValue(item, key as string);
          return (
            typeof field === "string" &&
            field.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

      return matchesAllFilters && matchesSearch;
    });
  }, [data, filters, searchQuery]);

  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
  };
}
