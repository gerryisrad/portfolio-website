import { getProjectData, getAllProjectIds } from '@/lib/projects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import Gallery from '@/components/Gallery';
import styles from './page.module.css';

export async function generateStaticParams() {
    const paths = getAllProjectIds();
    return paths.map((path) => ({
        slug: path.params.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = await getProjectData(slug);
    return {
        title: `${project.title} | Engineering Portfolio`,
        description: project.description,
    };
}

export default async function Project({ params }) {
    const { slug } = await params;
    const project = await getProjectData(slug);

    return (
        <div className={styles.main}>
            <Header />
            <article className={styles.article}>
                <div className="container">
                    <header className={styles.header}>
                        <h1 className={styles.title}>{project.title}</h1>
                        <div className={styles.meta}>
                            <span className={styles.date}>{project.date}</span>
                            <div className={styles.tags}>
                                {project.tags.map(tag => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </header>

                    <div className={styles.layoutGrid}>
                        <div className={styles.mainContent}>
                            <VideoPlayer videoId={project.videoId} />

                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={{ __html: project.contentHtml }}
                            />
                        </div>

                        <aside className={styles.sidebar}>
                            {project.paper && (
                                <a href={project.paper} target="_blank" rel="noopener noreferrer" className={styles.paperButton}>
                                    <span className={styles.paperIcon}>📄</span>
                                    Read Project Paper
                                </a>
                            )}

                            {project.skills && project.skills.length > 0 && (
                                <div className={styles.skillsCard}>
                                    <h3 className={styles.skillsTitle}>Vital Skills</h3>
                                    <div className={styles.skillsList}>
                                        {project.skills.map(skill => (
                                            <div key={skill} className={styles.skillItem}>
                                                <span className={styles.checkIcon}>✓</span>
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.cadFiles && project.cadFiles.length > 0 && (
                                <div className={styles.cadCard}>
                                    <h3 className={styles.cadTitle}>CAD Files & Technical Drawings</h3>
                                    <div className={styles.cadList}>
                                        {project.cadFiles.map((file, index) => {
                                            const ext = file.name.split('.').pop().toLowerCase();
                                            const icon = ext === 'pdf' ? '📄' :
                                                ext.startsWith('sld') ? '🔧' :
                                                    ext.startsWith('cat') ? '🔧' :
                                                        ext === 'dwg' || ext === 'dxf' ? '📐' :
                                                            ext === 'stl' ? '🖨️' : '📦';

                                            return (
                                                <a
                                                    key={index}
                                                    href={file.path}
                                                    download
                                                    className={styles.cadItem}
                                                >
                                                    <div className={styles.cadItemInfo}>
                                                        <span className={styles.cadIcon}>{icon}</span>
                                                        <div className={styles.cadDetails}>
                                                            <span className={styles.cadName}>{file.name}</span>
                                                            <span className={styles.cadSize}>
                                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className={styles.downloadIcon}>⬇</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {project.gallery && project.gallery.length > 0 && (
                                <div className={styles.gallerySection}>
                                    <h2 className={styles.sectionTitle}>Gallery</h2>
                                    <Gallery images={project.gallery} />
                                </div>
                            )}
                        </aside>
                    </div>
                </div >
            </article >
            <Footer />
        </div >
    );
}
