"use client"; // Bu bileşen bir client component olacak

import { deleteProduct } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface DeleteModalProps {
  id: string;
  // deleteAction: (formData: FormData) => Promise<void>;
}

export default function DeleteModal({ id }: DeleteModalProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(
    (prevState: any, formData: FormData) => {
      return deleteProduct(prevState, formData, id);
    },
    null
  );

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        closeModal();
        router.refresh();
      }, 2000);

      return () => clearTimeout(timer); // Temizleme işlemi
    }
  }, [state?.success]);

  console.log("state", state);

  return (
    <>
      <button onClick={openModal} className="text-red-400">
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Delete</h2>
            <p>Are you sure you want to delete this person?</p>
            <div className="mt-4 flex gap-4">
              <form action={formAction}>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </form>

              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
            <p className={state?.success ? "text-green-500" : "text-red-500"}>
              {state?.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
