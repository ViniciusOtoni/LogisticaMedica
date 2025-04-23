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

    console.log('Tabelas criadas/verificadas com sucesso');
  } catch (err) {
    console.error('Erro ao criar/verificar tabelas:', err);
  }
};

export default createTables;
