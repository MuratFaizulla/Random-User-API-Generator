import axios from 'axios';
import { cache } from 'react';

const API_URL = 'https://randomuser.me/api/';

export const fetchUsers = async (page: number = 1) => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      results: 10,
      seed: 'abc', // Используем seed для консистентности данных на одной странице

    },
  });

  return {
    users: response.data.results,
    totalPages: 5,
  };
};
export const fetchUser = async (uuid: string) => {
  let userFound = null;

  for (let page = 1; page <= 5; page++) {
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

  return userFound;
};

