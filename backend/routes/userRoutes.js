import express from 'express';
import { pool } from '../db.js';

const userRouter = express.Router();

// GET /users  - Listar todos os usuários
userRouter.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    // Busca usuário com email e senha igual ao recebido
    const [rows] = await pool.execute(
      'SELECT id, email FROM users WHERE email = ? AND senha = ?',
      [email, senha]
    );

    if (rows.length === 0) {
      // nenhum usuário encontrado com essas credenciais
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // retorna dados básicos do usuário logado
    const user = rows[0];
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

// POST /users - Criar um novo usuário
userRouter.post('/', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (email, senha) VALUES (?, ?)',
      [email, senha]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

export default userRouter;