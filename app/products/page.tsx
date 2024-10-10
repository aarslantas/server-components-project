import ProductList from "@/components/ProductList";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductPage() {
  return (
    <div className="container">
      <div>Productsss</div>
      <Link href="/products/create" className="text-blue-400">
        Create Product
      </Link>
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
