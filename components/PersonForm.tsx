"use client";

import { createPerson, updatePerson } from "@/lib/actions";
import { error } from "console";
import { FC, useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "./SubmitButton";

interface FormErrorProps {
  errors?: string[];
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

// const initialState = {
//   success: false,
//   data: null,
//   errors: {
//     name: [] || undefined,
//     age: [] || undefined,
//     email: [] || undefined,
//   },
// };

export default function PersonForm({ person }: { person?: any }) {
  const [state, formAction] = useFormState(
    (prevState: any, formData: FormData) => {
      if (!person) {
        return createPerson(prevState, formData);
      } else {
        return updatePerson(prevState, formData, person.id);
      }
    },
    null
  );

  return (
    <div>
      <h2> {person ? "Edit" : "Create"} Person</h2>
      <p>{state?.message}</p>
      <form action={formAction}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" defaultValue={person?.name} />
          <FormError errors={state?.errors?.name} />
        </div>
        <div>
          <label>Age:</label>
          <input name="age" type="text" defaultValue={person?.age} />
          <FormError errors={state?.errors?.age} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" type="text" defaultValue={person?.email} />
          <FormError errors={state?.errors?.email} />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
