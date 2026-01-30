import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
    title: "Resume | Engineering Portfolio",
    description: "Professional resume and work history.",
};

export default function Resume() {
    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Resume</h1>
                <div className={styles.pdfWrapper}>
                    <iframe
                        src="/resume.pdf"
                        className={styles.iframe}
                        title="Resume PDF"
                    />
                </div>
                <div className={styles.download}>
                    <a href="/resume.pdf" download className={styles.button}>
                        Download PDF
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}
