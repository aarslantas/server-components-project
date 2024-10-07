import { fetchPersonById, getAllPersons } from "@/lib/data";
import { updatePerson } from "@/lib/actions";
import { FC, useActionState, useState } from "react";
import { z } from "zod";
import { useFormState } from "react-dom";
import { error } from "console";
import PersonForm from "@/components/PersonForm";

export default async function EditPersonPage({
  params,
}: {
  params: { id: string };
}) {
  const personData = await fetchPersonById(params.id);
  console.log("personData", personData);

  // const updatePersonWithId = updatePerson.bind(null, params.id);
  return (
    <div>
      <PersonForm person={personData} />
    </div>
  );
  // }
}
