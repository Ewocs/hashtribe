# 🔷 DevCom — Complete Product Scope

This document contains the complete product vision for HashTribe (DevCom). The current implementation focuses on **Phase 1 MVP** features.

---

## 🎯 Product Mission

DevCom is a **verified developer credibility & collaboration platform** where:

* Developers build **proof-based profiles**
* Companies host **competitions & hiring events**
* Communities enable **real collaboration**, not noise

---

## 👨‍💻 1. Developer Model (User Side)

### 1.1 Identity & Profile

**Core Features**

* DevCom Account
* Public developer profile
* Username + bio + role
* Tech stack auto-detection

**Integrated Data Sources**

* GitHub (mandatory) ✅ Phase 1
* LeetCode / HackerRank (optional) - Phase 2

**Profile Displays**

* Contribution heatmap - Phase 2
* Skill graph - Phase 2
* Activity timeline - Phase 2
* DevCom Score (system-calculated) - Phase 2

---

### 1.2 Developer Reputation & Score

**Inputs** (Phase 2)

* GitHub commits, PRs, repos
* Coding platform stats
* Competition performance
* Project contributions
* Community participation

**Outputs** (Phase 2)

* Global rank
* Skill-wise rank
* Community reputation
* Badge system

> 🔒 No manual skill endorsements (anti-fake).

---

### 1.3 Communities & Topics

**Developers Can**

* Join communities ✅ Phase 1
* Create topics - Phase 1 (in progress)
* Reply with code/solutions - Phase 1
* Upvote based on reputation - Phase 2

**Community Types** ✅ Phase 1

* Tech-based
* Project-based
* College / org-based
* Event-based (auto-created) - Phase 2

---

### 1.4 Project Collaboration (Phase 2)

**Project Space**

* Description & goals
* Required roles
* GitHub repo linking
* Task board (basic)
* Contributors list

**Contribution Tracking**

* Auto-sync from GitHub
* Manual logs (verified by maintainers)

---

### 1.5 Developer Permissions (Phase 2)

Unlocked via reputation:

* Create communities
* Moderate topics
* Host open events
* Feature projects

---

## 🏢 2. Company Model (Organization Side) - Phase 2

### 2.1 Company Account

**Profile Includes**

* Company info & logo
* Verified domain
* Hiring focus areas
* Past events history

**Roles**

* Admin
* Recruiter
* Event Manager

---

### 2.2 Talent Discovery

Companies can:

* View public developer profiles
* Filter by skills, rankings, activity
* Save shortlists

> 🔒 Private contact only after dev opt-in.

---

### 2.3 Branding & Visibility

* Company page
* Sponsored events
* Featured challenges
* Community sponsorships

---

## 🏆 3. Competition & Event Hosting

### 3.1 Event Types (Phase 1 - Basic)

* Coding contests
* Hiring challenges - Phase 2
* Hackathons - Phase 2
* System design rounds - Phase 2

---

### 3.2 Event Creation Flow (Phase 1 - Basic)

1. Create event
2. Set difficulty, skills, eligibility
3. Choose format
4. Publish

---

### 3.3 Participation Flow (Phase 1)

* Discover events
* Register
* Compete
* Track rank in real time
* Results auto-linked to profile

---

### 3.4 Ranking & Scoring (Phase 1)

* Global leaderboard
* Event-specific ranks
* Skill-wise leaderboard - Phase 2

---

## 🧱 4. Platform-Wide Systems

### 4.1 DevCom Score Engine (Phase 2)

Weighted scoring:

```
GitHub Activity       → 30%
DSA Platforms         → 25%
Competition Results   → 25%
Projects & Collabs    → 15%
Community Reputation  → 5%
```

---

### 4.2 Moderation & Trust

* Reputation-gated actions - Phase 2
* Community moderators - Phase 2
* Automated spam detection - Phase 3
* Report system - Phase 2

---

### 4.3 Search & Discovery

* Developers - Phase 2
* Communities ✅ Phase 1
* Projects - Phase 2
* Events - Phase 1
* Companies - Phase 2

---

## 💰 5. Monetization Scope (Phase 3)

### For Companies

* Paid event hosting
* Hiring access tiers
* Featured placements

### For Developers

* Premium analytics
* Resume export
* Profile visibility boost

---

## 🚀 6. Delivery Phases

### Phase 1 – MVP ✅ (Current)

✅ Developer profiles (GitHub)
✅ GitHub OAuth authentication
✅ Communities (Tribes) CRUD
✅ Membership management
✅ Row Level Security (RLS)
🔄 Topics & discussions (in progress)
🔄 Basic competitions (in progress)
🔄 Leaderboards (in progress)

---

### Phase 2 – Growth

⬜ LeetCode / HackerRank sync
⬜ Company dashboards
⬜ Hiring challenges
⬜ DevCom Score v2
⬜ Profile analytics
⬜ Project collaboration

---

### Phase 3 – Scale

⬜ AI matching
⬜ Advanced analytics
⬜ Recruiter tools
⬜ Global rankings
⬜ Mobile app
⬜ Monetization features

---

## 🧠 What Makes DevCom Defensible

* Proof-based profiles (no fake skills)
* Cross-platform skill aggregation
* Reputation-gated community
* Real collaboration history
* Company-grade hiring signals
* Open-source & transparent

---

**Current Status**: Phase 1 MVP - Tribes System
**Next Milestone**: Complete Topics, Competitions, and Leaderboards
