import express from 'express';
import { pool } from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const orderRouter = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });


orderRouter.post('/', async (req, res) => {
  const { remetente, destinatario, prazoEntrega, urgencia, detalhes, userId } = req.body;
  if (!remetente || !destinatario || !prazoEntrega || !urgencia || !detalhes || !userId) {
    console.warn('Payload inválido:', req.body);
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO orders
         (remetente, destinatario, prazo_entrega, urgencia, detalhes, user_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [remetente, destinatario, prazoEntrega, urgencia, detalhes, userId]
    );
    return res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Lista pedidos de um usuário
orderRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.execute(
      `SELECT
         id,
         remetente,
         destinatario,
         prazo_entrega AS prazoEntrega,
         urgencia,
         detalhes,
         imagem,
         concluido,
         created_at AS criadoEm
       FROM orders
       WHERE user_id = ?
       ORDER BY criadoEm DESC`,
      [userId]
    );
    return res.json(rows);
  } catch (err) {
    console.error(`Erro ao listar pedidos do usuário ${userId}:`, err);
    return res.status(500).json({ error: err.message });
  }
});

//pedido específico
orderRouter.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const [rows] = await pool.execute(
      `SELECT
         id,
         remetente,
         destinatario,
         prazo_entrega   AS prazoEntrega,
         urgencia,
         detalhes,
         imagem,
         concluido,
         created_at      AS criadoEm,
         user_id         AS userId
       FROM orders
       WHERE id = ?`,
      [orderId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error(`Erro ao buscar pedido ${orderId}:`, err);
    return res.status(500).json({ error: err.message });
  }
});


orderRouter.post('/:orderId/image', upload.single('image'), async (req, res) => {
  const { orderId } = req.params;
  if (!req.file) return res.status(400).json({ error: 'Imagem não enviada.' });
  const imagePath = req.file.path;

  try {
    await pool.execute(
      'UPDATE orders SET imagem = ? WHERE id = ?',
      [imagePath, orderId]
    );
    return res.json({ message: 'Imagem enviada com sucesso.', imagem: imagePath });
  } catch (err) {
    console.error('Erro ao salvar imagem:', err);
    return res.status(500).json({ error: err.message });
  }
});


orderRouter.patch('/:orderId/complete', async (req, res) => {
  const { orderId } = req.params;
  try {
    await pool.execute(
      'UPDATE orders SET concluido = TRUE WHERE id = ?',
      [orderId]
    );
    return res.json({ message: 'Pedido marcado como concluído.' });
  } catch (err) {
    console.error('Erro ao concluir pedido:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Atualiza todas as informações de um pedido
orderRouter.put('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { remetente, destinatario, prazoEntrega, urgencia, detalhes, userId } = req.body;

  if (!remetente || !destinatario || !prazoEntrega || !urgencia || !detalhes || !userId) {
    console.warn('Payload inválido para atualização:', req.body);
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE orders
         SET remetente      = ?,
             destinatario   = ?,
             prazo_entrega  = ?,
             urgencia       = ?,
             detalhes       = ?,
             user_id        = ?
       WHERE id = ?`,
      [remetente, destinatario, prazoEntrega, urgencia, detalhes, userId, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    return res.json({ message: 'Pedido atualizado com sucesso.' });
  } catch (err) {
    console.error(`Erro ao atualizar pedido ${orderId}:`, err);
    return res.status(500).json({ error: err.message });
  }
});

export default orderRouter;
