import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
    try {
        const { slug, path: filePath } = await params;

        // Construct file path
        const fullPath = path.join(
            process.cwd(),
            'content/projects',
            slug,
            'cad',
            ...filePath
        );

        // Security check: ensure path is within project directory
        const projectDir = path.join(process.cwd(), 'content/projects', slug, 'cad');
        if (!fullPath.startsWith(projectDir)) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            return new NextResponse('Not Found', { status: 404 });
        }

        // Read file
        const fileBuffer = fs.readFileSync(fullPath);

        // Get file extension for MIME type
        const ext = path.extname(fullPath).toLowerCase();
        const mimeTypes = {
            '.step': 'application/step',
            '.stp': 'application/step',
            '.sldprt': 'application/octet-stream',
            '.sldasm': 'application/octet-stream',
            '.slddrw': 'application/octet-stream',
            '.catpart': 'application/octet-stream',
            '.catproduct': 'application/octet-stream',
            '.catdrawing': 'application/octet-stream',
            '.dwg': 'application/acad',
            '.dxf': 'application/dxf',
            '.pdf': 'application/pdf',
            '.iges': 'application/iges',
            '.igs': 'application/iges',
            '.stl': 'application/sla'
        };

        const contentType = mimeTypes[ext] || 'application/octet-stream';
        const fileName = path.basename(fullPath);

        // Return file with download header
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving CAD file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
