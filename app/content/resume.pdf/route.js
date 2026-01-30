import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const resumePath = path.join(process.cwd(), 'content', 'resume.pdf');

    try {
        const file = fs.readFileSync(resumePath);

        return new NextResponse(file, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="resume.pdf"',
            },
        });
    } catch (error) {
        return new NextResponse('Resume not found', { status: 404 });
    }
}
