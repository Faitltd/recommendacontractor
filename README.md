# Recommend a Contractor

A contractor rating and review platform for Denver, Colorado, with plans for national expansion. This platform allows users to find, review, and connect with verified contractors while providing contractors with advertising opportunities.

## Features

### Core Features
- **User Authentication**: Facebook OAuth integration for clients and contractors
- **Contractor Verification**: Business license, insurance, and certification verification
- **Review System**: Comprehensive rating system with photos and document uploads
- **Search & Filter**: Location-based search with advanced filtering options
- **Advertising Platform**: Featured listings and banner ads for contractors
- **Admin Dashboard**: Content management and dispute resolution tools

### Technical Stack
- **Frontend**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth.js (formerly NextAuth.js)
- **File Storage**: AWS S3
- **Payments**: Stripe
- **Email**: SendGrid
- **Maps**: Google Maps API

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Facebook Developer App
- AWS Account (for S3 and Rekognition)
- Stripe Account
- SendGrid Account
- Google Maps API Key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recomendacontractor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Set up the database:
```bash
npm run db:setup
npm run db:migrate
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

### Project Structure
```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── server/         # Server-side utilities and API helpers
│   ├── stores/         # Svelte stores for state management
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── routes/             # SvelteKit routes and pages
└── app.css            # Global styles and Tailwind imports
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:setup` - Initialize database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

## Deployment

The application is designed to be deployed on Vercel with the following configuration:
- Environment variables configured in Vercel dashboard
- PostgreSQL database (recommended: Neon, Supabase, or AWS RDS)
- AWS S3 bucket for file storage
- Stripe webhooks configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.
