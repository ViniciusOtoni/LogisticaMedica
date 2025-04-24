import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@MyApp:user';

// user = { email: string, senha: string }
export async function saveUser(user) {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return true;
  } catch (err) {
    console.error('Erro ao salvar usuário:', err);
    return false;
  }
}

export async function getUser() {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.error('Erro ao ler usuário:', err);
    return null;
  }
}

export async function removeUser() {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    return true;
  } catch (err) {
    console.error('Erro ao remover usuário:', err);
    return false;
  }
}

export async function isLoggedIn() {
  const user = await getUser();
  return user !== null;
}
