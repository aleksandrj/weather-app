import { Sun } from 'phosphor-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Weather App{' '}
        <span>
          <Sun size={48} color="#fff" weight="fill" />
        </span>
      </h1>
    </div>
  );
};

export default Header;
