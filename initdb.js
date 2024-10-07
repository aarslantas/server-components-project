const { faker } = require('@faker-js/faker'); // Faker'ın yeni versiyonu
const Database = require('better-sqlite3');
const path = require('path');

// Veritabanını başlatmak için fonksiyon
function initializeDatabase() {
    // Veritabanı dosyasının yolunu belirleyin (veritabanı dosyası oluşturulacak)
    const dbPath = path.resolve(process.cwd(), 'database.db');

    // Veritabanına bağlan
    const db = new Database(dbPath);

    // 'persons' tablosunu oluştur
    const createPersonsTable = `
    CREATE TABLE IF NOT EXISTS persons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
  `;

    // Sorguyu çalıştır
    db.exec(createPersonsTable);

    console.log("Veritabanı ve 'persons' tablosu başarıyla oluşturuldu.");

    // 50 rastgele person ekle
    insertRandomPersons(db, 50);

    // Veritabanı bağlantısını kapat
    db.close();
}

// Rastgele person ekleme fonksiyonu
function insertRandomPersons(db, count) {
    const insertPerson = db.prepare(`INSERT INTO persons (name, age, email) VALUES (?, ?, ?)`);

    for (let i = 0; i < count; i++) {
        const name = faker.person.fullName(); // Rastgele isim
        const age = Math.floor(Math.random() * 60) + 18; // 18 ile 77 yaş arasında rastgele yaş
        const email = faker.internet.email(); // Rastgele email

        try {
            insertPerson.run(name, age, email);
        } catch (err) {
            console.error(`Hata: ${err.message} (Email: ${email})`);
        }
    }

    console.log(`${count} rastgele person veritabanına başarıyla eklendi.`);
}

// Fonksiyonu çalıştır
initializeDatabase();
