import Link from 'next/link';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
    return (
        <Link href={`/projects/${project.slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                {project.mainImage ? (
                    <img src={project.mainImage} alt={project.title} className={styles.image} />
                ) : (
                    <div className={styles.placeholder} />
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                    {project.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
