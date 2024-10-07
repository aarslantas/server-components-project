"use client";

import { updatePerson } from "@/lib/actions";
import { FC, useActionState } from "react";
import { useFormState } from "react-dom";

// interface FormErrorProps {
//   errors?: string[];
// }

// const FormError: FC<FormErrorProps> = ({ errors }) => {
//   if (!errors?.length) return null;
//   return (
//     <div className="p-2">
//       {errors.map((error, i) => (
//         <p key={i} className="text-red-500">
//           {error}
//         </p>
//       ))}
//     </div>
//   );
// };

async function increment(previousState, formData) {
  return previousState + 1;
}

export default function PersonForm(person: any) {
  const [error, action, isPending] = useActionState(increment, null);

  return (
    <div>
      <h2>Edit Person</h2>
      <form action={action}>
        <div>
          <label>Name:</label>
          <input type="text" defaultValue={person.person.name} />
          {/* <FormError errors={state?.errors?.name} /> */}
        </div>
        <div>
          <label>Age:</label>
          <input type="text" defaultValue={person.person.age} />
          {/* <FormError errors={state?.errors?.age} /> */}
        </div>
        <div>
          <label>Email:</label>
          <input type="text" defaultValue={person.person.email} />
          {/* <FormError errors={state?.errors?.age} /> */}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
