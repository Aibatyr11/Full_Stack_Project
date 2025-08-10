// const express = require("express");
// const cors = require('cors')
// const { sql, connectToDB } = require("./db");
// const sqlite3 = require('sqlite3').verbose();
// const app = express();
// const port = 3000;

// // Middleware для парсинга JSON
// app.use(express.json());
// app.use(cors());
// let pool;

// let db = new sqlite3.Database('./mydatabase.db', (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//  db.all(`SELECT * FROM test`, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     console.log(row.id, row.name);
//   });
// });
// });



// const Connect = async () => {
//   await connectToDB()
//     .then((p) => {
//       pool = p;
//     })
//     .catch((err) => console.error(err));
// };
// // connectToDB()
// //   .then((p) => {
// //     pool = p;
// //   })
// //   .catch((err) => console.error(err));

// app.get("/api/users", async (req, res) => {
//   await Connect();
//   try {
//     const result = await pool
//       .request()
//       .query(
//         "SELECT TOP (100) [id] , [name] FROM [uipathbots].[dbo].[temp666]"
//       );
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // Временное хранилище данных
// let todos = [
//   { id: 1, title: "Сделать задание", completed: false },
//   { id: 2, title: "Проверить почту", completed: true },
//   { id: 3, title: "Позвониьт другу", completed: true },
//   { id: 4, title: "Поспать", completed: true },
//   { id: 5, title: "Проснуться", completed: true },
// ];

// app.get("/api/todos", (req, res) => {
//   res.set("X-Custom-Header", "value");
//   res.json(todos);
// });

// // GET /todos/:id — получить задачу по ID
// app.get("/api/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const todo = todos.find((t) => t.id === id);
//   if (todo) {
//     res.json(todo);
//   } else {
//     res.status(404).json({ message: "Задача не найдена" });
//   }
// });

// // POST /todos — добавить задачу
// app.post("/api/todos", (req, res) => {
//   const { title, completed = false } = req.body;
//   console.log(req.body);
//   const newTodo = { id: Date.now(), title, completed };
//   todos.push(newTodo);
//   res.status(201).json(newTodo);
// });

// // PUT /todos/:id — обновить задачу
// app.put("/api/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = todos.findIndex((t) => t.id === id);
//   console.log(req.body);
//   console.log(id);
//   console.log(index);
//   if (index !== -1) {
//     todos[index] = { ...todos[index], ...req.body };
//     res.json(todos[index]);
//   } else {
//     res.status(404).json({ message: "Задача не найдена" });
//   }
// });

// // DELETE /todos/:id — удалить задачу
// app.delete("/api/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = todos.findIndex((t) => t.id === id);
//   if (index !== -1) {
//     const deleted = todos.splice(index, 1);
//     res.json(deleted[0]);
//   } else {
//     res.status(404).json({ message: "Задача не найдена" });
//   }
// });

// // Запуск сервера
// app.listen(port, () => {
//   console.log(`Сервер запущен: http://localhost:${port}`);
// });


const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/products");
const sqlite3 = require('sqlite3').verbose();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);


//-----------------------------------------------
//1
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite');
  }
});
//2
app.get('/api/countries', (req, res) => {
  db.all('SELECT * FROM Country', [], (err, rows) => {
    if (err) {
      console.error('Ошибка при запросе:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});
//3
app.post("/api/countries", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Поле 'name' обязательно" });
  }

  const checkSql = 'SELECT * FROM Country WHERE LOWER(name) = LOWER(?)';
  db.get(checkSql, [name], (err, row) => {
    if (err) {
      console.error("Ошибка при проверке:", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      return res.status(409).json({ error: `Страна "${row.name}" уже существует` });
    }

    const insertSql = 'INSERT INTO Country (name) VALUES (?)';
    db.run(insertSql, [name], function (err) {
      if (err) {
        console.error("Ошибка при добавлении:", err.message);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        name,
      });
    });
  });
});


//4
app.get('/api/countries/:id', (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM Country WHERE id = ?', [id], (err, rows) => {
    if (err) {
      console.error('Ошибка при запросе:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

//5
app.delete('/api/countries/:id', (req, res) => {
  const { id } = req.params;
  const deleteSql = 'DELETE FROM Country WHERE id = ?';
  db.run(deleteSql, [id], function (err) {
    if (err) {
      console.error("Ошибка при удалении:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Страна с таким ID не найдена" });
    }
    res.json({ message: "Страна удалена", id });
  });
});

//--------------------------------------------------
app.listen(3001, () => {
  console.log("Сервер запущен на http://localhost:3001");
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);