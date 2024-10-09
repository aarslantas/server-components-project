const Database = require("better-sqlite3");
const path = require("path");

// Veritabanı bağlantısını açma fonksiyonu
function connectToDatabase() {
  const dbPath = path.resolve(process.cwd(), "stock.db"); // Veritabanı dosyasının ismi ve uzantısı
  return new Database(dbPath);
}

// Products için getAll metodu
export async function getAllProducts() {
  const db = connectToDatabase(); // Her işlem için yeni bağlantı
  try {
    await new Promise((resolve) => setTimeout(resolve, 20000));
    const stmt = db.prepare("SELECT * FROM products");
    const products = stmt.all();
    return products;
  } catch (error) {
    console.error(
      "Ürünler veritabanından alınırken bir hata oluştu:",
      error.message
    );
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
    console.error(
      "Siparişler veritabanından alınırken bir hata oluştu:",
      error.message
    );
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
    console.error(
      "Tedarikçiler veritabanından alınırken bir hata oluştu:",
      error.message
    );
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
    console.error(
      "Stok hareketleri veritabanından alınırken bir hata oluştu:",
      error.message
    );
    return [];
  } finally {
    db.close(); // Sorgudan sonra veritabanı bağlantısını kapat
  }
}
