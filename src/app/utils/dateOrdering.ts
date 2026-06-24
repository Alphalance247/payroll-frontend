/**
 * Get years in descending order from current year
 * @returns Array of years in descending order (2 years before current year + current year + 5 future years)
 */
export const getYearsInDescendingOrder = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  // Generate years from 2 years back to 5 years ahead
  for (let i = -6; i <= 0; i++) {
    years.push(currentYear + i);
  }
  return years.sort((a, b) => b - a);
};

/**
 * Get months starting from current month
 * @returns Array of months with value and label, starting from current month
 */
export const getMonthsFromCurrentMonth = (): Array<{
  value: string;
  label: string;
}> => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const months = [];
  // Start from current month
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth + i) % 12;
    months.push({
      value: String(monthIndex + 1).padStart(2, "0"),
      label: monthNames[monthIndex],
    });
  }
  return months;
};

/**
 * Convert month number to month name
 * @param monthNumber - Month number as string (1-12)
 * @returns Month name or empty string if invalid
 */
export const getMonthName = (monthNumber: string): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const index = parseInt(monthNumber) - 1;
  return monthNames[index] || "";
};
