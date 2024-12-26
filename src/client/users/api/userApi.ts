import User from '../../../server/users/entity';
import API_URL from '../../config.js';

export async function getUsers() {
    const apiUrl = '/api/users';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      throw new Error('Error fetching users:', error!);
    }
}

export async function createUser(user: User) {
    const apiUrl = `${API_URL}/api/auth/register`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      return { status: 400, message: 'Error creating user', error };
    }
}

export async function authenticateUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Error en el inicio de sesión');
    }
  
    return await response.json();
}
  