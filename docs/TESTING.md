# Testing Strategy & Execution

## Test Framework Stack
- **Test Runner:** Vitest
- **Component Testing:** React Testing Library + `@testing-library/jest-dom`
- **Environment:** `jsdom`
- **Static Quality:** Oxlint + TypeScript strict mode (`tsc -b`)

---

## Test Suites

1. **Unit Tests (`src/services/__tests__/aiService.test.ts`):**
   - Tests fallback natural language search heuristic.
   - Tests multi-product comparison generation logic.
   - Tests review summary sentiment generation.

2. **ViewModel Hook Tests (`src/viewmodels/__tests__/useShopViewModel.test.ts`):**
   - Tests category filtering logic.
   - Tests AI matched product filter integration.
   - Tests filter clearing and state resetting.

3. **Component Integration Tests (`src/views/components/__tests__/AISearchBar.test.tsx`):**
   - Tests input rendering and ARIA labels.
   - Tests form submit handling and prompt suggestion button clicks.

---

## Running Tests

```bash
# Run test suite once
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Run type check and production build
npm run build
```
