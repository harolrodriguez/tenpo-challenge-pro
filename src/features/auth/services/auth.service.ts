import { env } from '@/config/env';

export const performFakeLogin = async (
  email: string,
  pass: string
): Promise<{ status: number; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.toLowerCase() === 'test@tenpo.cl' && pass === 'password123') {
        const fakeToken = env.TMDB_API_KEY;
        resolve({ status: 200, token: fakeToken });
      }
      // Opcional: Activar otro token generico para cualquier email y pass
      // else if (email && pass) {
      //   const fakeToken = `fake-jwt-token-generic-${Date.now()}`;
      //   resolve({ status: 200, token: fakeToken });
      // }
      else {
        reject(new Error('Credenciales inválidas. Intenta con test@tenpo.cl y password123'));
      }
    }, 500);
  });
};
