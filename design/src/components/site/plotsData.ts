import type { Plot } from "./PlotCard";

export const ALL_PLOTS: Plot[] = [
  { id: "1", title: "200 Sq Yd Residential Plot in Sector 102, Gurgaon", price: 4500000, priceLabel: "â‚¹45,00,000", area: 200, areaLabel: "200 Sq Yd", location: "Sector 102, Gurgaon", rera: "RERA: HR/420/152/2023", status: "Available", tag: "Corner Plot" },
  { id: "2", title: "150 Sq Yd Residential Plot in Sohna Road", price: 2800000, priceLabel: "â‚¹28,00,000", area: 150, areaLabel: "150 Sq Yd", location: "Sohna", rera: "RERA: HR/418/150/2023", status: "Available", tag: "Park Facing" },
  { id: "3", title: "300 Sq Yd Residential Plot in Sector 65, Gurgaon", price: 7200000, priceLabel: "â‚¹72,00,000", area: 300, areaLabel: "300 Sq Yd", location: "Sector 65", rera: "RERA: HR/421/161/2023", status: "Available", tag: "Main Road Facing" },
  { id: "4", title: "500 Sq Yd Residential Plot in Jhajjar Highway", price: 8500000, priceLabel: "â‚¹85,00,000", area: 500, areaLabel: "500 Sq Yd", location: "Jhajjar", rera: "RERA: HR/422/172/2023", status: "Sold Out" },
  { id: "5", title: "120 Sq Yd Residential Plot in Sohna Town", price: 1800000, priceLabel: "â‚¹18,00,000", area: 120, areaLabel: "120 Sq Yd", location: "Sohna", rera: "RERA: HR/417/148/2023", status: "Available" },
  { id: "6", title: "250 Sq Yd Residential Plot in Sector 102, Gurgaon", price: 6200000, priceLabel: "â‚¹62,00,000", area: 250, areaLabel: "250 Sq Yd", location: "Sector 102, Gurgaon", rera: "RERA: HR/423/180/2023", status: "Available", tag: "Corner Plot" },
  { id: "7", title: "180 Sq Yd Residential Plot on Dwarka Expressway", price: 5500000, priceLabel: "â‚¹55,00,000", area: 180, areaLabel: "180 Sq Yd", location: "Dwarka Expressway", rera: "RERA: HR/424/190/2023", status: "Available", tag: "Park Facing" },
  { id: "8", title: "90 Sq Yd Residential Plot in Sohna", price: 1200000, priceLabel: "â‚¹12,00,000", area: 90, areaLabel: "90 Sq Yd", location: "Sohna", rera: "RERA: HR/425/195/2023", status: "Available" },
  { id: "9", title: "400 Sq Yd Corner Plot in Sector 65, Gurgaon", price: 9800000, priceLabel: "â‚¹98,00,000", area: 400, areaLabel: "400 Sq Yd", location: "Sector 65", rera: "RERA: HR/426/200/2023", status: "Available", tag: "Corner Plot" },
  { id: "10", title: "220 Sq Yd Residential Plot on Dwarka Expressway", price: 6800000, priceLabel: "â‚¹68,00,000", area: 220, areaLabel: "220 Sq Yd", location: "Dwarka Expressway", rera: "RERA: HR/427/205/2023", status: "Available", tag: "Main Road Facing" },
  { id: "11", title: "160 Sq Yd Residential Plot in Gurgaon", price: 3800000, priceLabel: "â‚¹38,00,000", area: 160, areaLabel: "160 Sq Yd", location: "Gurgaon", rera: "RERA: HR/428/210/2023", status: "Available" },
  { id: "12", title: "600 Sq Yd Residential Plot in Jhajjar", price: 11000000, priceLabel: "â‚¹1.10 Cr", area: 600, areaLabel: "600 Sq Yd", location: "Jhajjar", rera: "RERA: HR/429/215/2023", status: "Available", tag: "Park Facing" },
  { id: "13", title: "100 Sq Yd Residential Plot in Sector 102", price: 2200000, priceLabel: "â‚¹22,00,000", area: 100, areaLabel: "100 Sq Yd", location: "Sector 102, Gurgaon", rera: "RERA: HR/430/220/2023", status: "Sold Out" },
  { id: "14", title: "350 Sq Yd Residential Plot in Sector 65", price: 8400000, priceLabel: "â‚¹84,00,000", area: 350, areaLabel: "350 Sq Yd", location: "Sector 65", rera: "RERA: HR/431/225/2023", status: "Available", tag: "Corner Plot" },
  { id: "15", title: "75 Sq Yd Residential Plot in Sohna", price: 950000, priceLabel: "â‚¹9,50,000", area: 75, areaLabel: "75 Sq Yd", location: "Sohna", rera: "RERA: HR/432/230/2023", status: "Available" },
];

export const LOCATIONS = [
  "Gurgaon",
  "Sohna",
  "Jhajjar",
  "Sector 102, Gurgaon",
  "Sector 65",
  "Dwarka Expressway",
] as const;

export const SIZE_BUCKETS = [
  { id: "u100", label: "Under 100 sq yd", min: 0, max: 99 },
  { id: "100-200", label: "100 â€“ 200 sq yd", min: 100, max: 200 },
  { id: "200-500", label: "200 â€“ 500 sq yd", min: 201, max: 500 },
  { id: "500p", label: "500+ sq yd", min: 501, max: Infinity },
] as const;

export const PLOT_TAGS = ["Corner Plot", "Park Facing", "Main Road Facing"] as const;
export const STATUSES = ["Available", "Sold Out"] as const;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPlotBySlug(slug: string) {
  return ALL_PLOTS.find((p) => slugify(p.title) === slug);
}