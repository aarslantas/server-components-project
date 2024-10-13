import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { createProduct } from "@/lib/actions";
import { Suspense } from "react";

export default async function CreateProductPage() {
  return (
    <div className="container">
      <ProductForm />
    </div>
  );
}
