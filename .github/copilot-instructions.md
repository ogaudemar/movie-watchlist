# Movie Watchlist - AI Coding Agent Instructions

## Project Overview
This is a vanilla JavaScript movie search application that integrates with the OMDB API. It's a single-page application (SPA) with no build process - pure HTML, CSS, and JavaScript.

## Architecture & Data Flow
- **Entry point**: `index.html` loads `index.css` and `index.js`
- **Search flow**: User input → OMDB search API → Movie details API → DOM rendering
- **Two-step API pattern**: First fetch movie IDs by search term, then fetch detailed info for each movie
- **State management**: Global variables (`movieArr`, `htmlArr`) track search results and movie data

## Key Files & Structure
```
index.html     - Single page with search form and results container
index.js       - Main application logic with API calls and DOM manipulation
index.css      - Styling with CSS Grid for search form, flexbox for movie layout
img/          - Static assets (icons, header background)
```

## Critical Implementation Patterns

### API Integration
- **OMDB API Key**: Currently `eba64618` (hardcoded in `index.js`)
- **Two-phase fetch pattern**:
  1. Search endpoint: `/?s=${title}&apikey=${key}&type=movie&page=1`
  2. Details endpoint: `/?i=${movieId}&apikey=${key}`
- **Data transformation**: Raw OMDB response → `movieObj` with specific properties (imdbID, title, poster, rating, runtime, genre, plot)

### DOM Manipulation Strategy
- **Template strings**: HTML generated via string concatenation in `renderHtmlArr()`
- **Global state updates**: Arrays are populated asynchronously then rendered
- **Event handling**: Form submission prevents default and triggers search flow

### CSS Layout Approach
- **Header**: Background image with flexbox layout for logo/nav
- **Search form**: CSS Grid (1fr 120px) for input/button layout
- **Movie cards**: Flexbox with bottom border separators
- **Color scheme**: Dark theme (#0E0E0E background, #2E2E2F accents)

## Development Workflow
- **No build process**: Edit files directly, refresh browser
- **Testing**: Use browser dev tools, check console logs (several `console.log` statements present)
- **Static server**: Serve from project root to handle relative image paths correctly

## Known Issues & Incomplete Features
- **Watchlist functionality**: "Add to Watchlist" button exists in UI but no JavaScript handler
- **Error handling**: No API error handling or loading states
- **Async race conditions**: `renderHtmlArr()` called immediately after async forEach without waiting
- **Image paths**: Hardcoded `/img/` paths may need adjustment based on serving setup

## Code Conventions
- **Function organization**: Search → data fetching → rendering pipeline
- **Naming**: Camelcase for variables/functions, kebab-case for HTML classes
- **DOM queries**: Single `getElementById` calls cached in variables
- **API responses**: Destructured into custom `movieObj` format for consistent rendering

When modifying this codebase, maintain the simple vanilla JS approach and be mindful of the asynchronous data flow timing issues.