"use server";
import { z } from "zod";
import { connectToDatabase } from "./data";

const Database = require("better-sqlite3");
const path = require("path");

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required") // En az 1 karakter olmalı
    .max(100, "Product name must be less than 100 characters"), // Maksimum 100 karakter olabilir
  price: z
    .number()
    .min(0.01, "Price must be greater than 0") // Fiyat 0'dan büyük olmalı
    .max(1000000, "Price must be less than or equal to 1,000,000"), // Maksimum fiyat 1 milyon olabilir
  stock: z
    .number()
    .min(0, "Stock cannot be negative") // Stok sıfır veya daha büyük olmalı
    .max(10000, "Stock must be less than or equal to 10,000"), // Maksimum stok 10,000 olabilir
});

// export async function createProduct(formData: FormData): Promise<void> {
//   const db = connectToDatabase();

//   const formProductObj = {
//     name: formData.get("name"),
//     price: formData.get("price"),
//     stock: formData.get("stock"),
//   };

//   // const dataObj = userSchema.safeParse(formProductObj);

//   // Basit doğrulamalar
//   if ((formProductObj.name as string).length < 3) {
//     throw new Error("İsim en az 3 karakter uzunluğunda olmalı.");
//   }

//   // try-catch ile veritabanı işlemlerini yönet
//   try {
//     const createProductStmt = db.prepare(`
//         INSERT INTO products (name, price, stock)
//         VALUES (?, ?, ?)
//       `);

//     const result = createProductStmt.run(
//       formProductObj.name,
//       formProductObj.price,
//       formProductObj.stock
//     );

//     console.log("Kişi başarıyla oluşturuldu.", result);

//     return {
//       success: true, // Başarı durumu true
//       data: null, // Oluşturulan kişi bilgileri
//       errors: null, // Hata yok
//     };
//   } catch (error: any) {
//     console.error("Kişi oluşturulurken hata oluştu:", error.message);

//     return {
//       success: false, // Başarısız
//       data: null,
//       errors: { form: [error.message] }, // Genel form hatası
//     };
//   } finally {
//     db.close(); // Veritabanı bağlantısını kapat
//   }
// }

export async function createProduct(previousState: any, formData: FormData) {
  const db = connectToDatabase();

  const formProductObj = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
  };

  console.log("formProductObj", formProductObj);

  const dataObj = productSchema.safeParse(formProductObj);

  if (!dataObj.success) {
    const plainErrors = dataObj.error?.flatten().fieldErrors;
    return {
      success: false,
      data: null,
      errors: plainErrors,
    };
  }

  try {
    const createProduct = db.prepare(`
      INSERT INTO products (name, price, stock)
      VALUES (?, ?, ?)
    `);

    const result = createProduct.run(
      formProductObj.name,
      formProductObj.price,
      formProductObj.stock
    );

    if (result.changes === 0) {
      throw new Error(`Ürün eklenemedi.`);
    }

    console.log("Ürün başarıyla oluşturuldu.");
    return {
      success: true,
      data: formProductObj, // Eklenen ürün bilgileri
      errors: null,
      message: "Ürün başarıyla oluşturuldu",
    };
  } catch (error: any) {
    console.error("Ürün oluşturulurken hata oluştu:", error.message);

    return {
      success: false,
      data: null,
      errors: { form: [error.message] }, // Genel form hatası
      message: "Ürün oluşturulurken hata oluştu",
    };
  } finally {
    db.close();
  }
}

export async function updateProduct(
  prevState: any,
  formData: FormData,
  id: string
) {
  const db = connectToDatabase();

  const formProductObj = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
  };

  console;

  const dataObj = productSchema.safeParse(formProductObj);

  if (!dataObj.success) {
    const plainErrors = dataObj.error?.flatten().fieldErrors;
    console.log("plainErrors", plainErrors);
    return {
      success: false,
      data: prevState,
      errors: plainErrors,
    };
  }

  // await new Promise((resolve) => setTimeout(resolve, 10000));

  try {
    const updateProduct = db.prepare(`
            UPDATE products
            SET name = ?, price = ?, stock = ?
            WHERE id = ?
          `);

    const result = updateProduct.run(
      formProductObj.name,
      formProductObj.price,
      formProductObj.stock,
      id
    );

    if (result.changes === 0) {
      throw new Error(`ID'si ${id} olan ürün bulunamadı.`);
    }

    console.log("Ürün başarıyla güncellendi.");

    return {
      success: true, // Başarı durumu true
      data: formProductObj, // Güncellenen ürün bilgileri
      errors: null, // Hata yok
      message: "Ürün başarıyla güncellendi",
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
    // revalidatePath("/products");
    // redirect("/products");
  }
}

export async function deleteProduct(
  previousState: any,
  formData: FormData,
  id: string
) {
  const db = connectToDatabase();

  try {
    const deleteProduct = db.prepare(`
            DELETE FROM products
            WHERE id = ?
          `);

    const result = deleteProduct.run(id);

    if (result.changes === 0) {
      throw new Error(`ID'si ${id} olan ürün bulunamadı.`);
    }

    console.log("Ürün başarıyla silindi.");

    return {
      success: true, // Başarı durumu true
      message: "Ürün başarıyla silindi bayburt",
    };
  } catch (error: any) {
    console.error("Silme sırasında hata oluştu:", error.message);

    return {
      success: false, // Başarısız
      errors: { form: [error.message] }, // Genel form hatası
      message: "Silme sırasında hata oluştu",
    };
  } finally {
    db.close();
  }
}
