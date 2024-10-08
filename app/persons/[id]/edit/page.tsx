import { fetchPersonById } from "@/lib/data";

import PersonForm from "@/components/PersonForm";

export default async function EditPersonPage({
  params,
}: {
  params: { id: string };
}) {
  const personData = await fetchPersonById(params.id);

  return (
    <div>
      <PersonForm person={personData} />
    </div>
  );
  // }
}
