import express from 'express';
import { pool } from '../db.js';

const adminRouter = express.Router();

// GET /admins  - Listar todos os administradores
adminRouter.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email FROM admins');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar administradores' });
  }
});

// POST /admins - Criar um novo administrador
adminRouter.post('/', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO admins (email, senha) VALUES (?, ?)',
      [email, senha]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar administrador' });
  }
});

adminRouter.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await pool.execute(
      'SELECT id, email FROM admins WHERE email = ? AND senha = ?',
      [email, senha]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas'});
    }

    const admin = rows[0];
    res.json({ id: admin.id, email: admin.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

export default adminRouter;