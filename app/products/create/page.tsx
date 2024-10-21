import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { createProduct } from "@/lib/actions";
import { Suspense, useCallback, useState } from "react";

export default function CreateProductPage() {
  return (
    <div className="container">
      <ProductForm />
    </div>
  );
}
