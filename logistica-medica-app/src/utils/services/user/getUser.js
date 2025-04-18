import db from '../database.js';

/**
 * GET /users
 * Retorna todos os usuários cadastrados
 */
export const getUsers = () =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users;',
        [],
        (_, { rows }) => {
          // rows._array contém o array de resultados
          resolve(rows._array);
        },
        (_, error) => {
          console.error('Erro no SELECT:', error);
          reject(error);
          return false;
        }
      );
    });
  });