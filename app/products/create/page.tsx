import ProductList from "@/components/ProductList";
import { createProduct } from "@/lib/actions";
import { Suspense } from "react";

export default async function CreateProductPage() {
  return (
    <div className="container">
      <form action={createProduct}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Price:</label>
          <input name="age" type="text" />
        </div>
        <div>
          <label>Stock:</label>
          <input name="email" type="text" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
