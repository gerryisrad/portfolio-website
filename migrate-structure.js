const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Migration Script: Reorganize Project Structure
 * 
 * Old:
 *   content/projects/[slug].md (frontmatter + markdown)
 *   public/uploads/[slug]/* (images)
 * 
 * New:
 *   content/projects/[slug]/
 *     ├── project.json (metadata from frontmatter)
 *     ├── description.md (markdown content)
 *     └── images/ (migrated from public/uploads/[slug])
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');
const OLD_PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const PUBLIC_UPLOADS = path.join(process.cwd(), 'public', 'uploads');

async function migrateProjects() {
    console.log('🔄 Starting project structure migration...\n');

    // Read all markdown files
    const files = fs.readdirSync(OLD_PROJECTS_DIR).filter(f => f.endsWith('.md'));
    console.log(`📦 Found ${files.length} projects to migrate\n`);

    // Create backup directory
    const backupDir = path.join(CONTENT_DIR, 'projects-backup');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    for (const file of files) {
        const slug = path.basename(file, '.md');
        console.log(`Migrating: ${slug}`);

        const oldFilePath = path.join(OLD_PROJECTS_DIR, file);
        const fileContent = fs.readFileSync(oldFilePath, 'utf-8');
        const { data: frontmatter, content: markdown } = matter(fileContent);

        // Create new directory structure
        const newProjectDir = path.join(OLD_PROJECTS_DIR, slug);
        const imagesDir = path.join(newProjectDir, 'images');

        // Backup old markdown file
        fs.copyFileSync(oldFilePath, path.join(backupDir, file));

        // Create directories
        if (!fs.existsSync(newProjectDir)) {
            fs.mkdirSync(newProjectDir, { recursive: true });
        }
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        // Save description.md (just the markdown content)
        const descriptionPath = path.join(newProjectDir, 'description.md');
        fs.writeFileSync(descriptionPath, markdown.trim(), 'utf-8');
        console.log(`  ✓ Created description.md`);

        // Migrate images from public/uploads/[slug]/
        const oldUploadsPath = path.join(PUBLIC_UPLOADS, slug);
        if (fs.existsSync(oldUploadsPath)) {
            const imageFiles = fs.readdirSync(oldUploadsPath);
            for (const img of imageFiles) {
                const oldImgPath = path.join(oldUploadsPath, img);
                const newImgPath = path.join(imagesDir, img);
                fs.copyFileSync(oldImgPath, newImgPath);
            }
            console.log(`  ✓ Migrated ${imageFiles.length} images`);

            // Update image paths in frontmatter
            if (frontmatter.mainImage) {
                const mainImageName = path.basename(frontmatter.mainImage);
                frontmatter.mainImage = `/content/projects/${slug}/images/${mainImageName}`;
            }
            if (frontmatter.gallery && Array.isArray(frontmatter.gallery)) {
                frontmatter.gallery = frontmatter.gallery.map(imgPath => {
                    const imgName = path.basename(imgPath);
                    return `/content/projects/${slug}/images/${imgName}`;
                });
            }
        }

        // Save project.json (metadata only)
        const projectJsonPath = path.join(newProjectDir, 'project.json');
        fs.writeFileSync(projectJsonPath, JSON.stringify(frontmatter, null, 2), 'utf-8');
        console.log(`  ✓ Created project.json`);

        // Delete old markdown file
        fs.unlinkSync(oldFilePath);
        console.log(`  ✓ Removed old ${file}\n`);
    }

    console.log('💾 Old markdown files backed up to content/projects-backup/');
    console.log('\n✅ Migration complete!');
    console.log('\n📁 New structure:');
    console.log('   content/projects/');
    console.log('   ├── [project-slug]/');
    console.log('   │   ├── project.json      (metadata)');
    console.log('   │   ├── description.md    (markdown content)');
    console.log('   │   └── images/           (all project images)');
    console.log('\n💡 Verify the migration, then you can delete:');
    console.log('   - content/projects-backup/');
    console.log('   - public/uploads/');
}

// Run migration
migrateProjects().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
