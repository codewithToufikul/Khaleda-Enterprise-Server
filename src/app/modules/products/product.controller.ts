import express, { Request, Response } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { errorResponse, successResponse } from "../../utils/response";
import { Product } from "./product.model";

export const productRoute = express.Router();

productRoute.post("/add", verifyToken, async (req: Request, res: Response) => {
  try {
    const { productData } = req.body;
    const product = await Product.create(productData);
    return successResponse(res, "Product Added", product, 200);
  } catch (error: any) {
    console.log("Failed to add product", error.message);
    return errorResponse(res, "Failed to add product", error.message, 500);
  }
});

productRoute.get("/gets", async (req: Request, res: Response) => {
  try {
    const {
      category,
      subCategory,
      availability,
      origin,
      q,          // text search
      sortBy,     // e.g., "createdAt", "name"
      order,      // "asc" | "desc"
      page = "1",
      limit = "10",
    } = req.query;

    // ✅ Build filter object
    let filter: any = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (availability) filter.availability = availability;
    if (origin) filter.origin = origin;

    // ✅ Text search (name + commonName.en only, because tags indexing বাদ দিয়েছেন)
    if (q) {
      filter.$or = [
        { name: { $regex: q as string, $options: "i" } },
        { "commonName.en": { $regex: q as string, $options: "i" } },
        { "commonName.bn": { $regex: q as string, $options: "i" } }
      ];
    }

    // ✅ Sorting
    let sort: any = { createdAt: -1 }; // default: latest first
    if (sortBy) {
      sort = { [sortBy as string]: order === "asc" ? 1 : -1 };
    }

    // ✅ Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Product.countDocuments(filter);

    return successResponse(res, "Fetch All Products", {
      total,
      page: pageNum,
      limit: limitNum,
      products,
    }, 200);

  } catch (error: any) {
    console.log("Failed to fetch products", error.message);
    return errorResponse(res, "Failed to fetch products", error.message, 500);
  }
});


productRoute.put(
  "/update/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { productData } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        productData,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return errorResponse(res, "Product not found", null, 404);
      }

      return successResponse(res, "Product updated successfully", updatedProduct, 200);
    } catch (error: any) {
      console.log("Failed to update product", error.message);
      return errorResponse(res, "Failed to update product", error.message, 500);
    }
  }
);

productRoute.delete(
  "/delete/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return errorResponse(res, "Product not found", null, 404);
      }

      return successResponse(res, "Product deleted successfully", deletedProduct, 200);
    } catch (error: any) {
      console.log("Failed to delete product", error.message);
      return errorResponse(res, "Failed to delete product", error.message, 500);
    }
  }
);
