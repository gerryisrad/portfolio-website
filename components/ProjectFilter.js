'use client';

import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import styles from './ProjectFilter.module.css';

export default function ProjectFilter({ projects, tags }) {
    const [activeTag, setActiveTag] = useState('All');

    const filteredProjects = useMemo(() => {
        if (activeTag === 'All') return projects;
        return projects.filter(project =>
            project.tags && project.tags.includes(activeTag)
        );
    }, [projects, activeTag]);

    return (
        <div>
            <div className={styles.filterContainer}>
                <button
                    className={`${styles.tagButton} ${activeTag === 'All' ? styles.active : ''}`}
                    onClick={() => setActiveTag('All')}
                >
                    All
                </button>
                {tags.map(tag => (
                    <button
                        key={tag}
                        className={`${styles.tagButton} ${activeTag === tag ? styles.active : ''}`}
                        onClick={() => setActiveTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredProjects.map(project => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
                {filteredProjects.length === 0 && (
                    <p className={styles.noResults}>No projects found with this tag.</p>
                )}
            </div>
        </div>
    );
}
