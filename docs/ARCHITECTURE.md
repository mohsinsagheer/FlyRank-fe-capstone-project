# Architecture Overview: Zenith E-Commerce Platform

## 1. Core Architectural Strategy: MVVM + AI Service Layer

The **Zenith E-Commerce Platform** uses the **Model-View-ViewModel (MVVM)** architectural pattern adapted for React. It enforces strict separation of concerns between raw domain models, stateful business logic, presentation UI, and an isolated server-side AI integration layer.

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                     │
│    views/pages (HomePage, ShopPage, TrackOrderPage, etc.)   │
│    views/components (AISearchBar, AICompareModal, etc.)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Reads State & Invokes Handlers
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      VIEWMODEL LAYER                        │
│    viewmodels/useShopViewModel.ts                           │
│    viewmodels/useAISearchViewModel.ts                       │
│    viewmodels/useAICompareViewModel.ts                      │
│    viewmodels/useCartViewModel.ts                           │
└──────────────────────────────┬──────────────────────────────┘
                               │ Calls Services & Queries Schemas
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   AI & DOMAIN SERVICE LAYER                 │
│    services/aiService.ts (Client API & Heuristic Fallbacks)  │
│    models/Product.ts, models/AI.ts, models/Cart.ts          │
└──────────────────────────────┬──────────────────────────────┘
                               │ Express HTTP Proxy (/api/ai/*)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER                         │
│    server.ts (Node.js/Express + @anthropic-ai/sdk + Zod)   │
└─────────────────────────────────────────────────────────────┘
```

## 2. Layer Responsibilities

### Domain Models (`src/models/`)
- Pure TypeScript interfaces defining domain objects (`Product`, `CartItem`, `OrderTrackingDetails`, `AISearchRequirement`, `AIComparisonResult`, `AIReviewSummary`).
- Completely free of React dependencies or UI code.

### ViewModels (`src/viewmodels/`)
- Encapsulates React state (`useState`, `useMemo`, `useCallback`) and operational logic.
- Exposes clean, readable properties and action callbacks to UI views.
- No direct DOM manipulation.

### Presentation Views (`src/views/`)
- Consists of pure functional components rendering UI based on ViewModel properties.
- Dispatches user intent by calling ViewModel callbacks.

### Server & AI Integration (`server.ts` & `src/services/aiService.ts`)
- Express proxy server holds the secret `CLAUDE_API_KEY` server-side, protecting it from frontend exposure.
- Enforces strict JSON output schemas via Zod validation.
- Provides 100% offline fallback logic to ensure zero downtime.
