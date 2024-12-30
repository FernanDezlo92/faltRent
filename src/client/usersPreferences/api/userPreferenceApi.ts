import API_URL from '../../config.js';
import UserPreference from '../../../server/usersPreferences/entity';

export async function getUserPreferences(id: number) {
    if (!id) {
      throw new Error('Id is required');
    }
    const apiUrl = `${API_URL}/api/user-preferences/${id}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      throw new Error('Error fetching user preferences:', error!);
    }
}

export async function savePreferences(user: UserPreference) {
    const apiUrl = `${API_URL}/api/user-preferences`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      throw new Error('Error saving user preferences:', error!);
    }
}

