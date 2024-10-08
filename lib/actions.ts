"use server";
import { z } from "zod";
const Database = require("better-sqlite3");
const path = require("path");

function connectToDatabase() {
  const dbPath = path.resolve(process.cwd(), "database.db"); // Veritabanı dosyasının ismi ve uzantısı
  return new Database(dbPath);
}

const userSchema = z.object({
  name: z.string(),
  // .min(2, "Name is required") // En az bir karakter olmalı
  // .max(100, "Name must be less than 100 characters"), // Maksimum 100 karakter olabilir
  age: z.string(),
  // .number()
  // .min(18, "You must be at least 18 years old") // Minimum yaş 18
  // .max(120, "Age must be less than or equal to 120"), // Maksimum yaş 120
  email: z.string().email("Invalid email format"), // Geçerli bir email formatı olmalı
});

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

export async function updatePerson(
  prevState: any,
  formData: FormData,
  id: string
) {
  const db = connectToDatabase();

  const formPersonObj = {
    name: formData.get("name"),
    age: formData.get("age"),
    email: formData.get("email"),
  };

  console.log("formPersonObj", formPersonObj);

  const dataObj = userSchema.safeParse(formPersonObj);

  if (!dataObj.success) {
    const plainErrors = dataObj.error?.flatten().fieldErrors;
    console.log("plainErrors", plainErrors);
    return {
      success: false,
      data: prevState,
      errors: plainErrors,
    };
  }

  try {
    const updatePerson = db.prepare(`
            UPDATE persons
            SET name = ?, age = ?, email = ?
            WHERE id = ?
          `);

    const result = updatePerson.run(
      formPersonObj.name,
      formPersonObj.age,
      formPersonObj.email,
      id
    );

    if (result.changes === 0) {
      throw new Error(`ID'si ${id} olan kişi bulunamadı.`);
    }

    console.log("Kişi başarıyla güncellendi.");

    return {
      success: true, // Başarı durumu true
      data: formPersonObj, // Güncellenen kişi bilgileri
      errors: null, // Hata yok
      message: "Kişi basariyla guncellendi",
    };
  } catch (error: any) {
    console.error("Güncelleme sırasında hata oluştu:", error.message);

    return {
      success: false, // Başarısız
      data: null,
      errors: { form: [error.message] }, // Genel form hatası
      message: "Güncelleme sırasında hata oluştu",
    };
  } finally {
    db.close();
  }
}

export async function createPerson(prevState: any, formData: FormData) {
  const db = connectToDatabase();

  console.log("runnnnnnn");

  const formPersonObj = {
    name: formData.get("name"),
    age: formData.get("age"),
    email: formData.get("email"),
  };

  console.log("formPersonObj", formPersonObj);

  const dataObj = userSchema.safeParse(formPersonObj);

  if (!dataObj.success) {
    const plainErrors = dataObj.error?.flatten().fieldErrors;
    console.log("plainErrors", plainErrors);
    return {
      success: false, // Başarı durumu false
      data: prevState,
      errors: plainErrors, // Zod hatalarını dön
    };
  }

  // try-catch ile veritabanı işlemlerini yönet
  try {
    const createPersonStmt = db.prepare(`
        INSERT INTO persons (name, age, email)
        VALUES (?, ?, ?)
      `);

    const result = createPersonStmt.run(
      formPersonObj.name,
      formPersonObj.age,
      formPersonObj.email
    );

    console.log("Kişi başarıyla oluşturuldu.", result);

    return {
      success: true, // Başarı durumu true
      data: {
        name: formPersonObj.name,
        age: formPersonObj.age,
        email: formPersonObj.email,
      }, // Oluşturulan kişi bilgileri
      errors: null, // Hata yok
    };
  } catch (error: any) {
    console.error("Kişi oluşturulurken hata oluştu:", error.message);

    return {
      success: false, // Başarısız
      data: null,
      errors: { form: [error.message] }, // Genel form hatası
    };
  } finally {
    db.close(); // Veritabanı bağlantısını kapat
  }
}
