export async function loginAdmin (email, senha) {
  const API_URL = 'http://192.168.5.66:3000/api/admins/login';

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || "Falha no login")
  }

  return response.json();
};

export async function createAdmin(email, senha) {
  const API_URL = 'http://192.168.5.66:3000/api/admins';

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorBody.error || "Erro ao criar administrador",
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro de conexão com o servidor" };
  }
};