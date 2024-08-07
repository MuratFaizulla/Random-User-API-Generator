import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { fetchUser } from '../../utils/fetchUsers';
import styles from '../../styles/UserDetail.module.css';

interface User {
  id: string;
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
  };
  nat: string;
}

interface UserDetailProps {
  user: User;
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  const router = useRouter();
  const { title, first, last } = user.name;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        Назад
      </button>

      <div className={styles.userDetail}>
        <img src={user.picture.large} alt={`${first} ${last}`} className={styles.userImage} />
        <h1 className={styles.userName}>{`${title} ${first} ${last}`}</h1>
        <p className={styles.userInfo}>Email: {user.email}</p>
        <p className={styles.userInfo}>Phone: {user.phone}</p>
        <p className={styles.userInfo}>Cell: {user.cell}</p>
        <p className={styles.userInfo}>Age: {user.dob.age}</p>
        <p className={styles.userInfo}>
          Address: {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}, {user.location.postcode}
        </p>
        <p className={styles.userInfo}>Nationality: {user.nat}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const user = await fetchUser(id);

  return {
    props: {
      user,
    },
  };
};

export default UserDetail;
