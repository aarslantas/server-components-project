const Database = require("better-sqlite3");
const path = require("path");

// Veritabanı bağlantısını açma fonksiyonu
export function connectToDatabase() {
  const dbPath = path.resolve(process.cwd(), "stock.db"); // Veritabanı dosyasının ismi ve uzantısı
  return new Database(dbPath);
}

// Products için getAll metodu
export async function getAllProducts() {
  const db = connectToDatabase(); // Her işlem için yeni bağlantı
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const stmt = db.prepare("SELECT * FROM products");
    const products = stmt.all();
    return products;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Ürünler veritabanından alınırken bir hata oluştu:",
        error.message
      );
    } else {
      console.error("Bilinmeyen bir hata oluştu:", error);
    }
    return [];
  } finally {
    db.close(); // Sorgudan sonra veritabanı bağlantısını kapat
  }
}

// Orders için getAll metodu
export async function getAllOrders() {
  const db = connectToDatabase(); // Her işlem için yeni bağlantı
  try {
    const stmt = db.prepare("SELECT * FROM orders");
    const orders = stmt.all();
    return orders;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Ürünler veritabanından alınırken bir hata oluştu:",
        error.message
      );
    } else {
      console.error("Bilinmeyen bir hata oluştu:", error);
    }
    return [];
  } finally {
    db.close(); // Sorgudan sonra veritabanı bağlantısını kapat
  }
}

// Suppliers için getAll metodu
export async function getAllSuppliers() {
  const db = connectToDatabase(); // Her işlem için yeni bağlantı
  try {
    const stmt = db.prepare("SELECT * FROM suppliers");
    const suppliers = stmt.all();
    return suppliers;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Ürünler veritabanından alınırken bir hata oluştu:",
        error.message
      );
    } else {
      console.error("Bilinmeyen bir hata oluştu:", error);
    }
    return [];
  } finally {
    db.close(); // Sorgudan sonra veritabanı bağlantısını kapat
  }
}

// Stock Movements için getAll metodu
export async function getAllStockMovements() {
  const db = connectToDatabase(); // Her işlem için yeni bağlantı
  try {
    const stmt = db.prepare("SELECT * FROM stock_movements");
    const stockMovements = stmt.all();
    return stockMovements;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Ürünler veritabanından alınırken bir hata oluştu:",
        error.message
      );
    } else {
      console.error("Bilinmeyen bir hata oluştu:", error);
    }
    return [];
  } finally {
    db.close(); // Sorgudan sonra veritabanı bağlantısını kapat
  }
}

export async function getProductById(id: string) {
  const db = connectToDatabase(); // Her işlem için yeni bağlantı
  try {
    // await new Promise((resolve) => setTimeout(resolve, 10000)); // Simüle edilen gecikme
    const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
    const product = stmt.get(id);

    if (!product) {
      throw new Error(`ID'si ${id} olan ürün bulunamadı.`);
    }

    return product;
  } catch (error: any) {
    console.error(
      "Ürün veritabanından alınırken bir hata oluştu:",
      error.message
    );
    return null;
  } finally {
    db.close(); // Sorgudan sonra veritabanı bağlantısını kapat
  }
}
