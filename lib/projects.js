import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

/**
 * Get all projects from the new folder structure
 * Each project is in: content/projects/[slug]/
 *   - project.json (metadata)
 *   - description.md (markdown content)
 *   - images/ (project images)
 */
export function getSortedProjectsData() {
    // Get all subdirectories in content/projects/
    const projectFolders = fs.readdirSync(projectsDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const allProjectsData = projectFolders.map((slug) => {
        const projectDir = path.join(projectsDirectory, slug);
        const projectJsonPath = path.join(projectDir, 'project.json');

        // Read project.json
        if (!fs.existsSync(projectJsonPath)) {
            console.warn(`Warning: project.json not found for ${slug}`);
            return null;
        }

        const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));

        return {
            id: slug,
            slug: slug,
            ...projectData,
        };
    }).filter(Boolean); // Remove null entries

    // Sort projects by date
    return allProjectsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllProjectIds() {
    const projectFolders = fs.readdirSync(projectsDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return projectFolders.map((slug) => {
        return {
            params: {
                slug: slug,
            },
        };
    });
}

export async function getProjectData(slug) {
    const projectDir = path.join(projectsDirectory, slug);
    const projectJsonPath = path.join(projectDir, 'project.json');
    const descriptionMdPath = path.join(projectDir, 'description.md');

    // Read project metadata
    const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));

    // Read markdown content
    const markdownContent = fs.readFileSync(descriptionMdPath, 'utf8');

    // Convert markdown to HTML
    const processedContent = await remark()
        .use(html)
        .use(remarkGfm)
        .process(markdownContent);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...projectData,
    };
}
