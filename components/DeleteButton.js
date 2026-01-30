'use client';

import { deleteProject } from '@/app/actions';

export default function DeleteButton({ slug, className }) {
    const handleDelete = async (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            // Create FormData to match Server Action signature
            const formData = new FormData();
            formData.append('slug', slug);
            await deleteProject(formData);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className={className}
            title="Delete Project"
            type="button"
        >
            ×
        </button>
    );
}
