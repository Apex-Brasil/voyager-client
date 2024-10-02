export const volumeFilterLabels = [
  {
    label: "All Times",
    value: "AllTimeVolume",
  },
  {
    label: "24 hours",
    value: "total_volume_24_hours",
  },
  {
    label: "7 days",
    value: "total_volume_7_days",
  },
  {
    label: "30 days",
    value: "total_volume_30_days",
  },
  {
    label: "90 days",
    value: "total_volume_90_days",
  },
];

export const labels = [
  "rank",
  "collection",
  "volume (Wax)",
  "volume (USD)",
  "sales",
  "score",
];

export const filterOptions: { label: string; value: string }[] = [
  { label: "Sort by Total Volume", value: "volume" },
  { label: "Sort by Total Sales", value: "sales" },
];
