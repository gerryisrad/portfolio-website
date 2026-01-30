import { getAboutData } from '@/lib/about';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
    title: "Resume | Engineering Portfolio",
    description: "Professional resume and work history.",
};

export default function Resume() {
    const aboutData = getAboutData();
    const resumePath = aboutData?.basics?.resume || '/content/resume.pdf';

    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Resume</h1>
                {resumePath ? (
                    <>
                        <div className={styles.pdfWrapper}>
                            <iframe
                                src={resumePath}
                                className={styles.iframe}
                                title="Resume PDF"
                            />
                        </div>
                        <div className={styles.download}>
                            <a href={resumePath} download className={styles.button}>
                                Download PDF
                            </a>
                        </div>
                    </>
                ) : (
                    <div className={styles.noResume}>
                        <p>No resume uploaded yet.</p>
                        <p>Upload one from the <a href="/admin/about">admin panel</a>.</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
