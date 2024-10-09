import { fetchPersonById, getAllProducts } from "@/lib/data";

import PersonForm from "@/components/PersonForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const personData = await getAllProducts();

  return (
    <div>
      <PersonForm person={personData} />
    </div>
  );
  // }
}
