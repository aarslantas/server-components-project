const Database = require('better-sqlite3');
const path = require('path');

// Veritabanına bağlantı fonksiyonu
function connectToDatabase() {
    const dbPath = path.resolve(process.cwd(), 'database.db'); // Veritabanı dosyasının ismi ve uzantısı
    return new Database(dbPath);
}


export async function getAllPersons() {
    const db = connectToDatabase();

    try {
        const getPersons = db.prepare(`SELECT * FROM persons`);
        const persons = getPersons.all();  // Tüm verileri alıyoruz
        return persons;
    } catch (error) {
        console.error('Veritabanından verileri alırken bir hata oluştu:', error.message);
        return [];
    } finally {
        db.close();  // Veritabanı bağlantısını her durumda kapat
    }
}


export async  function fetchPersonById(id:string) {
    const db = connectToDatabase();

    try {
        const getPerson = db.prepare(`SELECT * FROM persons WHERE id = ?`);
        const person = getPerson.get(id);  // Belirli ID'ye göre kişiyi alıyoruz
        return person;
    } catch (error) {
        console.error('Kişi veritabanından alınırken bir hata oluştu:', error.message);
        return null;
    } finally {
        db.close();  // Veritabanı bağlantısını her durumda kapat
    }
}

