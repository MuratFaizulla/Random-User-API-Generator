import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import UserList from '../components/UserList';
import styles from '../styles/Home.module.css';
import { fetchUsers } from '../utils/fetchUsers';

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

interface HomeProps {
  initialUsers: User[];
  totalPages: number;
}

const Home: React.FC<HomeProps> = ({ initialUsers, totalPages }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { users } = await fetchUsers(page);
      setUsers(users);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Random User API Generator</h1>
      <input
        type="text"
        placeholder="Search users by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <UserList
        users={filteredUsers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { users, totalPages } = await fetchUsers(1);
    return {
      props: {
        initialUsers: users,
        totalPages,
      },
    };
  } catch (err) {
    return {
      props: {
        initialUsers: [],
        totalPages: 0,
      },
    };
  }
};

export default Home;
