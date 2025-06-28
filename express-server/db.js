const sql = require("mssql");

const config = {
  user: "sys_robot",
  password: "",
  server: "al-sts001", // или IP адрес сервера
  database: "Acquaintance",
  options: {
    // encrypt: true, // для Azure, если не Azure — false или не указывай
    trustServerCertificate: true, // если используешь самоподписанный сертификат
  },
};
//SELECT [id], [login] FROM [Acquaintance].[sprint].[Executor]

async function connectToDB() {
  try {
    // Создаем подключение
    let pool = await sql.connect(config);
    console.log("Connected to SQL Server");
    return pool;
  } catch (err) {
    console.error("Database Connection Failed! Bad Config: ", err);
  }
}

module.exports = {
  sql,
  connectToDB,
};
