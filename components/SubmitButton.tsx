"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  const handleClick = () => {
    console.log("cliecked");
  };

  return (
    <button type="submit" disabled={pending} onClick={handleClick}>
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
