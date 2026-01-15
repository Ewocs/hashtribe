# HashTribe - Architecture Overview

## System Architecture

HashTribe follows a modern **JAMstack architecture** with a clear separation between frontend and backend:

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React + TypeScript + Vite + Tailwind CSS            │  │
│  │  - Component-based UI                                 │  │
│  │  - Zustand for state management                       │  │
│  │  - React Router for navigation                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    Supabase JS Client
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                  │  │
│  │  - Tables with RLS policies                           │  │
│  │  - Triggers and functions                             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Authentication                                        │  │
│  │  - GitHub OAuth                                        │  │
│  │  - JWT tokens                                          │  │
│  │  - Session management                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Row Level Security (RLS)                             │  │
│  │  - Policy-based access control                        │  │
│  │  - No client-side trust                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Monorepo Structure

HashTribe uses **pnpm workspaces** for monorepo management:

```
HashTribe/
├── apps/
│   └── web/              # React frontend application
└── packages/
    └── shared/           # Shared types and utilities
```

### Benefits:
- **Code Reuse**: Shared types ensure consistency between frontend and backend
- **Type Safety**: TypeScript types generated from database schema
- **Scalability**: Easy to add new apps (mobile, admin panel, etc.)

## Frontend Architecture

### Component Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Navbar.tsx       # Navigation bar
│   └── ProtectedRoute.tsx  # Auth guard
├── pages/               # Page components (routes)
│   ├── LoginPage.tsx
│   ├── TribesPage.tsx
│   ├── CreateTribePage.tsx
│   └── TribeDetailPage.tsx
├── stores/              # Zustand state management
│   ├── authStore.ts     # Authentication state
│   └── tribeStore.ts    # Tribe data state
├── lib/                 # Utilities and configuration
│   └── supabase.ts      # Supabase client
└── App.tsx              # Root component with routing
```

### State Management

We use **Zustand** for state management:

- **authStore**: Manages user authentication, session, and profile
- **tribeStore**: Manages tribe data, membership, and CRUD operations

### Routing

React Router v6 with protected routes:

```
/                        → Redirect to /tribes (protected)
/login                   → Login page (public)
/auth/callback           → OAuth callback (public)
/tribes                  → Tribes list (protected)
/tribes/create           → Create tribe (protected)
/tribes/:slug            → Tribe detail (protected)
/competitions            → Competitions (protected, coming soon)
/leaderboard             → Leaderboard (protected, coming soon)
/profile/:username       → User profile (protected, coming soon)
```

## Backend Architecture

### Database Schema

**Core Tables:**

1. **users** - User profiles
   - Linked to `auth.users` via foreign key
   - Stores GitHub data and DevCom score
   - Public profiles viewable by all

2. **tribes** - Communities
   - Public/private visibility
   - Auto-generated unique slugs
   - Creator automatically becomes admin

3. **tribe_members** - Membership
   - Links users to tribes
   - Role-based (admin/member)
   - Unique constraint on (tribe_id, user_id)

4. **topics** - Discussion topics (Phase 1)
   - Belongs to a tribe
   - Created by members only

5. **topic_replies** - Replies (Phase 1)
   - Belongs to a topic
   - Supports code snippets

6. **competitions** - Coding competitions (Phase 1)
   - Status: draft, upcoming, live, ended
   - Difficulty levels

7. **competition_participants** - Entries (Phase 1)
   - Tracks scores and ranks

### Row Level Security (RLS)

**Security Model:**

- **No client-side trust**: All access control enforced at database level
- **Policy-based**: Each table has specific RLS policies
- **Role-aware**: Policies check user roles (admin/member)

**Example Policies:**

```sql
-- Public tribes viewable by everyone
CREATE POLICY "Public tribes are viewable by everyone"
  ON tribes FOR SELECT
  USING (visibility = 'public');

-- Only tribe admins can update tribes
CREATE POLICY "Tribe admins can update tribes"
  ON tribes FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM tribe_members
      WHERE tribe_id = tribes.id 
        AND user_id = auth.uid() 
        AND role = 'admin'
    )
  );
```

### Authentication Flow

```
1. User clicks "Sign in with GitHub"
   ↓
2. Supabase redirects to GitHub OAuth
   ↓
3. User authorizes application
   ↓
4. GitHub redirects back to Supabase
   ↓
5. Supabase creates auth.users entry
   ↓
6. Frontend creates user profile in public.users
   ↓
7. User is authenticated and redirected to /tribes
```

## Data Flow

### Creating a Tribe

```
1. User fills form in CreateTribePage
   ↓
2. Form submission calls tribeStore.createTribe()
   ↓
3. Store generates unique slug
   ↓
4. Supabase INSERT with RLS check
   ↓
5. Database trigger adds creator as admin member
   ↓
6. Store refreshes tribe list
   ↓
7. User redirected to new tribe page
```

### Joining a Tribe

```
1. User clicks "Join" button
   ↓
2. tribeStore.joinTribe() called
   ↓
3. Supabase INSERT into tribe_members
   ↓
4. RLS policy checks:
   - User is authenticated
   - Tribe is public
   ↓
5. Store refreshes membership data
   ↓
6. UI updates to show "Leave" button
```

## Security Considerations

### Authentication
- GitHub OAuth only (no password storage)
- JWT tokens with auto-refresh
- Session persistence in localStorage

### Authorization
- All data access controlled by RLS policies
- No direct SQL from frontend
- Role-based permissions enforced at DB level

### Data Validation
- TypeScript types for compile-time safety
- Database constraints for runtime safety
- Input sanitization via Supabase client

## Performance Optimizations

### Frontend
- Code splitting with React.lazy (future)
- Optimistic UI updates
- Efficient re-renders with Zustand

### Backend
- Database indexes on frequently queried columns
- Efficient RLS policies
- Connection pooling via Supabase

## Scalability

### Current Capacity
- Handles thousands of users
- Suitable for MVP and early growth

### Future Scaling
- Add caching layer (Redis)
- Implement CDN for static assets
- Database read replicas
- Horizontal scaling with Supabase

## Development Workflow

```
1. Local Development
   - Supabase local instance (Docker)
   - Hot reload with Vite
   - Type-safe development

2. Database Changes
   - Create migration file
   - Test locally
   - Generate TypeScript types
   - Commit migration

3. Frontend Changes
   - Component development
   - State management
   - Type checking
   - Lint and build

4. Deployment (Future)
   - Frontend: Vercel/Netlify
   - Backend: Supabase Cloud
   - CI/CD: GitHub Actions
```

## Technology Choices

### Why React?
- Large ecosystem
- Component reusability
- Strong TypeScript support
- Excellent developer experience

### Why Supabase?
- PostgreSQL (proven, scalable)
- Built-in authentication
- Row Level Security
- Real-time capabilities
- Open source

### Why Tailwind CSS?
- Utility-first approach
- Fast development
- Consistent design system
- Small bundle size with purging

### Why Zustand?
- Simple API
- No boilerplate
- TypeScript-first
- Excellent performance

## Future Architecture Considerations

### Phase 2 Additions
- **GitHub Integration Service**: Fetch and sync GitHub data
- **LeetCode/HackerRank Adapters**: Platform integrations
- **DevCom Score Engine**: Background job for score calculation
- **Company Portal**: Separate app or module

### Phase 3 Additions
- **AI Matching Service**: ML-based recommendations
- **Analytics Pipeline**: Data warehouse for insights
- **Mobile Apps**: React Native with shared types
- **Admin Dashboard**: Separate admin interface

---

This architecture is designed to be:
- ✅ **Secure**: RLS policies, no client-side trust
- ✅ **Scalable**: Monorepo, modular structure
- ✅ **Maintainable**: Type-safe, well-documented
- ✅ **Extensible**: Easy to add new features
- ✅ **Developer-friendly**: Great DX with modern tools
