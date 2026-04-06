# Baristech

Baristech is a scalable, modular, AI-enabled legal operations platform designed for law firms, legal professionals, clients, and legal trainees. It functions as an Intelligent Legal Ecosystem supporting the complete lifecycle of legal work.

## Features

- **Law Firm Operations**: Case tracking, task management, collaboration, deadline monitoring
- **Case & Matter Management**: File storage, document management, court schedules, evidence tracking
- **Client Portal**: Status updates, document sharing, messaging, billing
- **Firm Administration**: Time tracking, invoicing, revenue tracking, staff management
- **Legal Education & Training**: Internship management, training modules, case simulations
- **Legal Intelligence & Reporting**: Analytics, performance metrics, productivity insights
- **AI Capabilities**: Document summarization, classification, legal research, automated drafting, conversational AI

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Design System

### Color Palette

Baristech uses a carefully audited 16-token color system optimized for legal applications:

- **Backgrounds**: 4-layer depth system (H240° blue-purple monochromatic)
- **Brand Gold**: 3-stop system (#7A6330 → #CBAA50 → #E8C96E) for authority and luxury
- **Typography**: 3-tier hierarchy with WCAG AA compliance
- **Semantic**: Well-spaced hues for status indicators

**WCAG Compliance**: A-grade contrast compliance. All text combinations pass AA (4.5:1) except --dim on --raised (4.4:1, passes large text). Red used only for UI elements, not body text.

**Harmony Analysis**: Cool blue-purple dominant (H240°) with warm gold accent (H44°) creates professional tension. Semantic colors optimally spaced across hue wheel.

**Key Colors**:
- Primary: `--gold` (#CBAA50) - 9.0:1 contrast on all backgrounds
- Text: `--text` (#ECECE8) - 17.0:1 on --bg
- Success: `--green` (#1DB954) - 7.8:1 on --bg
- Warning: `--amber` (#E67E22) - 7.1:1 on --bg
- Error: `--red` (#C0392B) - 3.7:1 on --bg (large text only)

**Semantic Aliases**: Added `--accent-text`, `--accent-bg`, `--text-primary`, `--text-secondary`, `--text-muted` for clearer intent and safer refactoring.

See `components/GlobalStyles.tsx` for the complete CSS variable definitions.

## Getting Started

### Prerequisites

- Node.js 18+ (installed via winget)
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Build for production:

```bash
npm run build
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components (includes new `LegalResearch` and `AIIntelligence` modules mounted at `/modules/education` and `/modules/ai-assistant`)
- `lib/`: Utility functions and configurations (localStorage-backed DB and store helpers)
- `public/`: Static assets

## Branding

- **Primary Color**: #1E3A8A (Deep Legal Blue)
- **Secondary Color**: #C8A75D (Professional Gold)

## Contributing

Work through the checklist items in `.github/copilot-instructions.md` systematically.

## License

[Add license information]
