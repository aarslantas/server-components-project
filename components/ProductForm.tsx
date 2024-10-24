"use client";

import { createProduct, updateProduct } from "@/lib/actions";
import { Children, FC, useActionState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/navigation";
import Countries from "./CountriesSelect";
import CountriesSelect from "./CountriesSelect";

interface FormErrorProps {
  errors?: string[];
}

interface ErrorProps {
  errors: {
    name: string[];
    price: string[];
    stock: string[];
  };
}

const FormError: FC<FormErrorProps> = ({ errors }) => {
  if (!errors?.length) return null;
  return (
    <div className="p-2">
      {errors.map((error, i) => (
        <p key={i} className="text-red-500">
          {error}
        </p>
      ))}
    </div>
  );
};

export default function ProductForm({
  product,
  children,
}: {
  product?: any;
  children?: any;
}) {
  const [state, formAction] = useFormState(
    (prevState: any, formData: FormData) => {
      if (!product) {
        return createProduct(prevState, formData);
      } else {
        return updateProduct(prevState, formData, product.id);
      }
    },
    null
  );

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state?.success && product) {
      timer = setTimeout(() => {
        router.push("/products");
        router.refresh();
      }, 2000);
    } else {
      formRef.current?.reset();
    }

    return () => clearTimeout(timer);
  }, [state?.success]);

  return (
    <div className="max-w-lg  p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {product ? "Edit" : "Create"} Product
      </h2>
      {state?.message && <p className="mb-4 text-green-600">{state.message}</p>}

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue={product?.name}
          />
          <FormError
            errors={
              state?.errors && "name" in state.errors
                ? state.errors.name
                : undefined
            }
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Countries:</label>
          {children}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Price:</label>
          <input
            name="price"
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue={product?.price}
          />
          <FormError
            errors={
              state?.errors && "price" in state.errors
                ? state.errors.price
                : undefined
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Stock:</label>
          <input
            name="stock"
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue={product?.stock}
          />
          <FormError
            errors={
              state?.errors && "stock" in state.errors
                ? state.errors.stock
                : undefined
            }
          />
        </div>
        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save
        </button>
        6 */}
        <SubmitButton />
      </form>
    </div>
  );
}
