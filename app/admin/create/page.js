'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '@/app/login/page.module.css'; // Reuse login styles

export default function CreatePage() {
    const [slug, setSlug] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to edit page with new slug
        router.push(`/admin/edit/${slug}`);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>New Project</h1>
                <div className={styles.field}>
                    <label>Project Slug (URL friendly)</label>
                    <input
                        value={slug}
                        onChange={e => setSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                        required
                        className={styles.input}
                        placeholder="my-awesome-project"
                    />
                </div>
                <button type="submit" className={styles.button}>Create</button>
            </form>
        </div>
    );
}
