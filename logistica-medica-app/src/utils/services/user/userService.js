import { getDb } from "../../database";

export const createUser = async (email, senha) => {
  try {
    const db = getDb();
    const query = `
      INSERT INTO users (email, senha) VALUES (?, ?);
    `;
    await db.runAsync(query, [email, senha]);

    return { success: true };
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return { success: false, message: "Email já cadastrado." };
    }

    console.error("Erro ao criar usuário: ", error);
    return { success: false, message: "Erro ao criar usuário." }
  }
}

export const loginUser = async (email, senha) => {
  const db = getDb();

  return new Promise((res, reject) => {
    db.getFirstAsync(`SELECT * FROM users where email = ? AND senha = ?`, [email, senha])
      .then(result => {
        if (result) {
          res(result);
        } else {
          reject(new Error('Email ou senha incorretos.'));
        }
      })
      .catch(error => {
        console.error('Erro ao acessar o banco de dados.', error);
        reject(error);
      });
  });
}