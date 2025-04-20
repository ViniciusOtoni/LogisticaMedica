import { initDb } from "../../database";

export const createTables = async () => {
  try {
    const db = await initDb();

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
      );
      `
    );

    console.log('Tabelas criadas com sucesso');
  } catch (error) {
    console.error('Erro ao criar tabelas: ', error);
  }
};