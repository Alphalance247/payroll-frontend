// hooks/useFilter.ts
import { useCallback, useMemo, useState } from "react";

export interface FilterState {
  [key: string]: string;
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (
      acc &&
      typeof acc === "object" &&
      key in (acc as Record<string, unknown>)
    ) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
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
          if (key === "status") {
            // Use exact match for status
            return (
              typeof field === "string" &&
              field.toLowerCase() === value.toLowerCase()
            );
          }
          // Default: substring match
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

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
  };
}
