import { getAboutData } from '@/lib/about';
import AboutEditor from '@/components/AboutEditor';
import Header from '@/components/Header';
import styles from './page.module.css';

export default function AdminAboutPage() {
    const aboutData = getAboutData();

    if (!aboutData) {
        return <div>Error loading data. Check content/about.json</div>;
    }

    return (
        <div className={styles.main}>
            {/* Reusing existing page styles for simplicity */}
            <div style={{ padding: '2rem' }}>
                <AboutEditor initialData={aboutData} />
            </div>
        </div>
    );
}
