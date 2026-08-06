export function parseAmount(value: string | number | null | undefined): number {
  if (typeof value === "number") return isFinite(value) ? value : 0;
  if (!value) return 0;
  const parsed = parseFloat(String(value).replace(/[₦$,]/g, ""));
  return isFinite(parsed) ? parsed : 0;
}

export function formatNaira(value: string | number | null | undefined): string {
  return `₦${parseAmount(value).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })}`;
}

export function sumNairaAmount(
  records: { naira_amount?: string | number | null }[],
): string {
  const total = records.reduce(
    (sum, record) => sum + parseAmount(record.naira_amount),
    0,
  );
  return formatNaira(total);
}

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
