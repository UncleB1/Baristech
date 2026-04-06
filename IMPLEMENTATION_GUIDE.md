# BarisTech Implementation Guide

## Quick Start: Make It Work Immediately

### Step 1: Configure Environment (5 minutes)

Create `.env.local` in project root:
```bash
# API Configuration
NEXT_PUBLIC_ANTHROPIC_API_URL=https://api.anthropic.com/v1/messages
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
NEXT_PUBLIC_ANTHROPIC_MODEL=claude-sonnet-4-20250514

# Auth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=YOUR_RANDOM_SECRET_HERE
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: Install Required Packages (2 minutes)

```bash
npm install anthropic next-auth
```

### Step 3: Fix API Calls (30 minutes)

Replace all instances of:
```javascript
fetch("https://api.anthropic.com/v1/messages", {...)
```

With:
```typescript
fetch(process.env.NEXT_PUBLIC_ANTHROPIC_API_URL!, {
  ...headers,
  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY}`
})
```

### Step 4: Create API Route (15 minutes)

Create `app/api/ai/chat/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages, system, maxTokens } = await req.json();
  
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ANTHROPIC_API_URL!,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: process.env.NEXT_PUBLIC_ANTHROPIC_MODEL,
          max_tokens: maxTokens || 1000,
          system,
          messages,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
```

### Step 5: Update Client Calls (20 minutes)

Replace:
```javascript
const res = await fetch("https://api.anthropic.com/v1/messages", {...})
```

With:
```typescript
const res = await fetch("/api/ai/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages, system, maxTokens }),
})
```

### Step 6: Fix TypeScript (1 hour)

Convert file to TypeScript. Replace top line:
```jsx
import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
```

With:
```typescript
'use client';

import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useRef, 
  lazy, 
  Suspense,
  ReactNode,
  FC,
  ComponentType,
} from "react";
import { NextRouter } from "next/router";
```

Add types for main interfaces:
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  type: 'FIRM' | 'STUDENT';
  role: 'PARTNER' | 'STUDENT' | 'ASSOCIATE';
  firm_id: string | null;
  created_at: string;
}

interface LegalCase {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: number;
  judges: string[];
  legal_topics: string[];
  legal_issues: string[];
  headnote: string;
  summary: string;
  legal_principles: string[];
  principle_highlights: string[];
  full_judgment_text: string;
  simplified_summary: string;
  exam_relevance: number;
  exam_relevance_explanation: string;
  precedent_status: 'Active' | 'Overruled' | 'Distinguished';
  citation_count: number;
  related_citations: string[];
  cited_by: string[];
  created_at: string;
}

interface Firm {
  id: string;
  name: string;
  owner: string;
  plan: 'professional' | 'enterprise';
  members: string[];
  created_at: string;
}

interface Case {
  id: string;
  fid: string; // firm_id
  uid: string; // user_id
  title: string;
  client: string;
  status: 'active' | 'pending' | 'closed';
  priority: 'high' | 'medium' | 'low';
  desc: string;
  created: string;
}

interface Task {
  id: string;
  fid: string;
  uid: string;
  title: string;
  cid: string; // case_id
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'done';
  due: string;
  notes: string;
  created: string;
}

interface Client {
  id: string;
  fid: string;
  name: string;
  email: string;
  phone: string;
  ctype: 'individual' | 'corporate' | 'government';
  created: string;
}

interface Invoice {
  id: string;
  fid: string;
  no: string;
  client: string;
  cid: string;
  amount: number;
  desc: string;
  status: 'pending' | 'paid';
  due: string;
  created: string;
}

interface StudentProgress {
  studied: string[];
  bookmarked: string[];
  topics: string[];
  ai_count: number;
}
```

---

## Production Checklist

### Database Setup (Choose One)

#### Option A: Firebase (Recommended for MVP)
```bash
npm install firebase
```

Create `lib/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

#### Option B: Supabase (Best for PostgreSQL)
```bash
npm install @supabase/supabase-js
```

Create `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

#### Option C: Custom Backend
Use existing Node.js/Express server with PostgreSQL

---

## File Structure After Migration

```
app/
├── page.tsx                 # Landing page
├── layout.tsx
├── globals.css
├── auth/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── layout.tsx
├── dashboard/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── cases/page.tsx
│   ├── tasks/page.tsx
│   ├── clients/page.tsx
│   ├── time/page.tsx
│   ├── docs/page.tsx
│   ├── comms/page.tsx
│   ├── research/page.tsx
│   ├── ai/page.tsx
│   ├── analytics/page.tsx
│   ├── billing/page.tsx
│   ├── progress/page.tsx
│   └── sim/page.tsx
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── ai/
│   │   ├── chat/route.ts
│   │   ├── enrich/route.ts
│   │   └── review/route.ts
│   ├── cases/route.ts
│   ├── tasks/route.ts
│   └── ...

components/
├── BarisTech/
│   ├── Styles/GlobalStyles.tsx
│   ├── Icons/Icons.tsx
│   ├── LandingPage.tsx
│   ├── AuthPage.tsx
│   ├── Sidebar.tsx
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── Stats.tsx
│   │   └── RecentActivity.tsx
│   ├── CaseManagement/
│   │   ├── CaseList.tsx
│   │   ├── CaseDetail.tsx
│   │   ├── CaseForm.tsx
│   │   └── CaseStudyPanel.tsx
│   ├── LegalResearch/
│   │   ├── LegalResearch.tsx
│   │   ├── CaseSearch.tsx
│   │   └── StatuteSearch.tsx
│   ├── AI/
│   │   ├── AIIntelligence.tsx
│   │   ├── AITutor.tsx
│   │   └── ChatMessage.tsx
│   ├── Admin/
│   │   ├── TimeTracker.tsx
│   │   ├── CaseComms.tsx
│   │   ├── DocManager.tsx
│   │   └── Billing.tsx
│   ├── Student/
│   │   ├── StudyProgress.tsx
│   │   ├── CaseSimulation.tsx
│   │   └── SimulationFeedback.tsx
│   └── Common/
│       ├── NotificationBell.tsx
│       ├── Toast.tsx
│       └── Modal.tsx

lib/
├── database/
│   ├── firebase.ts
│   ├── schema.ts
│   └── migrations.ts
├── api/
│   ├── ai.ts
│   ├── cases.ts
│   └── auth.ts
├── stores/
│   ├── db.ts
│   ├── store.ts
│   └── auth.ts
├── hooks/
│   ├── useToast.ts
│   ├── useAuth.ts
│   └── useStore.ts
└── utils/
    ├── colors.ts
    ├── constants.ts
    └── validators.ts

types/
├── index.ts
├── user.ts
├── legal.ts
├── cases.ts
└── api.ts
```

---

## Testing Checklist

```bash
# Unit Tests
npm run test

# Integration Tests  
npm run test:integration

# E2E Tests
npm run test:e2e

# Build Test
npm run build

# Production Preview
npm start
```

---

## Deployment Checklist

- [ ] All environment variables set
- [ ] Database configured and tested
- [ ] API keys secured (use Secrets Manager)
- [ ] Run `npm run build` successfully
- [ ] Run tests and pass
- [ ] Run lighthouse performance audit
- [ ] Security audit completed
- [ ] CORS properly configured
- [ ] Rate limiting configured
- [ ] Logging enabled
- [ ] Monitoring configured
- [ ] Backup strategy implemented
- [ ] DNS configured
- [ ] SSL certificate installed
- [ ] CI/CD pipeline configured

---

## Troubleshooting

### API Calls Failing
- Check `.env.local` has correct keys
- Verify CORS is configured
- Check rate limiting isn't triggered
- Look at browser console for errors

### localStorage Not Persisting
- This is normal in SSR - switch to database
- Disable localStorage warnings if needed temporarily

### Components Not Rendering
- Ensure all imports are correct
- Check React version compatibility
- Verify 'use client' directive on client components

### Performance Issues
- Memoize components with high re-render rates
- Use dynamic imports for heavy components
- Enable Next.js image optimization
- Use production build (`npm run build`)

---

## Getting Help

- Review BARISTECH_REVIEW.md for detailed analysis
- Check console errors for specific issues
- Verify environment variables with: `npm run env:check`
- Run tests with verbose output: `npm test -- --verbose`

