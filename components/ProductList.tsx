import { getAllProducts } from "@/lib/data";
import Link from "next/link";
import DeleteModal from "./DeleteModal";
import { deleteProduct } from "@/lib/actions";

export default async function ProductList() {
  const products = await getAllProducts();

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.stock}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between gap-4">
                <Link
                  href={`/products/${product.id}/edit`}
                  className=" flex-1 bg-yellow-300  py-2"
                >
                  Edit
                </Link>
                {/* <button className=" flex-1 bg-red-300  py-2">Delete</button> */}
                <DeleteModal id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
