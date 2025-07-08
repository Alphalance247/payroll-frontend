export function formatCurrencyShort(value: number): string {
  if (value >= 1_000_000_000) {
    return (
      (value / 1_000_000_000).toFixed(value % 1_000_000_000 === 0 ? 0 : 1) + "B"
    );
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1) + "K";
  } else {
    return value.toString();
  }
}
