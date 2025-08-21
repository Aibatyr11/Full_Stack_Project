// const sql = require("mssql");

// const config = {
//   user: "sys_robot",
//   password: "",
//   server: "al-sts001", // или IP адрес сервера
//   database: "Acquaintance",
//   options: {
//     // encrypt: true, // для Azure, если не Azure — false или не указывай
//     trustServerCertificate: true, // если используешь самоподписанный сертификат
//   },
// };
// //SELECT [id], [login] FROM [Acquaintance].[sprint].[Executor]

// async function connectToDB() {
//   try {
//     // Создаем подключение
//     let pool = await sql.connect(config);
//     console.log("Connected to SQL Server");
//     return pool;
//   } catch (err) {
//     console.error("Database Connection Failed! Bad Config: ", err);
//   }
// }

// module.exports = {
//   sql,
//   connectToDB,
// };


const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, './mydatabase.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка подключения к базе:', err.message);
  } else {
    console.log('✅ Подключено к базе:', dbPath);
    console.log("DB PATH:", dbPath);


    // включаем поддержку FOREIGN KEY
    db.run("PRAGMA foreign_keys = ON");
  }
});

module.exports = db;
