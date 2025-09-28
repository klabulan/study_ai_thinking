# Simplified Static Presentation Site Design

## Overview
Minimal static site for presenting "Парадокс Умного Незнакомца" with GitHub Pages compatibility.

## Complete Requirements Analysis & Implementation

### User Requirements Breakdown

**📋 Core Functional Requirements:**
- ✅ **Main page opens by direct link** - Single HTML file, GitHub Pages compatible
- ✅ **Navigation tree as left sidebar** - Slides grouped by sections/folders
- ✅ **Main area with selected page content** - Dynamic slide content display
- ✅ **Forward/back controls like PowerPoint** - Space/arrows trigger predefined actions
- ✅ **Text area under main with markdown tabs** - Analysis/Speech/Design/Sources
- ✅ **Fullscreen extension for presentation** - F5 toggle, optimized for projection
- ✅ **PowerPoint-style hotkeys** - Complete keyboard navigation support
- ✅ **No additional servers/services** - Pure static site deployment
- ✅ **Simple JS without build process** - Native ES6, no compilation needed
- ✅ **Common CSS styles** - Grid layout, standard responsive patterns

**📁 Content Integration Requirements:**
- ✅ **Pages in presentation/assets dir** - Visual slide content from `presentation/assets/[1-8]/`
- ✅ **Text content in presentation folders** - Markdown files from `presentation/[1-8]/` structure
- ✅ **Dual content mapping** - Assets for visuals, text folders for analysis/speech notes
- ✅ **Support for extended_analysis.md** - Primary content tab from text folders
- ✅ **Support for speech_notes.md** - Speaker notes with action markers from text folders
- ✅ **Support for slide_design.md** - Visual specifications from text folders
- ✅ **Support for sources_reference.md** - Research references from text folders

**🎨 UX Requirements (Architect Level):**
- ✅ **Best presentation software practices** - Progressive disclosure, smooth navigation
- ✅ **Optimal reading experience** - Clear typography, proper spacing
- ✅ **Professional presentation delivery** - Fullscreen mode, presenter controls
- ✅ **Intuitive navigation patterns** - Familiar hotkeys, visual feedback

## Simplified Architecture

### File Structure (Updated - Repository Root)
```
AI_world_encode_think_generate/
├── index.html                    # Main presentation application
├── style.css                     # All presentation styles
├── script.js                     # All presentation JavaScript
├── presentation/
│   ├── assets/                   # Slide content pages
│   │   ├── 1/                    # Slide 1 folder
│   │   ├── 2/                    # Slide 2 folder
│   │   └── .../                  # Additional slides
│   ├── 1/                        # Text content for slide 1
│   │   ├── extended_analysis.md
│   │   ├── speech_notes.md
│   │   ├── slide_design.md
│   │   └── sources_reference.md
│   ├── 2/                        # Text content for slide 2
│   └── .../                      # Additional text content
├── research/                     # Existing research materials
├── tasks/                        # Development documentation
└── CLAUDE.md                     # Project configuration
```

### Three Essential Components

**1. Navigation Sidebar (20% width)**
```
📁 Введение (1-3)
├─ 1. Парадокс незнакомца
├─ 2. Тайна чёрного ящика
└─ 3. Три шага к пониманию

📁 Кодирование (4-7)
├─ 4. Человеческое чтение
├─ 5. Токенизация
├─ 6. Мультимодальность
└─ 7. Механизмы внимания
```

**2. Main Slide Area (80% width)**
- **Content Display**: Rendered markdown from current slide folder
- **Action Progress**: `●●●○○ (3/5)` with descriptive text "Next: Click to reveal business metrics"
- **Navigation Controls**:
  - Visual: `← [Space/Click] →` buttons
  - Keyboard: Space/arrows for actions, Page Up/Down for slides
  - Mouse: Click anywhere on slide to advance actions
- **Presentation Mode**: Expands to fullscreen, hides sidebar (hover to reveal)
- **Progressive Disclosure**: Content reveals based on `[СЛАЙД]` markers in speech notes
- **Loading States**: Skeleton/spinner while fetching content

**3. Content Tabs (Bottom panel)**
- Analysis | Speech Notes | Design | Sources
- Collapsible (toggle with Tab key)

## Essential Features Only

### Navigation System
```javascript
// Simple slide navigation
const slides = [1, 2, 3, 4, 5, 6, 7, 8]; // Auto-detected
let currentSlide = 1;
let currentAction = 0;

function nextAction() {
  if (currentAction < getMaxActions(currentSlide)) {
    currentAction++;
    revealContent(currentSlide, currentAction);
  } else {
    nextSlide();
  }
}
```

### Hotkeys (Essential Only)
- `Space/→` - Next action/slide
- `Backspace/←` - Previous action/slide
- `F5` - Toggle fullscreen
- `Tab` - Toggle content tabs
- `Home/End` - First/last slide

### Content Loading (Updated Paths)
```javascript
// Load content from dual structure: assets for pages, text folders for markdown
async function loadSlide(slideId) {
  const textBasePath = `presentation/${slideId}/`;      // Markdown files
  const assetsBasePath = `presentation/assets/${slideId}/`; // Page assets

  return {
    // Text content from presentation/[id]/ folders
    analysis: await fetch(`${textBasePath}extended_analysis.md`).then(r => r.text()),
    speech: await fetch(`${textBasePath}speech_notes.md`).then(r => r.text()),
    design: await fetch(`${textBasePath}slide_design.md`).then(r => r.text()),
    sources: await fetch(`${textBasePath}sources_reference.md`).then(r => r.text()),

    // Page assets from presentation/assets/[id]/ folders (future use)
    assetsPath: assetsBasePath
  };
}
```

## Minimal Visual Design

### Layout (CSS Grid)
```css
.app {
  display: grid;
  grid-template: "sidebar main" 1fr
                 "sidebar tabs" 200px / 300px 1fr;
  height: 100vh;
}

.fullscreen .app {
  grid-template: "main" 1fr / 1fr;
}
```

### Russian-Optimized Typography
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
```

### Color System (4 colors only)
```css
:root {
  --primary: #4a5568;    /* Text */
  --accent: #667eea;     /* Links/highlights */
  --success: #00a86b;    /* Progress */
  --bg: #f7fafc;         /* Background */
}
```

## Progressive Disclosure System

### Action Detection
Parse speech notes for markers:
- `[CLICK]` - Clickable reveal
- `[NEXT]` - Auto-advance point
- Count as total actions per slide

### Visual Progress
```
Current: ●●●○○ (3/5)
Next: Click to reveal metrics
```

## Implementation Priorities

### Phase 1: Core (2-3 hours)
1. Basic HTML structure with grid layout
2. Slide navigation (prev/next)
3. Markdown rendering with simple parser
4. Content loading from presentation folder

### Phase 2: Interaction (1-2 hours)
1. Progressive disclosure system
2. Hotkey support
3. Fullscreen toggle
4. Progress tracking

### Phase 3: Polish (1 hour)
1. Loading states
2. Error handling
3. Mobile responsiveness
4. Smooth transitions

## Technical Dependencies

**Zero Build Process:**
- Native ES6 modules
- CSS Grid (no framework)
- Fetch API (no axios)
- Simple markdown parser (or just innerHTML)

**Single External Dependency (optional):**
- `marked.js` for markdown rendering (can use innerHTML as fallback)

## File Size Target
- HTML: < 5KB
- CSS: < 10KB
- JS: < 15KB
- Total: < 30KB (excluding content)

## Browser Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile: iOS 14+, Android 10+

---

This simplified design maintains all required functionality while being implementable in a single afternoon with minimal dependencies and maximum compatibility.