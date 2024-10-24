import CountriesSelect from "@/components/CountriesSelect";
import ProductList from "@/components/ProductList";
import { SubmitButton } from "@/components/SubmitButton";
import {
  getAllOrders,
  getAllStockMovements,
  getAllSuppliers,
} from "@/lib/data";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  // const products = await getAllProducts();
  // const orders = await getAllOrders();
  // const suppliers = await getAllSuppliers();

  const [orders, suppliers, stockMovements] = await Promise.all([
    getAllOrders(),
    getAllSuppliers(),
    getAllStockMovements(),
  ]);

  // Promise.all([products, orders, suppliers]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Stock Dashboard</h1>

      {/* Products List */}
      {/* <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {product.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}
      <div className="flex justify-between  gap-8">
        <div className="flex-1">
          {/* Orders List */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Product ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Customer Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Order Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.product_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.customer_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.order_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          {/* Suppliers List */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Product ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Supplier Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Supply Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier: any) => (
                  <tr key={supplier.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {supplier.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {supplier.product_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {supplier.supplier_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {supplier.supply_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Suppliers List */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Stock Movements</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Product ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Movement Type
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Movement Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Qauntity</th>
                </tr>
              </thead>
              <tbody>
                {stockMovements.map((stockMovement: any) => (
                  <tr key={stockMovement.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {stockMovement.product_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {stockMovement.movement_type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {stockMovement.movement_date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {stockMovement.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <SubmitButton />
    </div>
  );
}
