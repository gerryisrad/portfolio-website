'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { register, verifyCredentials } from '@/lib/auth';

export async function login(prevState, formData) {
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
        return { error: 'Missing credentials' };
    }

    const isValid = await verifyCredentials(username, password);

    if (isValid) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });
        redirect('/admin');
    } else {
        return { error: 'Invalid credentials' };
    }
}

export async function registerAdmin(formData) {
    const username = formData.get('username');
    const password = formData.get('password');
    const confirm = formData.get('confirm');

    if (!username || !password || !confirm) {
        // ideally return error to UI
        return;
    }

    if (password !== confirm) {
        // ideally return error
        return;
    }

    await register(username, password);

    // Auto login
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    });
    redirect('/admin');
}

export async function logout() {
    redirect('/login')
}

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

/**
 * Upload image to project's images folder
 */
export async function uploadImage(formData) {
    const file = formData.get('file');
    const slug = formData.get('slug');

    if (!file || !slug) return { error: 'Missing file or slug' };

    const buffer = Buffer.from(await file.arrayBuffer());

    // Save to content/projects/[slug]/images/
    const projectDir = path.join(process.cwd(), 'content/projects', slug);
    const imagesDir = path.join(projectDir, 'images');

    await fs.mkdir(imagesDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const filePath = path.join(imagesDir, fileName);

    await fs.writeFile(filePath, buffer);

    // Return path relative to content directory for serving
    return { success: true, path: `/content/projects/${slug}/images/${fileName}` };
}

/**
 * Save project to new folder structure
 */
export async function saveProject(slug, data) {
    const projectDir = path.join(process.cwd(), 'content/projects', slug);
    const imagesDir = path.join(projectDir, 'images');

    // Create directories
    await fs.mkdir(projectDir, { recursive: true });
    await fs.mkdir(imagesDir, { recursive: true });

    // Save description.md (markdown content only)
    const descriptionPath = path.join(projectDir, 'description.md');
    await fs.writeFile(descriptionPath, data.content || '', 'utf-8');

    // Save project.json (metadata only)
    const metadata = {
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        skills: data.skills || [],
        paper: data.paper || '',
        videoId: data.videoId || '',
        mainImage: data.mainImage || '',
        gallery: data.gallery || []
    };

    const projectJsonPath = path.join(projectDir, 'project.json');
    await fs.writeFile(projectJsonPath, JSON.stringify(metadata, null, 2), 'utf-8');

    revalidatePath(`/projects/${slug}`);
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
}

/**
 * Delete entire project folder
 */
export async function deleteProject(formData) {
    const slug = formData.get('slug');
    if (!slug) return { error: 'Missing slug' };

    const projectDir = path.join(process.cwd(), 'content/projects', slug);

    try {
        // Delete entire project directory (includes project.json, description.md, and images/)
        await fs.rm(projectDir, { recursive: true, force: true });

        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Delete failed:', error);
        return { error: 'Failed to delete project' };
    }
}

/**
 * Upload resume PDF file
 */
export async function uploadResume(formData) {
    const file = formData.get('file');

    if (!file) return { error: 'No file provided' };

    // Verify it's a PDF
    if (file.type !== 'application/pdf') {
        return { error: 'Only PDF files are allowed' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Save to content directory
    const contentDir = path.join(process.cwd(), 'content');
    await fs.mkdir(contentDir, { recursive: true });

    const fileName = 'resume.pdf';
    const filePath = path.join(contentDir, fileName);

    await fs.writeFile(filePath, buffer);

    // Return path for storing in about.json
    return { success: true, path: '/content/resume.pdf' };
}

export async function saveAbout(data) {
    const aboutFile = path.join(process.cwd(), 'content', 'about.json');

    // Ensure directory exists
    const dir = path.dirname(aboutFile);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }

    await fs.writeFile(aboutFile, JSON.stringify(data, null, 4));
    revalidatePath('/about');
    revalidatePath('/admin/about');
    revalidatePath('/resume');
    return { success: true };
}
