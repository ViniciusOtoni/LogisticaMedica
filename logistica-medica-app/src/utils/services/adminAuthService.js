import AsyncStorage from "@react-native-async-storage/async-storage";

const ADMIN_KEY = '@MyApp:admin';

export async function saveAdmin(admin) {
  try {
    await AsyncStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    return true;
  } catch (err) {
    console.error('Erro ao salvar administrador: ', err);
    return false;
  }
}

export async function getAdmin() {
  try {
    const json = await AsyncStorage.getItem(ADMIN_KEY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.error('Erro ao ler dados de administrador: ', err);
    return null;
  }
}

export async function removeAdmin() {
  try {
    await AsyncStorage.removeItem(ADMIN_KEY);
    return true;    
  } catch (err) {
    console.error('Erro ao remover administrador: ', err);
    return false;
  }
}

export async function isAdminLoggedIn() {
  const admin = await getAdmin();
  return admin !== null;
}
