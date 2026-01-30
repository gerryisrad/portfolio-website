
import { getSortedProjectsData } from '@/lib/projects';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProjectFilter from '@/components/ProjectFilter';
import styles from './page.module.css';

export default function Home() {
  const projects = getSortedProjectsData();

  // Extract unique tags
  const allTags = [...new Set(projects.flatMap(p => p.tags || []))].sort();

  return (
    <div className={styles.main}>
      <Header />
      <Hero />

      <main id="projects" className={styles.projectsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <ProjectFilter projects={projects} tags={allTags} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
