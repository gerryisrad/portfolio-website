import fs from 'fs';
import path from 'path';

const aboutDirectory = path.join(process.cwd(), 'content');
const aboutFile = path.join(aboutDirectory, 'about.json');

export function getAboutData() {
    try {
        if (!fs.existsSync(aboutFile)) {
            return null;
        }
        const fileContents = fs.readFileSync(aboutFile, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading about data:", error);
        return null;
    }
}
