export interface Plot {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  area: number;
  areaLabel: string;
  location: string;
  rera: string;
  status: 'Available' | 'Sold Out';
  tag?: string;
}

export const allPlots: Plot[] = [
  { id: '1', title: '200 Sq Yd Residential Plot in Sector 102, Gurgaon', price: 4500000, priceLabel: '\u20B945,00,000', area: 200, areaLabel: '200 Sq Yd', location: 'Sector 102, Gurgaon', rera: 'RERA: HR/420/152/2023', status: 'Available', tag: 'Corner Plot' },
  { id: '2', title: '150 Sq Yd Residential Plot in Sohna Road', price: 2800000, priceLabel: '\u20B928,00,000', area: 150, areaLabel: '150 Sq Yd', location: 'Sohna', rera: 'RERA: HR/418/150/2023', status: 'Available', tag: 'Park Facing' },
  { id: '3', title: '300 Sq Yd Residential Plot in Sector 65, Gurgaon', price: 7200000, priceLabel: '\u20B972,00,000', area: 300, areaLabel: '300 Sq Yd', location: 'Sector 65', rera: 'RERA: HR/421/161/2023', status: 'Available', tag: 'Main Road Facing' },
  { id: '4', title: '500 Sq Yd Residential Plot in Jajjar Highway', price: 8500000, priceLabel: '\u20B985,00,000', area: 500, areaLabel: '500 Sq Yd', location: 'Jajjar', rera: 'RERA: HR/422/172/2023', status: 'Sold Out' },
  { id: '5', title: '120 Sq Yd Residential Plot in Sohna Town', price: 1800000, priceLabel: '\u20B918,00,000', area: 120, areaLabel: '120 Sq Yd', location: 'Sohna', rera: 'RERA: HR/417/148/2023', status: 'Available' },
  { id: '6', title: '250 Sq Yd Residential Plot in Sector 102, Gurgaon', price: 6200000, priceLabel: '\u20B962,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Sector 102, Gurgaon', rera: 'RERA: HR/423/180/2023', status: 'Available', tag: 'Corner Plot' },
  { id: '7', title: '180 Sq Yd Residential Plot on Dwarka Expressway', price: 5500000, priceLabel: '\u20B955,00,000', area: 180, areaLabel: '180 Sq Yd', location: 'Dwarka Expressway', rera: 'RERA: HR/424/190/2023', status: 'Available', tag: 'Park Facing' },
  { id: '8', title: '90 Sq Yd Residential Plot in Sohna', price: 1200000, priceLabel: '\u20B912,00,000', area: 90, areaLabel: '90 Sq Yd', location: 'Sohna', rera: 'RERA: HR/425/195/2023', status: 'Available' },
  { id: '9', title: '400 Sq Yd Corner Plot in Sector 65, Gurgaon', price: 9800000, priceLabel: '\u20B998,00,000', area: 400, areaLabel: '400 Sq Yd', location: 'Sector 65', rera: 'RERA: HR/426/200/2023', status: 'Available', tag: 'Corner Plot' },
  { id: '10', title: '220 Sq Yd Residential Plot on Dwarka Expressway', price: 6800000, priceLabel: '\u20B968,00,000', area: 220, areaLabel: '220 Sq Yd', location: 'Dwarka Expressway', rera: 'RERA: HR/427/205/2023', status: 'Available', tag: 'Main Road Facing' },
  { id: '11', title: '160 Sq Yd Residential Plot in Gurgaon', price: 3800000, priceLabel: '\u20B938,00,000', area: 160, areaLabel: '160 Sq Yd', location: 'Gurgaon', rera: 'RERA: HR/428/210/2023', status: 'Available' },
  { id: '12', title: '600 Sq Yd Residential Plot in Jajjar', price: 11000000, priceLabel: '\u20B91.10 Cr', area: 600, areaLabel: '600 Sq Yd', location: 'Jajjar', rera: 'RERA: HR/429/215/2023', status: 'Available', tag: 'Park Facing' },
  { id: '13', title: '150 Sq Yd Residential Plot in Vrindavan, Mathura', price: 2200000, priceLabel: '\u20B922,00,000', area: 150, areaLabel: '150 Sq Yd', location: 'Mathura', rera: 'RERA: UP/410/105/2024', status: 'Available', tag: 'Park Facing' },
  { id: '14', title: '250 Sq Yd Residential Plot on GIDA Sector 1, Gorakhpur', price: 3200000, priceLabel: '\u20B932,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Gorakhpur', rera: 'RERA: UP/411/110/2024', status: 'Available', tag: 'Corner Plot' },
  { id: '15', title: '180 Sq Yd Residential Plot in Ayodhya Near Sarayu', price: 4800000, priceLabel: '\u20B948,00,000', area: 180, areaLabel: '180 Sq Yd', location: 'Ayodhya', rera: 'RERA: UP/412/115/2024', status: 'Available', tag: 'Main Road Facing' },
  { id: '16', title: '300 Sq Yd Residential Plot in Gomti Nagar, Lucknow', price: 8500000, priceLabel: '\u20B985,00,000', area: 300, areaLabel: '300 Sq Yd', location: 'Lucknow', rera: 'RERA: UP/413/120/2024', status: 'Available', tag: 'Park Facing' },
  { id: '17', title: '200 Sq Yd Residential Plot in Chaumuhan, Mathura', price: 2800000, priceLabel: '\u20B928,00,000', area: 200, areaLabel: '200 Sq Yd', location: 'Mathura', rera: 'RERA: UP/414/125/2024', status: 'Available' },
  { id: '18', title: '120 Sq Yd Residential Plot near Gorakhpur Airport', price: 1800000, priceLabel: '\u20B918,00,000', area: 120, areaLabel: '120 Sq Yd', location: 'Gorakhpur', rera: 'RERA: UP/415/130/2024', status: 'Available', tag: 'Corner Plot' },
  { id: '19', title: '400 Sq Yd Residential Plot on Faizabad Road, Ayodhya', price: 12000000, priceLabel: '\u20B91.20 Cr', area: 400, areaLabel: '400 Sq Yd', location: 'Ayodhya', rera: 'RERA: UP/416/135/2024', status: 'Available' },
  { id: '20', title: '250 Sq Yd Residential Plot in Sushant Golf City, Lucknow', price: 7200000, priceLabel: '\u20B972,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Lucknow', rera: 'RERA: UP/417/140/2024', status: 'Available', tag: 'Corner Plot' },
];

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getPlotBySlug(slug: string): Plot | undefined {
  return allPlots.find((p) => slugify(p.title) === slug);
}
