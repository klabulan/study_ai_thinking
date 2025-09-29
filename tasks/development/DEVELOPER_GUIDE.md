# Developer Guide: Presentation Content Standards

## Overview
Maintain consistency in presentation content creation using established patterns from core implementation.

## Content Structure Standards

### 1. Directory Layout
```
presentation/assets/[PART_ID]/
├── slides/                    # Individual HTML slides (multi-slide parts)
│   ├── [PART_ID]-1-[name].html
│   ├── [PART_ID]-2-[name].html
│   └── ...
├── images/                    # Visual assets
├── data.json                  # Part metadata
├── test-system.html          # Testing interface
└── navigation.html           # Local navigation

presentation/[PART_ID]/       # Text content
├── extended_analysis.md
├── speech_notes.md
├── slide_design.md
└── sources_reference.md
```

### 2. Slide Types Decision Matrix

**Multi-slide (complex parts):**
- Multiple distinct visual layouts needed
- Sophisticated transitions between concepts
- Different slide types (title, content, transition)

**Single slide (simple parts):**
- Consistent visual layout throughout
- Simple progressive disclosure
- Straightforward step-by-step revelation

## Single Source of Truth: data.json

### 3. NO JavaScript Configuration Required

⚠️ **IMPORTANT**: Do NOT add anything to `script.js` slideConfig. All configuration is now loaded dynamically from `data.json` files.

### 4. data.json Configuration (ONLY place to update)

**Create `presentation/assets/[PART_ID]/data.json`:**
```json
{
  "part": {
    "id": [PART_ID],
    "title": "[Part Title in Russian]",
    "section": "[Section Name]",
    "customSlides": true
  },
  "slides": [
    {
      "id": "[PART_ID]-1",
      "file": "slides/[PART_ID]-1-[name].html",
      "title": "[Slide Title]",
      "type": "content",
      "maxActions": [NUMBER],
      "duration": [SECONDS]
    }
  ],
  "metadata": {
    "version": "1.0",
    "created": "[DATE]"
  }
}
```

**Action mapping is calculated automatically from data.json - no manual configuration needed.**

### 5. Individual Slide Template

**Required structure for each slide file:**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Slide [PART_ID].[SLIDE_NUMBER]: [Title]</title>
    <style>
        :root {
            --primary-text: #2d3748;
            --accent-color: #667eea;
            --success-color: #00a86b;
            --warning-color: #ff6b6b;
            --transition-normal: 0.5s ease;

            /* Balanced font sizes for readability (Updated Jan 2025) */
            --font-size-sm: 1rem;        /* 16px - detail text */
            --font-size-base: 1.125rem;  /* 18px - body content */
            --font-size-lg: 1.375rem;    /* 22px - emphasis */
            --font-size-xl: 1.625rem;    /* 26px - headers */
            --font-size-2xl: 2rem;       /* 32px - subtitles */
            --font-size-3xl: 2.5rem;     /* 40px - major headers */
            --font-size-4xl: 3rem;       /* 48px - max title size */
            /* AVOID sizes above 3rem for web readability */
        }

        .slide-section {
            opacity: 0;
            transform: translateY(20px);
            transition: all var(--transition-normal);
        }

        .slide-section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    <div class="slide-section" data-action="0">
        <!-- Initial content -->
    </div>

    <div class="slide-section" data-action="1">
        <!-- Action 1 content -->
    </div>

    <script>
        let maxActions = [NUMBER];

        function revealSection(actionIndex) {
            for (let i = 0; i <= actionIndex; i++) {
                document.querySelectorAll(`[data-action="${i}"]`)
                    .forEach(el => el.classList.add('revealed'));
            }
            for (let i = actionIndex + 1; i <= maxActions; i++) {
                document.querySelectorAll(`[data-action="${i}"]`)
                    .forEach(el => el.classList.remove('revealed'));
            }
        }

        // PostMessage listener (REQUIRED)
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'revealSection') {
                revealSection(event.data.actionIndex);
            }
        });

        // External control (REQUIRED)
        window.revealSection = revealSection;

        // Metadata (REQUIRED)
        window.slideMetadata = {
            id: "[SLIDE_ID]",
            title: "[Slide Title]",
            maxActions: maxActions,
            type: "[title|content|transition]"
        };

        // Auto-reveal initial content
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => revealSection(0), 300);
        });
    </script>
</body>
</html>
```

## Quality Standards

### 6. Technical Requirements Checklist
- [ ] PostMessage communication implemented
- [ ] Progressive disclosure working
- [ ] Slide metadata exposed via `window.slideMetadata`
- [ ] Action mapping configured in main system
- [ ] Test system functional

### 7. Content Requirements Checklist
- [ ] Visual consistency with design system
- [ ] Responsive design for different screen sizes
- [ ] Performance - slides load quickly
- [ ] Browser compatibility tested

### 8. Testing Requirements Checklist
- [ ] Local test system works (`test-system.html`)
- [ ] Navigation hub functional (`navigation.html`)
- [ ] Individual slides test independently
- [ ] Main system integration works
- [ ] Action progression follows expected sequence

## Development Workflow

### 9. Step-by-Step Process (SIMPLIFIED)

1. **Determine Part Type** - Multi-slide or single slide based on complexity
2. **Create Directory Structure** - Follow template structure exactly
3. **Create data.json** - ONLY file that needs configuration
4. **Implement Slides** - Use templates with PostMessage support
5. **Test Locally** - Use test-system.html for validation
6. **Verify Auto-Detection** - Main system will discover part automatically
7. **Quality Check** - Complete all checklists

**Key Change**: No JavaScript editing required. Parts are auto-detected and configured from data.json.

### 10. Common Patterns

**CSS Variables (always use):**
```css
:root {
    --primary-text: #2d3748;
    --accent-color: #667eea;
    --success-color: #00a86b;
    --warning-color: #ff6b6b;
    --transition-normal: 0.5s ease;
}
```

**Progressive Disclosure Pattern:**
```html
<div class="slide-section" data-action="0">Base content</div>
<div class="slide-section" data-action="1">Additional content</div>
```

**PostMessage Communication:**
```javascript
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'revealSection') {
        revealSection(event.data.actionIndex);
    }
});
```

## File References

**Detailed Templates:** See `standardized-part-template.md` for complete examples
**Implementation Details:** See `detailed-implementation.md` for technical specs
**Rendering System:** See `slide-rendering-system.md` for advanced integration
**Design Patterns:** See `presentation-site-design.md` for simplified approach

## Quick Start

1. Copy template from `standardized-part-template.md`
2. Replace `[PART_ID]`, `[SLIDE_ID]`, `[NUMBER]` placeholders
3. **Create data.json with slide metadata (ONLY configuration needed)**
4. Test with local test system
5. Verify main system integration

**No script.js editing required** - parts are auto-detected from data.json files.

## Configuration Migration

**Old Way (deprecated):** Edit script.js slideConfig + action mapping
**New Way:** Create/edit data.json file only

**Benefits:**
- ✅ Single source of truth
- ✅ No JavaScript expertise required
- ✅ Auto-detection of new parts
- ✅ 3x faster development

Keep it simple, follow patterns, test thoroughly.

## Font Sizing Updates (January 2025)

**Issue Resolved**: Custom slide files had oversized fonts (5-6rem) causing poor web viewing experience.

**Changes Made**:
- Updated all slide HTML files to use balanced font scales (1rem - 3rem)
- Added smart style injection detection in `script.js`
- Separated web navigation fonts from slide content fonts
- Custom slides now load directly without style injection interference

**Current Best Practice**:
```css
/* Use these balanced font sizes in new slides */
.slide-title { font-size: 3rem; }      /* Maximum for titles */
.section-header { font-size: 2rem; }   /* Section headers */
.content-text { font-size: 1.125rem; } /* Body content */
.detail-text { font-size: 1rem; }      /* Descriptions */
```

**Migration Guide**:
- Existing custom slides: Already updated
- New slides: Use font variables from template above
- Auto-generated slides: Use minimal baseline styling only