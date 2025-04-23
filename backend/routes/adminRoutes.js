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

export default adminRouter;