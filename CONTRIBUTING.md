# Contributing to HashTribe

Thank you for your interest in contributing to HashTribe! This document provides guidelines and instructions for contributing.

## 🎯 Project Overview

HashTribe is a developer-first community and collaboration platform built for ECWoC (Engineering College Winter of Code) and open-source contributors.

**Tech Stack:**
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth + RLS)
- Monorepo: pnpm workspaces

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (use nvm: `nvm use`)
- pnpm 8+ (`npm install -g pnpm`)
- Supabase CLI (`brew install supabase/tap/supabase` on macOS)
- Git

### Setup Instructions

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/HashTribe.git
   cd HashTribe
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Supabase**
   ```bash
   # Start local Supabase instance
   pnpm supabase:start
   
   # OR for Hosted Supabase, see detailed instructions in:
   # docs/SETUP_GUIDE.md
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your Supabase credentials
   ```

5. **Run Migrations**
   ```bash
   pnpm db:migrate
   ```

6. **Start Development Server**
   ```bash
   pnpm dev
   ```

7. **Configure GitHub OAuth** (for authentication)
   - Create a GitHub OAuth App: https://github.com/settings/developers
   - Set Authorization callback URL: `http://localhost:54321/auth/v1/callback`
   - Add Client ID and Secret to Supabase Dashboard (http://localhost:54323)
   - Go to Authentication > Providers > GitHub

## 📋 Issue Labels

We use labels to categorize issues:

- `good-first-issue` - Perfect for newcomers
- `frontend` - React/UI work
- `backend` - Supabase/Database work
- `rls` - Row Level Security policies
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements

## 🔧 Development Workflow

1. **Pick an Issue**
   - Browse issues labeled `good-first-issue` for easy tasks
   - Comment on the issue to get it assigned

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Write clean, well-commented code
   - Follow existing code style
   - Test your changes locally

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add feature description"
   # or
   git commit -m "fix: bug description"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Tests
   - `chore:` - Maintenance

5. **Push and Create PR**
   ```bash
   git push origin your-branch-name
   ```
   - Go to GitHub and create a Pull Request
   - Fill in the PR template
   - Link the related issue

## 🎨 Code Style

- **TypeScript**: Use strict typing, avoid `any` when possible
- **React**: Functional components with hooks
- **Tailwind**: Use utility classes, custom classes in `index.css`
- **File naming**: PascalCase for components, camelCase for utilities
- **Imports**: Use path aliases (`@/` for src)

## 🧪 Testing

Before submitting a PR:

1. **Type Check**
   ```bash
   pnpm type-check
   ```

2. **Lint**
   ```bash
   pnpm lint
   ```

3. **Build**
   ```bash
   pnpm build
   ```

## 📝 Pull Request Guidelines

- Keep PRs focused on a single issue
- Write clear PR descriptions
- Include screenshots for UI changes
- Update documentation if needed
- Ensure all checks pass
- Be responsive to feedback

## 🔒 Security

- Never commit `.env` files
- Follow RLS best practices for database access
- Report security issues privately to maintainers

## 💬 Communication

- **Issues**: For bug reports and feature requests
- **Discussions**: For questions and ideas
- **Discord**: [Join our community] (link TBD)

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Eligible for ECWoC certificates (if applicable)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

Feel free to:
- Open a discussion
- Comment on issues
- Reach out to maintainers

Thank you for contributing to HashTribe! 🚀
