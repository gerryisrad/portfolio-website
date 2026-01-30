import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    const { path: imagePath } = await params;

    // Construct full path: content/projects/[...path]
    const fullPath = path.join(process.cwd(), 'content', 'projects', ...imagePath);

    try {
        const file = fs.readFileSync(fullPath);

        // Determine content type based on extension
        const ext = path.extname(fullPath).toLowerCase();
        const contentTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
        };

        const contentType = contentTypes[ext] || 'application/octet-stream';

        return new NextResponse(file, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        return new NextResponse('Image not found', { status: 404 });
    }
}
