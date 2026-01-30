# Project File Structure

This portfolio uses an organized folder structure where each project has its own directory.

## Structure

```
content/
├── about.json
└── projects/
    ├── project-slug-1/
    │   ├── project.json      # Metadata (title, description, tags, skills, etc.)
    │   ├── description.md    # Markdown content displayed on project page
    │   └── images/           # All images for this project
    │       ├── image1.jpg
    │       ├── image2.png
    │       └── ...
    ├── project-slug-2/
    │   ├── project.json
    │   ├── description.md
    │   └── images/
    └── ...
```

## File Descriptions

###`project.json`
Contains all metadata for the project:
- `title`: Project title
- `description`: Short description for cards/SEO
- `date`: Project date (YYYY-MM-DD format)
- `tags`: Array of category tags
- `skills`: Array of technical skills demonstrated
- `paper`: Link to research paper (optional)
- `videoId`: YouTube video ID (optional)
- `mainImage`: Path to main/featured image
- `gallery`: Array of image paths for gallery

### `description.md`
Pure markdown content that appears on the project detail page. Supports:
- Headings
- Lists
- Code blocks
- Images (via markdown syntax)
- Tables
- All GitHub Flavored Markdown features

### `images/`
All images for the project. Images are referenced as:
```
/content/projects/[slug]/images/filename.jpg
```

## Example: Creating a New Project

1. Create project folder:
```bash
mkdir -p content/projects/my-new-project/images
```

2. Create `project.json`:
```json
{
  "title": "My New Project",
  "description": "A brief description of the project",
  "date": "2026-01-30",
  "tags": ["Robotics", "Software"],
  "skills": ["Python", "ROS"],
  "paper": "",
  "videoId": "",
  "mainImage": "/content/projects/my-new-project/images/main.jpg",
  "gallery": []
}
```

3. Create `description.md`:
```markdown
# My New Project

## Overview
Project details here...

## Technical Details
More information...
```

4. Add images to `images/` folder

## Benefits

- ✅ **Organized**: Each project is self-contained
- ✅ **Easy Backup**: Copy entire project folder
- ✅ **Easy Access**: Navigate directly to project files on host
- ✅ **Portable**: Move projects between systems easily
- ✅ **Clear Separation**: Metadata vs content vs media

## Accessing Files (Docker Deployment)

When deployed with Docker, the `content` directory is mounted as a volume:

```bash
# Navigate to a specific project
cd ~/engineering-portfolio/content/projects/my-project/

# View project images
ls images/

# Edit markdown content
nano description.md

# View metadata
cat project.json
```

All changes are immediately reflected in the container!
