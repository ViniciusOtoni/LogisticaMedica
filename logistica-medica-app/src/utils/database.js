import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export const initDb = async () => {
  if (dbInstance) return dbInstance;

  try {
    dbInstance = await SQLite.openDatabaseAsync('logisticaMedica.db');
    await dbInstance.execAsync(`PRAGMA journal_mode = WAL;`);
    console.log('Banco de dados inicializado com sucesso');
    return dbInstance;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados', error);
    throw error;
  }
};

export const getDb = () => {
  if (!dbInstance) {
    throw new Error('Banco de dados ainda não foi inicializado. Chame a função de inicialização primeiro.');
  }

  return dbInstance;
};