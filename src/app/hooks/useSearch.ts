import { useMemo } from "react";

interface SortOptions<T> {
  field: keyof T;
  direction: "asc" | "desc";
}

interface SearchOptions<T> {
  data: T[];
  searchQuery: string;
  searchFields: (keyof T)[];
  caseSensitive?: boolean;
  sortOptions?: SortOptions<T>;
}

export function useSearch<T>({
  data,
  searchQuery,
  searchFields,
  caseSensitive = false,
  sortOptions,
}: SearchOptions<T>) {
  const filteredAndSortedData = useMemo(() => {
    // First apply search filter
    let result = data;

    if (searchQuery.trim()) {
      const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();
      result = data.filter((item) => {
        return searchFields.some((field) => {
          const fieldValue = item[field];
          if (typeof fieldValue === "string") {
            const value = caseSensitive ? fieldValue : fieldValue.toLowerCase();
            return value.includes(query);
          }
          return false;
        });
      });
    }

    // Then apply sorting if sortOptions is provided
    if (sortOptions) {
      const { field, direction } = sortOptions;
      result = [...result].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return direction === "asc" ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });
    }

    return result;
  }, [data, searchQuery, searchFields, caseSensitive, sortOptions]);

  return filteredAndSortedData;
}
