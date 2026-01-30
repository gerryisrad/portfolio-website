import fs from 'fs';
import path from 'path';
import Editor from '@/components/Editor';

async function getProjectRaw(slug) {
    const projectDir = path.join(process.cwd(), 'content/projects', slug);
    const projectJsonPath = path.join(projectDir, 'project.json');
    const descriptionMdPath = path.join(projectDir, 'description.md');

    try {
        // Read project.json for metadata
        const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));

        // Read description.md for markdown content
        const markdownContent = fs.readFileSync(descriptionMdPath, 'utf8');

        return {
            ...projectData,
            content: markdownContent
        };
    } catch (e) {
        // If new project, return empty structure
        return {
            title: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            tags: [],
            skills: [],
            paper: '',
            videoId: '',
            mainImage: '',
            gallery: [],
            content: ''
        };
    }
}

export default async function EditPage({ params }) {
    const { slug } = await params;
    const project = await getProjectRaw(slug);

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <Editor project={project} slug={slug} />
        </div>
    );
}
