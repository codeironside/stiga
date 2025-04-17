const express = require('express');
const { check, validationResult } = require('express-validator');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog_management',
  password: '123',
  port: 5432,
});

// CRUD Operations

// Create a new blog post
app.post('/api/blogs', [
  check('title').notEmpty().withMessage('Title is required'),
  check('excerpt').notEmpty().withMessage('Excerpt is required'),
  check('date').isDate().withMessage('Date must be a valid date'),
  check('category').notEmpty().withMessage('Category is required'),
  check('image').notEmpty().withMessage('Image URL is required'),
], async (req, res) => {
  const { title, excerpt, date, category, image } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const result = await pool.query(
    'INSERT INTO blog_posts (title, excerpt, date, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, excerpt, date, category, image]
  );
  res.status(201).json(result.rows[0]);
});

app.get('/api/blogs', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const result = await pool.query('SELECT * FROM blog_posts ORDER BY date DESC LIMIT $1 OFFSET $2', [limit, offset]);
  res.status(200).json(result.rows);
});

// Update a blog post
app.put('/api/blogs/:id', [
  check('title').notEmpty().withMessage('Title is required'),
  check('excerpt').notEmpty().withMessage('Excerpt is required'),
  check('date').isDate().withMessage('Date must be a valid date'),
  check('category').notEmpty().withMessage('Category is required'),
  check('image').notEmpty().withMessage('Image URL is required'),
], async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, date, category, image } = req.body;
  const result = await pool.query(
    'UPDATE blog_posts SET title = $1, excerpt = $2, date = $3, category = $4, image = $5 WHERE id = $6 RETURNING *',
    [title, excerpt, date, category, image, id]
  );
  res.status(200).json(result.rows[0]);
});

// Delete a blog post
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
