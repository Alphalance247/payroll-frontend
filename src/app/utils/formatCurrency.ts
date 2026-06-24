export function formatCurrencyShort(value: string | number): string {
  const numValue =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  if (!isFinite(numValue) || isNaN(numValue)) return "0";

  if (numValue >= 1_000_000_000) {
    return parseFloat((numValue / 1_000_000_000).toFixed(1)) + "B";
  } else if (numValue >= 1_000_000) {
    return parseFloat((numValue / 1_000_000).toFixed(1)) + "M";
  } else if (numValue >= 1_000) {
    return parseFloat((numValue / 1_000).toFixed(2)) + "K";
  } else {
    return parseFloat(numValue.toFixed(2)).toString();
  }
}
