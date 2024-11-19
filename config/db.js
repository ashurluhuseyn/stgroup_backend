const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('postgres://postgres:test@localhost:5432/academy', {
    dialect: 'postgres', // İstifadə olunan SQL motoru
    host: 'localhost', // Serverin IP ünvanı və ya adı
    port: 5432, // PostgreSQL-in işlədiyi port
    logging: console.log, // SQL sorğularını konsolda göstərmək üçün funksiyanı təyin edir
    pool: { // Bağlantı hovuzunun parametrləri
        max: 5, // Eyni anda maksimum bağlantı sayı
        min: 0, // Minimum bağlantı sayı
        acquire: 30000, // Bağlantını əldə etmək üçün maksimum gözləmə müddəti (ms)
        idle: 10000 // İşsiz bağlantının qapanma müddəti (ms)
    },
    define: { // Modellər üçün ümumi parametrlər
        timestamps: true, // Varsayılan olaraq `createdAt` və `updatedAt` sütunlarını əlavə edir
        underscored: true, // Sütun adlarını `camelCase` əvəzinə `snake_case` edir
        freezeTableName: true, // Cədvəl adlarını avtomatik olaraq çoğul hala gətirmir
    },
    dialectOptions: { // PostgreSQL-ə xüsusi parametrlər
        ssl: {
            require: true, // SSL bağlantısını məcbur edir (bulud serverləri üçün vacibdir)
            rejectUnauthorized: false, // Sertifikat yoxlanışını deaktiv edir (test mühitləri üçün)
        },
    },
    timezone: '+00:00', // Bütün tarixləri UTC-də saxlamaq üçün istifadə olunur
    query: { // Sorğu parametrləri
        raw: true // Sorğuların yalnız xam nəticəsini qaytarır
    }
});


const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('SQL connection is successfull');
        
    } catch (error) {
        console.log('Error occured while connecting SQL', error);
    }
}

module.exports = { sequelize, testConnection };