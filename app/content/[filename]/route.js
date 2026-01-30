import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    const { filename } = await params;

    const imagePath = path.join(process.cwd(), 'content', filename);

    try {
        const file = fs.readFileSync(imagePath);

        // Determine content type based on extension
        const ext = path.extname(filename).toLowerCase();
        const contentTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
        };

        const contentType = contentTypes[ext] || 'application/octet-stream';

        return new NextResponse(file, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        return new NextResponse('File not found', { status: 404 });
    }
}
