# MOHSIN E-Commerce Platform (AI-Enhanced Capstone)

A production-ready, highly polished e-commerce platform built with **React 19**, **TypeScript**, **Vite 8**, and powered by **Anthropic Claude AI (3.5 Sonnet / 3.6)** via a secure Node.js Express server.

---

## 🌟 Key AI Features

1. **Natural-Language Shopping Search:** Converts freeform shopping prompts (e.g. *"Gaming laptop with high refresh rate under $2200"*) into structured requirement JSON (`category`, `maxPrice`, `keyFeatures`, `reasoning`) to match real products with AI explanation tags.
2. **Multi-Product AI Comparison:** Compare 2 to 4 selected products side-by-side. Generates technical specification matrix tables, pros/cons breakdown, target buyer suitability, and a top recommendation verdict.
3. **AI Review Summaries:** Synthesizes customer feedback into sentiment scores (0-100%), top strengths, minor drawbacks, and purchase advice inside Quick View.
4. **100% Offline Resilience & Fallback Algorithms:** All core features (catalog browsing, manual filters, shopping cart, checkout, order tracking) operate seamlessly without AI or when offline.

---

## 🏗️ Architecture & Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Backend API Proxy:** Node.js Express + `@anthropic-ai/sdk` + Zod
- **Architecture Pattern:** MVVM (Model-View-ViewModel via custom React hooks)
- **Styling:** Pure Vanilla CSS with Design Tokens (`src/styles/`)
- **Testing:** Vitest + React Testing Library + `jsdom`
- **Linting:** Oxlint

---

## 🚀 Quick Start Guide

### 1. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3001
CLAUDE_API_KEY=sk-ant-api03-xxxx...
```

### 2. Run Backend Proxy Server
In a terminal window, start the Express AI proxy server:
```bash
npm run server
```

### 3. Run Frontend Development Server
In another terminal window, start the Vite client:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing & Code Quality

```bash
# Run unit and component test suite
npm test

# Run code linter
npm run lint

# Type check and build production bundle
npm run build
```

---

## 📁 Documentation Suite

Detailed technical documentation is available in the `docs/` folder:
- [Architecture & MVVM Pattern](file:///c:/Users/mohsi/OneDrive%20-%20Higher%20Education%20Commission/Desktop/FlyRank%20instenship/FlyRank-internship-capstone/docs/ARCHITECTURE.md)
- [AI Integration & Safety](file:///c:/Users/mohsi/OneDrive%20-%20Higher%20Education%20Commission/Desktop/FlyRank%20instenship/FlyRank-internship-capstone/docs/AI_INTEGRATION.md)
- [Testing Strategy](file:///c:/Users/mohsi/OneDrive%20-%20Higher%20Education%20Commission/Desktop/FlyRank%20instenship/FlyRank-internship-capstone/docs/TESTING.md)
- [WCAG 2.1 AA Accessibility](file:///c:/Users/mohsi/OneDrive%20-%20Higher%20Education%20Commission/Desktop/FlyRank%20instenship/FlyRank-internship-capstone/docs/ACCESSIBILITY.md)
- [Deployment & Security](file:///c:/Users/mohsi/OneDrive%20-%20Higher%20Education%20Commission/Desktop/FlyRank%20instenship/FlyRank-internship-capstone/docs/DEPLOYMENT_SECURITY.md)
- [Reflection & Lessons Learned](file:///c:/Users/mohsi/OneDrive%20-%20Higher%20Education%20Commission/Desktop/FlyRank%20instenship/FlyRank-internship-capstone/docs/REFLECTION.md)
