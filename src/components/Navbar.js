// components/Navbar.js
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Make sure this path is correct

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/quiz">Quiz</Link></li>
        <li><Link href="/highscore">HighScore</Link></li>
        <li><Link href="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;