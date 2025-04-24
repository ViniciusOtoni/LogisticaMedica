import { pool } from '../db.js';

const createTables = async () => {
  try {
    // 1ª query: cria/verifica a tabela de users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
      )
    `);

    // 2ª query: cria/verifica a tabela de admins
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
      )
    `);

    // 3ª query: cria/verifica a tabela de orders com campos de imagem e concluido
    // await pool.query('DROP TABLE IF EXISTS orders;');
    // console.log('Tabela orders removida');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        remetente VARCHAR(255) NOT NULL,
        destinatario VARCHAR(255) NOT NULL,
        prazo_entrega DATE NOT NULL,
        urgencia VARCHAR(50) NOT NULL,
        detalhes TEXT,
        imagem VARCHAR(255),               
        concluido BOOLEAN NOT NULL DEFAULT FALSE,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Tabelas criadas/verificadas com sucesso');
  } catch (err) {
    console.error('Erro ao criar/verificar tabelas:', err);
  }
};

export default createTables;
