# Engineering Portfolio

A modern, self-hosted portfolio website built with Next.js to showcase engineering projects with images, videos, and markdown documentation.

## Features

- 🎨 Modern, responsive design
- 📝 Markdown-based project descriptions
- 🖼️ Image and video support (YouTube embeds)
- 🔒 Password-protected admin panel
- ✏️ Full CRUD for projects
- 📄 Resume viewer
- 🚀 Optimized for production

## Tech Stack

- **Framework**: Next.js 16 (React)
- **Styling**: Vanilla CSS with CSS Modules
- **Deployment**: Docker / PM2
- **Storage**: File-based (JSON + public uploads)

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/gerryisrad/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

See [DEPLOYMENT-LINUX.md](./DEPLOYMENT-LINUX.md) for detailed deployment instructions for Linux servers.

Quick start with Docker:
```bash
docker-compose up -d
```

## Admin Panel

Access the admin panel at `/admin` to:
- Create/edit/delete projects
- Upload images and videos
- Edit About Me content
- Manage project visibility

Default credentials are in `.env.local`.

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── page.js         # Homepage
│   ├── about/          # About page
│   ├── admin/          # Admin panel
│   ├── projects/       # Project detail pages
│   └── actions.js      # Server actions
├── components/         # React components
├── content/           # JSON data files
├── public/            # Static files & uploads
└── styles/            # Global styles
```

## License

MIT License - feel free to use this for your own portfolio!

## Author

Gerardo Gutierrez
