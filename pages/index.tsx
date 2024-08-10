import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import UserList from '../components/UserList';
import styles from '../styles/Home.module.css';
import { fetchUsers } from '../utils/fetchUsers';

interface User {
  login: { uuid: string };
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  cell: string;
  dob: { date: string; age: number };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  picture: { large: string; medium: string; thumbnail: string };
  nat: string;
}

interface HomeProps {
  initialUsers: User[];
  totalPages: number;
}

const Home: React.FC<HomeProps> = ({ initialUsers, totalPages }) => {
  const router = useRouter();
  const queryPage = parseInt(router.query.page as string, 10) || 1;

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(queryPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { users } = await fetchUsers(page);
      setUsers(users);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentPage !== queryPage) {
      fetchData(currentPage);
    }
  }, [currentPage, queryPage, fetchData]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      router.push({ pathname: router.pathname, query: { ...router.query, page } });
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
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {users.length > 0 ? (
        <UserList
          users={filteredUsers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        !loading && <p>No users found.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string, 10) || 1;
  try {
    const { users, totalPages } = await fetchUsers(page);
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
