# useWindowSize — Streaming Layout Demo

A Vite + React project that demonstrates a custom `useWindowSize` hook applied to a polished, Netflix-style streaming website. The layout switches automatically between a **desktop** and **mobile** view based on the live window dimensions.

---

## Description

The app uses a custom React hook (`useWindowSize`) to track `window.innerWidth` and `window.innerHeight` in real time. When the width drops below **768 px** the page renders a compact mobile layout; at 768 px or wider it renders the full desktop layout. The current dimensions are always visible on screen.

---

## Features

- **`useWindowSize` custom hook** — built with `useState` + `useEffect`, attaches a `resize` listener on mount and removes it on unmount.
- **Responsive streaming UI** — hero banner, trending card row (desktop) / 2-column grid (mobile), sticky navbar, footer.
- **Live size badge** — always-visible `width × height` readout in the navbar.
- **Layout strip** — labelled "📱 Mobile Layout" or "🖥️ Desktop Layout" with the exact pixel values.
- **10 automated tests** — 6 for the hook, 4 for the App component (normal + edge cases).

---

## Technologies Used

| Tool | Purpose |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React 18](https://react.dev/) | UI library |
| [Vitest](https://vitest.dev/) | Test runner |
| [@testing-library/react](https://testing-library.com/) | Component testing |

---

## How to Install and Run

```bash
# 1. Clone the repo
git clone https://github.com/yisakor-mirany/use-window-size-streaming-layout.git
cd use-window-size-streaming-layout

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → opens at http://localhost:5173

# 4. Run all tests
npm test
```

> **Try it:** drag the browser window narrower than 768 px to see the mobile layout appear instantly.

---

## File Structure

```
src/
├── hooks/
│   └── useWindowSize.js      ← custom hook (useState + useEffect + resize listener)
├── __tests__/
│   ├── useWindowSize.test.js ← 6 hook tests (3 normal + 3 edge)
│   └── App.test.jsx          ← 4 component tests
├── App.jsx                   ← main component, uses the hook
├── App.css                   ← all styles (dark streaming theme)
├── main.jsx                  ← React entry point
└── setupTests.js             ← jest-dom matchers
index.html
vite.config.js
package.json
```

---

## Test Cases

### Normal Test Cases

| # | Test | Expected Result |
|---|---|---|
| 1 | Desktop viewport (1280 × 800) | `width` ≥ 768 |
| 2 | Mobile viewport (375 × 667) | `width` < 768 |
| 3 | Resize event fired | `width` and `height` update to new values |

### Edge Test Cases

| # | Test | Expected Result |
|---|---|---|
| 1 | Initial render | Hook reads `window.innerWidth` / `innerHeight` immediately |
| 2 | Component unmounts | `removeEventListener('resize', …)` is called — no memory leak |
| 3 | Exactly 768 px width | Treated as **desktop** (condition is `width < 768`) |

Run the full suite:

```bash
npm test
```

Expected output:

```
✓ src/__tests__/useWindowSize.test.js  (6 tests)
✓ src/__tests__/App.test.jsx           (4 tests)

Test Files  2 passed (2)
     Tests  10 passed (10)
```

---

## Demo Video Checklist

Use this checklist when recording your walkthrough:

- [ ] Show the app running in the browser at a wide (desktop) width.
- [ ] Point out the **size badge** (top-right of navbar) updating live.
- [ ] Slowly drag the window narrower — show the layout switch at 768 px.
- [ ] Show the **Layout Strip** changing from "Desktop Layout" to "Mobile Layout".
- [ ] Show the mobile layout: 2-column card grid, no description text, hamburger icon.
- [ ] Widen the window again — layout switches back to desktop.
- [ ] Open the terminal and run `npm test` — show all 10 tests passing.
- [ ] Open `src/hooks/useWindowSize.js` — walk through `useState`, `useEffect`, `addEventListener`, and the cleanup `return`.

---

## GitHub Submission Note

**Repository:** `yisakor-mirany/use-window-size-streaming-layout`  
**Branch:** `claude/adoring-ptolemy-QeVXz`

Push your final changes with:

```bash
git add .
git commit -m "Complete useWindowSize Streaming Layout assignment"
git push -u origin claude/adoring-ptolemy-QeVXz
```

Then open a Pull Request from that branch into `main` on GitHub.