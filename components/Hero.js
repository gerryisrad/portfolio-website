import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className="container">
                <h1 className={styles.title}>
                    Showcasing my Projects in a Thoughtful Way
                </h1>
                <p className={styles.subtitle}>
                    Hello, I'm Gerardo! Welcome to my website. This is dedicated to my engineering related projects                </p>
                <div className={styles.actions}>
                    <Link href="#projects" className={styles.primaryButton}>
                        View Projects
                    </Link>
                    <Link href="/about" className={styles.secondaryButton}>
                        About Me
                    </Link>
                </div>
            </div>
        </section>
    );
}
