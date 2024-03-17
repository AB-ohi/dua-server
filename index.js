const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
app.use(cors());
// Connect to your SQLite database file
const db = new sqlite3.Database('dua_main.sqlite');

// Define routes to interact with your SQLite database
app.get('/category', (req, res) => {
  // Example query to fetch users
  db.all('SELECT * FROM category', (err, table) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    const result = res.json(table);
    console.log(result)
  });
});
// app.get('/subcategory', (req, res) => {
//   // Example query to fetch users
//   db.all('SELECT * FROM sub_category', (err, table) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     const result = res.json(table);
//   });
// });
// app.get('/dua', (req, res) => {
//   // Example query to fetch users
//   db.all('SELECT * FROM dua', (err, table) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     const result = res.json(table);
//   });
// }); 
app.get('/dua', (req, res) => {
  const cat_id = req.query.cat_id;
  const sql = 'SELECT * FROM dua WHERE cat_id = ?';
  // Example query to fetch users
  db.all(sql, [cat_id], (err, table) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    const result = res.json(table);
  });
});
app.get('/subcategory', (req, res) => {
  const cat_id = req.query.cat_id;
  const sql = 'SELECT * FROM sub_category WHERE cat_id = ?';
  // Example query to fetch users
  db.all(sql, [cat_id], (err, table) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    const result = res.json(table);
  });
});

// Add more routes as needed...

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

