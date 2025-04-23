export async function loginUser(email, senha) {
    // use o seu IP local aqui:
    const API_URL = 'http://192.168.0.54:3000/api/users/login';
  
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
  
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || 'Falha no login');
    }
  
    return response.json(); // { id, email }
  }
  