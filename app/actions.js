'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { put } from '@vercel/blob'

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
    try {
        const file = formData.get('file');
        const slug = formData.get('slug');

        if (!file || !slug) return { error: 'Missing file or slug' };

        // Log file info for debugging
        console.log('[UPLOAD] Starting upload:', {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            slug
        });

        // Validate file size (Vercel Blob limit is much higher, but we keep this for UX)
        const MAX_SIZE = 4.5 * 1024 * 1024; // 4.5 MB
        if (file.size > MAX_SIZE) {
            return { error: 'File too large (max 4.5 MB)' };
        }

        // Sanitize filename
        let sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        if (!sanitized || sanitized.startsWith('.')) {
            sanitized = `file.${file.name.split('.').pop() || 'png'}`;
        }

        const fileName = `${Date.now()}-${sanitized}`;
        const blobPath = `projects/${slug}/images/${fileName}`;

        console.log('[UPLOAD] Uploading to Blob:', blobPath);

        // Upload to Vercel Blob
        const blob = await put(blobPath, file, {
            access: 'public',
            addRandomSuffix: false
        });

        console.log('[UPLOAD] Success! Blob URL:', blob.url);

        // Return blob URL
        return { success: true, path: blob.url };
    } catch (error) {
        console.error('[UPLOAD ERROR]', error);
        return { error: `Upload failed: ${error.message}` };
    }
}

/**
 * Upload CAD file to project's cad folder
 */
export async function uploadCADFile(formData) {
    try {
        const file = formData.get('file');
        const slug = formData.get('slug');

        if (!file || !slug) return { error: 'Missing file or slug' };

        // Validate CAD file types
        const validExtensions = [
            '.step', '.stp',                          // STEP
            '.sldprt', '.sldasm', '.slddrw',         // SolidWorks
            '.catpart', '.catproduct', '.catdrawing', // CATIA
            '.dwg', '.dxf',                          // AutoCAD
            '.pdf',                                   // PDF
            '.iges', '.igs',                         // IGES
            '.stl'                                    // STL
        ];

        const fileName = file.name.toLowerCase();
        const isValid = validExtensions.some(ext => fileName.endsWith(ext));

        if (!isValid) {
            return { error: 'Invalid file type. Supported: STEP, SolidWorks, CATIA, DWG, DXF, PDF, IGES, STL' };
        }

        console.log('[CAD UPLOAD] Starting upload:', {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            slug
        });

        // Validate file size
        const MAX_SIZE = 4.5 * 1024 * 1024; // 4.5 MB
        if (file.size > MAX_SIZE) {
            return { error: 'File too large (max 4.5 MB)' };
        }

        // Sanitize filename
        let sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        if (!sanitized || sanitized.startsWith('.')) {
            sanitized = `file.${file.name.split('.').pop() || 'step'}`;
        }

        const uniqueFileName = `${Date.now()}-${sanitized}`;
        const blobPath = `projects/${slug}/cad/${uniqueFileName}`;

        console.log('[CAD UPLOAD] Uploading to Blob:', blobPath);

        // Upload to Vercel Blob
        const blob = await put(blobPath, file, {
            access: 'public',
            addRandomSuffix: false
        });

        console.log('[CAD UPLOAD] Success! Blob URL:', blob.url);

        // Return metadata
        return {
            success: true,
            file: {
                name: file.name,
                path: blob.url,
                size: file.size
            }
        };
    } catch (error) {
        console.error('[CAD UPLOAD ERROR]', error);
        return { error: `Upload failed: ${error.message}` };
    }
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
        gallery: data.gallery || [],
        cadFiles: data.cadFiles || []
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

/**
 * Upload profile image
 */
export async function uploadProfileImage(formData) {
    try {
        const file = formData.get('file');

        if (!file) return { error: 'No file provided' };

        // Log file info for debugging
        console.log('[PROFILE UPLOAD] Starting upload:', {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024).toFixed(2)} KB`
        });

        // Verify it's an image
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            console.error('[PROFILE UPLOAD] Invalid type:', file.type);
            return { error: 'Only JPG, PNG, and WebP images are allowed' };
        }

        console.log('[PROFILE UPLOAD] Processing image...');
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to content directory
        const contentDir = path.join(process.cwd(), 'content');
        await fs.mkdir(contentDir, { recursive: true });

        // Get file extension safely
        const ext = file.name.split('.').pop() || 'png';
        const fileName = `profile.${ext}`;
        const filePath = path.join(contentDir, fileName);

        console.log('[PROFILE UPLOAD] Writing to:', filePath);
        await fs.writeFile(filePath, buffer);
        console.log('[PROFILE UPLOAD] Success!');

        // Return path for storing in about.json
        return { success: true, path: `/content/${fileName}` };
    } catch (error) {
        console.error('[PROFILE UPLOAD ERROR]', error);
        return { error: `Upload failed: ${error.message}` };
    }
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
