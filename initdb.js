const Database = require("better-sqlite3");
const Chance = require("chance");
const chance = new Chance();

// Veritabanı bağlantısı
const db = new Database("stock.db");

// Tabloları oluşturma

// Products Tablosu
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL,
    country_id INTEGER,
    FOREIGN KEY (country_id) REFERENCES countries(id)
  );
  `
).run();

// Countries Tablosu
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
  `
).run();

// Orders Tablosu
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    order_date TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`
).run();

// Suppliers Tablosu
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    supplier_name TEXT NOT NULL,
    supply_date TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`
).run();

// Stock Movements Tablosu
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS stock_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    movement_type TEXT NOT NULL,
    movement_date TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`
).run();

// Fake veriler oluşturma
try {
  // 3. Ülkeler ekleme
  const insertCountry = db.prepare(`INSERT INTO countries (name) VALUES (?)`);

  for (let i = 0; i < 20; i++) {
    const countryName = chance.country({ full: true }); // Rastgele ülke adı
    insertCountry.run(countryName);
    console.log(`Country inserted: ${countryName}`);
  }

  // Ürünler ekleme
  const insertProduct = db.prepare(`
  INSERT INTO products (name, price, stock, country_id) VALUES (?, ?, ?, ?)
`);

  // Rastgele bir ülke seçmek için tüm ülke id'lerini alıyoruz
  const countryIds = db.prepare("SELECT id FROM countries").all();

  for (let i = 0; i < 30; i++) {
    const name = chance.word({ length: 8 }); // Ürün adı
    const price = chance.floating({ min: 10, max: 1000, fixed: 2 }); // Rastgele fiyat
    const stock = chance.integer({ min: 1, max: 500 }); // Rastgele stok sayısı

    // Rastgele bir country_id seç
    const randomCountry = chance.pickone(countryIds);

    insertProduct.run(name, price, stock, randomCountry.id);
    console.log(
      `Product inserted: ${name}, Price: ${price}, Stock: ${stock}, Country ID: ${randomCountry.id}`
    );
  }

  // Siparişler ekleme
  const insertOrder = db.prepare(`
    INSERT INTO orders (product_id, customer_name, order_date) VALUES (?, ?, ?)
  `);

  for (let i = 1; i <= 50; i++) {
    const customerName = chance.name(); // Rastgele müşteri adı
    const orderDate = chance.date({ string: true, year: 2024 }); // Rastgele sipariş tarihi
    insertOrder.run(i, customerName, orderDate);
    console.log(
      `Order inserted: Product ID: ${i}, Customer: ${customerName}, Date: ${orderDate}`
    );
  }

  // Tedarikçiler ekleme
  const insertSupplier = db.prepare(`
    INSERT INTO suppliers (product_id, supplier_name, supply_date) VALUES (?, ?, ?)
  `);

  for (let i = 1; i <= 5; i++) {
    const supplierName = chance.company(); // Rastgele tedarikçi adı
    const supplyDate = chance.date({ string: true, year: 2024 }); // Rastgele tedarik tarihi
    insertSupplier.run(i, supplierName, supplyDate);
    console.log(
      `Supplier inserted: Product ID: ${i}, Supplier: ${supplierName}, Supply Date: ${supplyDate}`
    );
  }

  // Stok hareketleri ekleme
  const insertStockMovement = db.prepare(`
    INSERT INTO stock_movements (product_id, movement_type, movement_date, quantity) VALUES (?, ?, ?, ?)
  `);

  const movementTypes = ["in", "out"];
  for (let i = 1; i <= 5; i++) {
    const movementType = chance.pickone(movementTypes); // Rastgele hareket tipi
    const movementDate = chance.date({ string: true, year: 2024 }); // Rastgele hareket tarihi
    const quantity = chance.integer({ min: 1, max: 100 }); // Rastgele miktar
    insertStockMovement.run(i, movementType, movementDate, quantity);
    console.log(
      `Stock movement inserted: Product ID: ${i}, Type: ${movementType}, Date: ${movementDate}, Quantity: ${quantity}`
    );
  }

  console.log("Database initialized with fake data using chance.js.");
} catch (error) {
  console.error("Data insertion error:", error.message);
} finally {
  db.close();
}
