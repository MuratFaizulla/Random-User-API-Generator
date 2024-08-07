import React from 'react';
import UserCard from './UserCard';
import Pagination from './Pagination';
import styles from '../styles/UserList.module.css';

interface User {
  login: {
    uuid: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  cell: string;
  dob: {
    date: string;
    age: number;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface UserListProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.userList}>
      {users.map(user => (
        <UserCard key={user.login.uuid} user={user} />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default UserList;
