import Link from 'next/link';
import { getSortedProjectsData } from '@/lib/projects';
import { logout } from '../actions';
import DeleteButton from '@/components/DeleteButton';
import styles from './page.module.css';

export default function AdminDashboard() {
    const projects = getSortedProjectsData();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <div className={styles.actions}>
                    <form action={logout}>
                        <button type="submit" className={styles.logoutBtn}>Logout</button>
                    </form>
                </div>
            </header>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Profile Management</h2>
                </div>
                <div className={styles.grid}>
                    <Link
                        href="/admin/about"
                        className={styles.createCard}
                        style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))', borderColor: 'var(--color-green)' }}
                    >
                        <span className={styles.plus}>✎</span>
                        <span>Edit Public Profile</span>
                    </Link>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Project Portfolio</h2>
                </div>
                <div className={styles.grid}>
                    <Link href="/admin/create" className={styles.createCard}>
                        <span className={styles.plus}>+</span>
                        <span>New Project</span>
                    </Link>

                    {projects.map(project => (
                        <div key={project.id} className={styles.cardWrapper}>
                            <Link
                                href={`/admin/edit/${project.id}`}
                                className={styles.card}
                            >
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <p className={styles.cardDate}>{project.date}</p>
                                <span className={styles.editLabel}>Edit →</span>
                            </Link>
                            <div className={styles.deleteForm}>
                                <DeleteButton slug={project.id} className={styles.deleteBtn} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
