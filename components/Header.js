import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <span className="text-gradient">Portfolio</span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>Work</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/resume" className={styles.link}>Resume</Link>
                </nav>
            </div>
        </header>
    );
}
