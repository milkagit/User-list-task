const API_URL = 'https://jsonplaceholder.typicode.com/users';

export interface User {
  [x: string]: any;
  id: number;
  name: string;
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (userId: number): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const postUpdateUserData = async (user: User): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
