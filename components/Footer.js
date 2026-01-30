import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <p className={styles.copyright}>© 2026 Engineering Portfolio. All rights reserved.</p>
                <div className={styles.socials}>
                    <a href="https://github.com/gerryisrad" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                    <a href="https://www.linkedin.com/in/gerardo-s-gutierrez/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                    <a href="mailto:gerardogutierrez6581@gmail.com" className={styles.link}>Email</a>
                </div>
            </div>
        </footer>
    );
}
