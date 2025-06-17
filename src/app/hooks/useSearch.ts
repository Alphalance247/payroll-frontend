import { useMemo } from "react";

interface SearchOptions<T> {
  data: T[];
  searchQuery: string;
  searchFields: (keyof T)[];
  caseSensitive?: boolean;
}

export function useSearch<T>({
  data,
  searchQuery,
  searchFields,
  caseSensitive = false,
}: SearchOptions<T>) {
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();

    return data.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field];
        if (typeof fieldValue === "string") {
          const value = caseSensitive ? fieldValue : fieldValue.toLowerCase();
          return value.includes(query);
        }
        return false;
      });
    });
  }, [data, searchQuery, searchFields, caseSensitive]);

  return filteredData;
}
