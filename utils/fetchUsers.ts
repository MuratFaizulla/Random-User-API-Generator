import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';

export const fetchUsers = async (page: number = 1) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        results: 10,
        seed: 'abc', 
      },
    });

    return {
      users: response.data.results,
      totalPages: 10,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users.');
  }
};

export const fetchUser = async (uuid: string) => {
  try {
    let userFound = null;

    for (let page = 1; page <= 10; page++) {
      const response = await axios.get(API_URL, {
        params: {
          page,
          results: 10,
          seed: 'abc', 
        },
      });

      const users = response.data.results;
      userFound = users.find((user: any) => user.login.uuid === uuid);

      if (userFound) {
        break;
      }
    }

    if (userFound) {
      return userFound;
    } else {
      throw new Error('User not found.');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user.');
  }
};
