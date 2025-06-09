export const performFakeLogin = async (
  email: string,
  pass: string
): Promise<{ status: number; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@tenpo.cl' && pass === 'password123') {
        const fakeToken = `fake-jwt-token-${Date.now()}`;
        resolve({ status: 200, token: fakeToken });
      } else if (email && pass) {
        const fakeToken = `fake-jwt-token-generic-${Date.now()}`;
        resolve({ status: 200, token: fakeToken });
      } else {
        reject(new Error('Credenciales inválidas. Intenta con test@tenpo.cl y password123'));
      }
    }, 500);
  });
};
