import { getAllProducts, getProductById } from "@/lib/data";

import PersonForm from "@/components/PersonForm";
import ProductForm from "@/components/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  return <ProductForm product={product} />;
}
