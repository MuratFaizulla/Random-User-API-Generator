import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/UserCard.module.css';

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

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const { title, first, last } = user.name;

  const handleClick = () => {
    router.push(`/users/${user.login.uuid}`); 
  };

  return (
    <div className={styles.userCard} onClick={handleClick}>
      <img src={user.picture.large} alt={`${first} ${last}`} className={styles.userImage} />
      <h3 className={styles.userName}>{`${title} ${first} ${last}`}</h3>
      <p className={styles.userInfo}>Email: {user.email}</p>
      <p className={styles.userInfo}>Phone: {user.phone}</p>
      <p className={styles.userInfo}>Cell: {user.cell}</p>
      <p className={styles.userInfo}>Age: {user.dob.age}</p>
      <p className={styles.userInfo}>
        Address: {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}, {user.location.postcode}
      </p>
      <p className={styles.userInfo}>Nationality: {user.nat}</p>
    </div>
  );
};

export default UserCard;
