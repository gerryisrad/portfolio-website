import { getAboutData } from '@/lib/about';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
    title: "About Me | Engineering Portfolio",
    description: "Learn more about my background, experience, and engineering philosophy.",
};

export default function About() {
    const data = getAboutData();

    if (!data) return <div>Loading...</div>;

    return (
        <div className={styles.main}>
            <Header />

            <main className="container">
                <section className={styles.hero}>
                    <div className={styles.portraitWrapper}>
                        {data.basics.image ? (
                            <img src={data.basics.image} alt={data.basics.name} className={styles.portrait} />
                        ) : (
                            <div className={styles.portraitPlaceholder}>
                                <span>{data.basics.name}</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.bio}>
                        <h1 className={styles.name}>{data.basics.name}</h1>
                        <h2 className={styles.role}>{data.basics.label}</h2>
                        <p className={styles.summary}>{data.basics.summary}</p>
                        <div className={styles.socials}>
                            {data.basics.profiles && data.basics.profiles.map(profile => (
                                <a key={profile.network} href={profile.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    {profile.network}
                                </a>
                            ))}
                            {data.basics.email && (
                                <a href={`mailto:${data.basics.email}`} className={styles.socialLink}>Email</a>
                            )}
                        </div>
                    </div>
                </section>

                <div className={styles.contentGrid}>
                    {data.work && data.work.length > 0 && (
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Experience</h3>
                            {data.work.map((job, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <span className={styles.period}>
                                        {job.startDate} - {job.endDate || 'Present'}
                                    </span>
                                    <div className={styles.details}>
                                        <h4>{job.position}</h4>
                                        <h5>{job.name}</h5>
                                        <p>{job.summary}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {data.education && data.education.length > 0 && (
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Education</h3>
                            {data.education.map((edu, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <span className={styles.period}>
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                    <div className={styles.details}>
                                        <h4>{edu.studyType} {edu.area}</h4>
                                        <h5>{edu.institution}</h5>
                                        <p>Score: {edu.score}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {data.skills && data.skills.length > 0 && (
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Technical Skills</h3>
                            <div className={styles.skillsGrid}>
                                {data.skills.map((category, index) => (
                                    <div key={index} className={styles.skillCategory}>
                                        <h4>{category.name}</h4>
                                        <div className={styles.tags}>
                                            {category.keywords.map(keyword => (
                                                <span key={keyword}>{keyword}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
