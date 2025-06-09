# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Testing
No test framework is currently configured in this project.

## Architecture Overview

This is a Next.js (Pages Router) craft brewery website for "Langer's Lager" that showcases beers, recipes, and handles contact submissions.

### Data Layer
- **Database**: Supabase PostgreSQL with three main tables:
  - `beers` - Beer catalog with style, ABV, description, ingredients
  - `contact_submissions` - Customer inquiries and custom brew orders
  - `recipes` - Beer-paired food recipes with difficulty levels
- **Client**: Single Supabase client instance in `utils/supabase.ts`
- **Types**: Centralized TypeScript interfaces in `types/beers.ts` for Beer, ContactFormData, and Recipe

### API Architecture
- **RESTful APIs** in `pages/api/` following Next.js API routes pattern
- **beers.ts**: Full CRUD with filtering (season, style, search) and pagination
- **contact.ts**: Form submission handling with validation
- **recipes.ts**: Recipe management for food pairings

### Frontend Structure
- **Pages Router** with three main routes: home (`/`), recipes (`/recipes`), contact (`/contact`)
- **Server-Side Rendering**: Homepage uses `getServerSideProps` to fetch featured beers
- **Component Architecture**: Reusable `BeerCard` component, shared `Layout` component
- **Styling**: Tailwind CSS with amber color scheme reflecting brewery branding

### Environment Requirements
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous access key

### Database Schema Notes
- Row Level Security (RLS) enabled on all tables
- Anonymous read access for `beers` and `recipes` tables
- Anonymous insert access for `contact_submissions` table
- Sample data included for development (3 beers, 2 recipes)

### Image Handling
- Static images stored in `public/images/`
- Beer images referenced by filename in database `imageUrl` field
- Next.js Image component used throughout for optimization