# Refactored Configuration System: Single Source of Truth

## Problem Analysis

**Current Issues in script.js:**
- Hardcoded slide details (lines 284-335)
- Duplicate action numbers in multiple places
- File paths hardcoded in JavaScript
- Action mapping logic hardcoded for each part (lines 1331-1386)
- No single source of truth for slide metadata

**Hardcoded Details to Extract:**
```javascript
// FROM script.js lines 284-335
1: {
    title: "Парадокс умного незнакомца",
    section: "Введение",
    customSlides: true,
    slides: [
        {
            file: "presentation/assets/1/slides/1-1-title.html",
            title: "Титульный слайд",
            actions: 0  // ← HARDCODED
        },
        {
            file: "presentation/assets/1/slides/1-2-contrast.html",
            title: "Контрастный слайд",
            actions: 4  // ← HARDCODED
        }
    ]
}
```

## Solution Design

### 1. Dynamic Configuration Loading

**New loadSlideConfiguration() Method:**
```javascript
async loadSlideConfiguration() {
    this.slideConfig = {};

    // Auto-detect available parts by scanning assets directory
    const availableParts = await this.detectAvailableParts();

    for (const partId of availableParts) {
        try {
            const dataPath = `presentation/assets/${partId}/data.json`;
            const response = await fetch(dataPath);

            if (response.ok) {
                const partData = await response.json();
                this.slideConfig[partId] = this.transformDataToConfig(partData);
            } else {
                // Fallback to basic config for parts without data.json
                this.slideConfig[partId] = this.createFallbackConfig(partId);
            }
        } catch (error) {
            console.warn(`Failed to load config for part ${partId}:`, error);
            this.slideConfig[partId] = this.createFallbackConfig(partId);
        }
    }

    this.buildNavigationTree();
}
```

### 2. Data Transformation

**Transform data.json to slideConfig format:**
```javascript
transformDataToConfig(partData) {
    // Handle different data.json formats (Part 1 vs Part 2 structure)
    const isNewFormat = partData.part && partData.slides;

    if (isNewFormat) {
        // Part 2 format
        return {
            title: partData.part.title,
            section: partData.part.section,
            customSlides: partData.part.customSlides,
            slides: partData.slides.map(slide => ({
                file: `presentation/assets/${partData.part.id}/${slide.file}`,
                title: slide.title,
                actions: slide.maxActions,
                duration: slide.duration,
                type: slide.type
            }))
        };
    } else {
        // Part 1 format
        return {
            title: partData.partTitle,
            section: "Введение", // Could be extracted from partData if added
            customSlides: partData.structure === "multi-slide",
            slides: partData.slides.map(slide => ({
                file: `presentation/assets/${partData.partId}/${slide.file}`,
                title: slide.title,
                actions: slide.maxActions,
                duration: slide.duration,
                type: slide.type
            }))
        };
    }
}
```

### 3. Auto-Detection of Available Parts

**Detect parts without hardcoding:**
```javascript
async detectAvailableParts() {
    const availableParts = [];

    // Try parts 1-10 (reasonable limit)
    for (let i = 1; i <= 10; i++) {
        try {
            // Check if data.json exists
            const dataResponse = await fetch(`presentation/assets/${i}/data.json`);
            if (dataResponse.ok) {
                availableParts.push(i);
                continue;
            }

            // Fallback: check if directory has any content
            const indexResponse = await fetch(`presentation/assets/${i}/index.html`);
            if (indexResponse.ok) {
                availableParts.push(i);
            }
        } catch (error) {
            // Part doesn't exist, continue
            console.log(`Part ${i} not found, skipping`);
        }
    }

    return availableParts;
}
```

### 4. Fallback Configuration

**For parts without data.json:**
```javascript
createFallbackConfig(partId) {
    return {
        title: `Part ${partId}`,
        section: "Unknown",
        customSlides: false,
        // Will use legacy loading system
    };
}
```

### 5. Dynamic Action Mapping

**Replace hardcoded action mapping with data-driven approach:**
```javascript
getTargetSlideForAction(slideConfig, actionIndex) {
    if (!slideConfig.slides) return null;

    let cumulativeActions = 0;

    for (const slide of slideConfig.slides) {
        const slideActionCount = slide.actions + 1; // +1 for initial state

        if (actionIndex < cumulativeActions + slideActionCount) {
            return slide;
        }

        cumulativeActions += slideActionCount;
    }

    // Default to last slide
    return slideConfig.slides[slideConfig.slides.length - 1];
}

getSlideActionIndex(slideConfig, globalActionIndex, targetSlide) {
    if (!slideConfig.slides) return globalActionIndex;

    let cumulativeActions = 0;

    for (const slide of slideConfig.slides) {
        const slideActionCount = slide.actions + 1;

        if (slide === targetSlide) {
            // Return the local action index within this slide
            return Math.max(0, globalActionIndex - cumulativeActions);
        }

        cumulativeActions += slideActionCount;
    }

    return 0; // Fallback
}
```

## Implementation Benefits

### ✅ Single Source of Truth
- **One place to update:** Only `data.json` files need modification
- **No JavaScript changes:** Adding slides only requires updating JSON
- **Consistent metadata:** All slide information in structured format

### ✅ Simplified Development
- **Auto-detection:** New parts automatically discovered
- **Fallback support:** Works with and without data.json
- **Version compatibility:** Handles different data.json formats

### ✅ Reduced Maintenance
- **No hardcoded arrays:** Action mapping calculated dynamically
- **Scalable:** Works with any number of slides per part
- **Error resilient:** Graceful degradation when files missing

## Updated data.json Schema

### Standardized Format (for all new parts):
```json
{
  "part": {
    "id": 3,
    "title": "Три шага к пониманию",
    "section": "Введение",
    "customSlides": true
  },
  "slides": [
    {
      "id": "3-1",
      "file": "slides/3-1-overview.html",
      "title": "Обзор трёх шагов",
      "type": "content",
      "maxActions": 2,
      "duration": 90
    }
  ],
  "metadata": {
    "version": "1.0",
    "created": "2025-01-29"
  }
}
```

## Migration Strategy

### Phase 1: Implement Dynamic Loading
1. Add new configuration loading methods
2. Keep hardcoded config as fallback
3. Test with existing Parts 1 & 2

### Phase 2: Standardize data.json
1. Ensure all parts have data.json files
2. Standardize schema across all parts
3. Remove hardcoded configurations

### Phase 3: Remove Legacy Code
1. Remove hardcoded slideConfig
2. Remove hardcoded action mapping
3. Clean up unused methods

## Developer Experience

### Before (3 places to update):
1. Update `script.js` slideConfig
2. Update `script.js` action mapping
3. Update slide files themselves

### After (1 place to update):
1. Update `data.json` file only

**Result:** 3x faster development, zero JavaScript expertise required for adding content.