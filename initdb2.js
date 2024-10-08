// const Database = require("better-sqlite3");

// // Veritabanı bağlantısı
// const db = new Database("stock.db");

// // Tabloları oluşturma

// // Products Tablosu
// db.prepare(
//   `
//   CREATE TABLE IF NOT EXISTS products (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     price REAL NOT NULL,
//     stock INTEGER NOT NULL
//   );
// `
// ).run();

// // Orders Tablosu
// db.prepare(
//   `
//   CREATE TABLE IF NOT EXISTS orders (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     product_id INTEGER NOT NULL,
//     customer_name TEXT NOT NULL,
//     order_date TEXT NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES products(id)
//   );
// `
// ).run();

// // Suppliers Tablosu
// db.prepare(
//   `
//   CREATE TABLE IF NOT EXISTS suppliers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     product_id INTEGER NOT NULL,
//     supplier_name TEXT NOT NULL,
//     supply_date TEXT NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES products(id)
//   );
// `
// ).run();

// // Stock Movements Tablosu
// db.prepare(
//   `
//   CREATE TABLE IF NOT EXISTS stock_movements (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     product_id INTEGER NOT NULL,
//     movement_type TEXT NOT NULL, -- 'in' for stock added, 'out' for stock removed
//     movement_date TEXT NOT NULL,
//     quantity INTEGER NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES products(id)
//   );
// `
// ).run();

// // Fake veriler oluşturma
// try {
//   // Ürünler ekleme
//   const insertProduct = db.prepare(`
//     INSERT INTO products (name, price, stock) VALUES (?, ?, ?)
//   `);

//   const products = [
//     ["Laptop", 1200.99, 50],
//     ["Mouse", 25.99, 200],
//     ["Keyboard", 45.5, 150],
//     ["Monitor", 300.0, 100],
//     ["USB Cable", 10.0, 500],
//   ];

//   products.forEach((product) => {
//     insertProduct.run(...product);
//     console.log(
//       `Product inserted: ${product[0]}, Price: ${product[1]}, Stock: ${product[2]}`
//     );
//   });

//   // Siparişler ekleme
//   const insertOrder = db.prepare(`
//     INSERT INTO orders (product_id, customer_name, order_date) VALUES (?, ?, ?)
//   `);

//   const orders = [
//     [1, "Alice", "2024-01-10"],
//     [2, "Bob", "2024-01-12"],
//     [3, "Charlie", "2024-02-05"],
//     [4, "David", "2024-02-20"],
//     [5, "Eve", "2024-03-15"],
//   ];

//   orders.forEach((order) => {
//     insertOrder.run(...order);
//     console.log(
//       `Order inserted: Product ID: ${order[0]}, Customer: ${order[1]}, Date: ${order[2]}`
//     );
//   });

//   // Tedarikçiler ekleme
//   const insertSupplier = db.prepare(`
//     INSERT INTO suppliers (product_id, supplier_name, supply_date) VALUES (?, ?, ?)
//   `);

//   const suppliers = [
//     [1, "Tech Supplies Co.", "2024-01-05"],
//     [2, "MouseWorld Inc.", "2024-01-06"],
//     [3, "Keyboards Plus", "2024-01-08"],
//     [4, "Monitor Masters", "2024-02-01"],
//     [5, "Cables Unlimited", "2024-03-01"],
//   ];

//   suppliers.forEach((supplier) => {
//     insertSupplier.run(...supplier);
//     console.log(
//       `Supplier inserted: Product ID: ${supplier[0]}, Supplier: ${supplier[1]}, Supply Date: ${supplier[2]}`
//     );
//   });

//   // Stok hareketleri ekleme
//   const insertStockMovement = db.prepare(`
//     INSERT INTO stock_movements (product_id, movement_type, movement_date, quantity) VALUES (?, ?, ?, ?)
//   `);

//   const stockMovements = [
//     [1, "in", "2024-01-05", 20],
//     [1, "out", "2024-01-10", 2],
//     [2, "in", "2024-01-06", 100],
//     [2, "out", "2024-01-12", 5],
//     [3, "in", "2024-01-08", 50],
//     [3, "out", "2024-02-05", 1],
//     [4, "in", "2024-02-01", 30],
//     [4, "out", "2024-02-20", 3],
//     [5, "in", "2024-03-01", 200],
//     [5, "out", "2024-03-15", 10],
//   ];

//   stockMovements.forEach((movement) => {
//     insertStockMovement.run(...movement);
//     console.log(
//       `Stock movement inserted: Product ID: ${movement[0]}, Type: ${movement[1]}, Date: ${movement[2]}, Quantity: ${movement[3]}`
//     );
//   });

//   console.log("Database initialized with static data.");
// } catch (error) {
//   console.error("Data insertion error:", error.message);
// } finally {
//   db.close();
// }

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
    stock INTEGER NOT NULL
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
    movement_type TEXT NOT NULL, -- 'in' for stock added, 'out' for stock removed
    movement_date TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`
).run();

// Fake veriler oluşturma
try {
  // Ürünler ekleme
  const insertProduct = db.prepare(`
    INSERT INTO products (name, price, stock) VALUES (?, ?, ?)
  `);

  for (let i = 0; i < 100; i++) {
    const name = chance.word({ length: 8 }); // Ürün adı
    const price = chance.floating({ min: 10, max: 1000, fixed: 2 }); // Rastgele fiyat
    const stock = chance.integer({ min: 1, max: 500 }); // Rastgele stok sayısı
    insertProduct.run(name, price, stock);
    console.log(`Product inserted: ${name}, Price: ${price}, Stock: ${stock}`);
  }

  // Siparişler ekleme
  const insertOrder = db.prepare(`
    INSERT INTO orders (product_id, customer_name, order_date) VALUES (?, ?, ?)
  `);

  for (let i = 1; i <= 5; i++) {
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
