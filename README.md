# WorldWise

A React single-page application for tracking your travel adventures around the world. Mark cities you've visited on an interactive map, add notes and dates, and keep a personal log of your journeys.

## Features

- **Interactive World Map** -- Click anywhere on the map to add a new city to your travel log (powered by Leaflet / React-Leaflet)
- **Reverse Geocoding** -- Automatically detects city name, country, and flag from map coordinates via BigDataCloud API
- **City & Country Lists** -- Browse all visited cities or view a summary of countries
- **City Details** -- Each entry stores visit date, personal notes, and a link to the Wikipedia article
- **Geolocation** -- Center the map on your current position with one click
- **Protected Routes** -- Login required to access the app; unauthenticated users are redirected to the homepage

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | React Router 7 |
| State Management | Context API + `useReducer` |
| Maps | Leaflet + React-Leaflet |
| Styling | CSS Modules |
| Build Tool | Vite |
| Mock API | json-server |

## Project Structure

```
src/
  Pages/          # Route-level pages (lazy loaded)
  components/     # Reusable UI components with CSS Modules
  contexts/       # CitiesContext & AuthContext (useReducer)
  hooks/          # useGeolocation, useUrlPosition
  App.jsx         # Root component with route definitions
data/
  cities.json     # Mock database served by json-server
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the mock API server (port 9000)
npm run server

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Demo credentials:** `jack@example.com` / `qwerty`

## Key Patterns

- **Code-splitting** with `React.lazy()` and `Suspense` for route-based lazy loading
- **useReducer** for predictable state updates in both Cities and Auth contexts
- **Custom hooks** (`useGeolocation`, `useUrlPosition`) to encapsulate reusable logic
- **CSS Modules** for component-scoped styling without class name collisions
