import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create product
const createProductDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// get all the products
const getProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// update single product
const updateSingleProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>
) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};

// delete single product
const deleteSingleProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// search product
const searchProductInDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i"); // 'i' makes the search case-insensitive
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { tags: { $in: [regex] } }, // Search for the term within tags array
    ],
  });
  return result;
};

export const ProductService = {
  createProductDB,
  getProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
  searchProductInDB,
};
