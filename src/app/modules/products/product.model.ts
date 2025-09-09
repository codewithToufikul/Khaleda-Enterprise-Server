import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

export const productSchema = new Schema<IProduct>({
  sku: { type: String, unique: true },
  category: String, // Fish, Meat, Veg, Frozen, Others
  subCategory: String,
  name: { type: String, required: true },
  commonName: { en: String, bn: String },
  scientificName: String,
  cutForm: String, // Whole, Fillet, IQF
  size: String, // e.g., 16/20
  grade: String,
  glazingPercent: Number,
  packagingType: String,
  netWeightPerPack: Number,
  cartonWeight: Number,
  unitsPerPallet: Number,
  moq: String,
  shelfLife: String,
  storageTemp: String,
  origin: String,
  images: [String], // urls
  specSheet: String, // pdf url
  certifications: [String],
  availability: {
    type: String,
    enum: ["In Stock", "Pre-order", "Seasonal"],
    default: "In Stock",
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

productSchema.index({ name: 'text', 'commonName.en': 'text' });

export const Product = model<IProduct>("Products", productSchema);
