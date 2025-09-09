// interfaces/product.interface.ts
export interface IProduct {
  sku?: string;
  category?: string; // Fish, Meat, Veg, Frozen, Others
  subCategory?: string;
  name: string;
  commonName?: {
    en?: string;
    bn?: string;
  };
  scientificName?: string;
  cutForm?: string; // Whole, Fillet, IQF
  size?: string; // e.g., 16/20
  grade?: string;
  glazingPercent?: number;
  packagingType?: string;
  netWeightPerPack?: number;
  cartonWeight?: number;
  unitsPerPallet?: number;
  moq?: string;
  shelfLife?: string;
  storageTemp?: string;
  origin?: string;
  images?: string[]; // urls
  specSheet?: string; // pdf url
  certifications?: string[];
  availability?: "In Stock" | "Pre-order" | "Seasonal";
  tags?: string[];
  createdAt?: Date;
}

