import ProductList from "@/components/ProductList";
import { Suspense } from "react";

export default async function ProductPage() {
  return (
    <div className="container">
      <div>Productsss</div>
      <Suspense
        fallback={
          <p className="text-center text-red-400">
            Loading Products Suspense...
          </p>
        }
      >
        <ProductList />
      </Suspense>
    </div>
  );
}
