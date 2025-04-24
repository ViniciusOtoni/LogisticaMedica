const API_URL = 'http://192.168.0.54:3000/api/orders';

/**
 * Cria um novo pedido.
 * @param {Object} orderPayload
 * @returns {Promise<{ success: boolean, data?: { id: number }, message?: string }>}
 */
export async function createOrder(orderPayload) {
  console.log('createOrder payload:', orderPayload);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: `Resposta inesperada do servidor: ${text}` };
    }

    if (!response.ok) {
      return { success: false, message: data.error || 'Erro ao criar pedido' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('createOrder exception:', error);
    return { success: false, message: error.message || 'Erro de conexão com o servidor' };
  }
}

/**
 * Lista todos os pedidos de um usuário.
 * @param {number|string} userId
 * @returns {Promise<Array<Object>>}
 */
export async function getOrdersByUser(userId) {
  const url = `${API_URL}/user/${userId}`;
  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Resposta inesperada ao buscar pedidos: ${text}`);
    }
    if (!response.ok) {
      throw new Error(data.error || 'Falha ao buscar pedidos');
    }
    return data;
  } catch (err) {
    console.error('getOrdersByUser exception:', err);
    throw err;
  }
}

/**
 * Busca um pedido pelo ID.
 * @param {number|string} orderId
 * @returns {Promise<{ success: boolean, data?: Object, message?: string }>}
 */
export async function getOrderById(orderId) {
  const url = `${API_URL}/${orderId}`;
  console.log(`Fetching order by ID: ${url}`);
  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('getOrderById parse error, response:', text);
      return { success: false, message: `Resposta inesperada do servidor: ${text}` };
    }
    if (!response.ok) {
      return { success: false, message: data.error || 'Erro ao buscar pedido' };
    }
    return { success: true, data };
  } catch (err) {
    console.error('getOrderById exception:', err);
    return { success: false, message: err.message || 'Erro de conexão ao buscar pedido' };
  }
}

/**
 * Faz upload de imagem para um pedido.
 * @param {number|string} orderId
 * @param {string} imageUri
 * @returns {Promise<{ success: boolean, imagem?: string, message?: string }>}
 */
export async function uploadOrderImage(orderId, imageUri) {
  const url = `${API_URL}/${orderId}/image`;
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    name: `pedido_${orderId}.jpg`,
    type: 'image/jpeg',
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: `Resposta inesperada ao enviar imagem: ${text}` };
    }
    if (!response.ok) {
      return { success: false, message: data.error || 'Erro ao enviar imagem' };
    }
    return { success: true, imagem: data.imagem };
  } catch (err) {
    console.error('uploadOrderImage exception:', err);
    return { success: false, message: err.message || 'Erro de conexão ao enviar imagem' };
  }
}

/**
 * Marca um pedido como concluído.
 * @param {number|string} orderId
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function completeOrder(orderId) {
  const url = `${API_URL}/${orderId}/complete`;
  try {
    const response = await fetch(url, { method: 'PATCH' });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: `Resposta inesperada ao concluir pedido: ${text}` };
    }
    if (!response.ok) {
      return { success: false, message: data.error || 'Erro ao concluir pedido' };
    }
    return { success: true, message: data.message };
  } catch (err) {
    console.error('completeOrder exception:', err);
    return { success: false, message: err.message || 'Erro de conexão ao concluir pedido' };
  }
}

/**
 * Atualiza todas as informações de um pedido.
 * @param {number|string} orderId
 * @param {Object} orderPayload
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function updateOrder(orderId, orderPayload) {
  const url = `${API_URL}/${orderId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: `Resposta inesperada do servidor: ${text}` };
    }

    if (!response.ok) {
      return { success: false, message: data.error || 'Erro ao atualizar pedido' };
    }

    return { success: true, message: data.message };
  } catch (err) {
    console.error('updateOrder exception:', err);
    return { success: false, message: err.message || 'Erro de conexão ao servidor' };
  }
}
  
