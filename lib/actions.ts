"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const Database = require("better-sqlite3");
const path = require("path");

function connectToDatabase() {
  const dbPath = path.resolve(process.cwd(), "persons.sb"); // Veritabanı dosyasının ismi ve uzantısı
  return new Database(dbPath);
}

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required") // En az bir karakter olmalı
    .max(100, "Name must be less than 100 characters"), // Maksimum 100 karakter olabilir
  age: z
    .number()
    .min(18, "You must be at least 18 years old") // Minimum yaş 18
    .max(120, "Age must be less than or equal to 120"), // Maksimum yaş 120
  email: z.string().email("Invalid email format"), // Geçerli bir email formatı olmalı
});

export interface FormErrors {
  errors: {
    name?: string[];
    age?: string[];
    email?: string[];
  };
  success: boolean;
}

// export async function updatePerson(
//   id: string,
//   formData: FormData
// ): Promise<null> {
//   const name = formData.get("name") as string;
//   const age = formData.get("age") as string;
//   const email = formData.get("email") as string;

//   // // Basit doğrulamalar
//   // if (!name || name.length < 3) {
//   //     throw new Error('İsim en az 3 karakter uzunluğunda olmalı.');
//   // }
//   // if (!email || !email.includes('@')) {
//   //     throw new Error('Geçerli bir e-posta adresi girin.');
//   // }
//   // if (!age || isNaN(Number(age)) || Number(age) <= 0) {
//   //     throw new Error('Yaş pozitif bir sayı olmalı.');
//   // }

//   // Validasyon başarılı olursa veriler döner

//   const db = connectToDatabase();

//   try {
//     const validation = userSchema.safeParse(formData);

//     if (!validation.success) {
//       validation.error?.flatten().fieldErrors;
//     }

//     const updatePerson = db.prepare(`
//       UPDATE persons
//       SET name = ?, age = ?, email = ?
//       WHERE id = ?
//     `);
//     const result = updatePerson.run(name, age, email, id);

//     if (result.changes === 0) {
//       throw new Error(`ID'si ${id} olan kişi bulunamadı.`);
//     }

//     console.log("Kişi başarıyla güncellendi.");
//   } catch (error: any) {
//     console.error("Güncelleme sırasında hata oluştu:", error.message);
//     throw error;
//   } finally {
//     db.close();
//   }

//   return null;
// }

export async function updatePerson(previousState: any, formData: FormData) {
  const db = connectToDatabase();

  const validation = userSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    email: formData.get("email"),
  });

  console.log("validation123", validation);

  revalidatePath("/");

  //   if (validation.success) {
  //     try {
  //       console.log("validation.data", validation.data);
  //       //   const updatePerson = db.prepare(`
  //       //           UPDATE persons
  //       //           SET name = ?, age = ?, email = ?
  //       //           WHERE id = ?
  //       //         `);
  //       //   const result = updatePerson.run(name, age, email, id);
  //       //   if (result.changes === 0) {
  //       //     throw new Error(`ID'si ${id} olan kişi bulunamadı.`);
  //       //   }
  //       //   console.log("RESULT", validation.data);
  //       //   console.log("Kişi başarıyla güncellendi.");
  //     } catch (error: any) {
  //       console.error("Güncelleme sırasında hata oluştu:", error.message);
  //       throw error;
  //     } finally {
  //       db.close();
  //     }
  //   }

  //   return {
  //     errors: validation.error?.flatten().fieldErrors as FormErrors["errors"],
  //     success: false,
  //   };

  //   return {
  //     errors: validation.error?.flatten().fieldErrors as FormErrors["errors"],
  //     success: false,
  //   };
}
