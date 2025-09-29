# Detailed Implementation Specifications v2.0
## Multi-Slide Architecture Implementation

This document provides comprehensive implementation details for the enhanced presentation system supporting both **multi-slide parts** and **single slide parts**, with secure postMessage communication and advanced progressive disclosure.

## Implementation Architecture Overview

Based on the successful **Part 1 implementation**, the system now supports:

1. **Multi-slide parts** with individual slide files and sophisticated transitions
2. **Single slide parts** using the legacy approach for simpler presentations
3. **PostMessage communication** for secure cross-origin iframe control
4. **Dynamic slide switching** within parts during progressive disclosure
5. **Comprehensive testing systems** for each part

## Main System Configuration (script.js)

### 1. Enhanced Slide Configuration
The core configuration now supports both types of parts:

```javascript
// In PresentationApp.loadSlideConfiguration()
async loadSlideConfiguration() {
    this.slideConfig = {
        // Multi-slide part (complex)
        1: {
            title: "Парадокс умного незнакомца",
            section: "Введение",
            customSlides: true,
            slides: [
                {
                    file: "presentation/assets/1/slides/1-1-title.html",
                    title: "Титульный слайд",
                    actions: 0
                },
                {
                    file: "presentation/assets/1/slides/1-2-contrast.html",
                    title: "Контрастный слайд",
                    actions: 4
                }
            ]
        },

        // Single slide part (simple)
        2: {
            title: "Тайна чёрного ящика",
            section: "Введение"
            // No customSlides = uses standard loading
        },

        // Additional parts as needed...
        3: { title: "Три шага к пониманию", section: "Введение" },
        4: { title: "Человеческое чтение", section: "Кодирование" },
        5: { title: "Токенизация", section: "Кодирование" },
        6: { title: "Мультимодальность", section: "Кодирование" },
        7: { title: "Механизмы внимания", section: "Кодирование" },
        8: { title: "Слои понимания", section: "Размышление" }
    };

    this.buildNavigationTree();
}
```

### 2. Progressive Disclosure Controller
Enhanced with multi-slide support and postMessage communication:

```javascript
// In ProgressiveDisclosureController class
revealContent(actionIndex) {
    const iframe = document.getElementById('slide-frame');
    if (!iframe) return;

    const currentSlideId = this.app.state.currentSlide;
    const slideConfig = this.app.slideConfig[currentSlideId];

    // Handle multi-slide parts
    if (slideConfig && slideConfig.customSlides) {
        const targetSlide = this.getTargetSlideForAction(slideConfig, actionIndex);

        // Dynamic slide switching
        if (!iframe.src.includes(targetSlide.file)) {
            iframe.src = targetSlide.file;
            iframe.onload = () => {
                setTimeout(() => this.sendRevealMessage(iframe, actionIndex), 100);
            };
            return;
        }
    }

    this.sendRevealMessage(iframe, actionIndex);
}

sendRevealMessage(iframe, actionIndex) {
    // Map global actions to slide-specific actions
    const slideActionIndex = this.calculateSlideActionIndex(actionIndex);

    // PostMessage communication
    try {
        iframe.contentWindow.postMessage({
            type: 'revealSection',
            actionIndex: slideActionIndex
        }, '*');
    } catch (e) {
        // Fallback for legacy slides
        this.fallbackRevealContent(iframe, slideActionIndex);
    }
}
```

## Individual Slide Implementation

### 3. Multi-Slide File Structure
For complex parts requiring multiple slides:

```
presentation/assets/1/
├── slides/
│   ├── 1-1-title.html          # Title slide (actions: 0)
│   ├── 1-2-contrast.html       # Main content (actions: 4)
│   └── 1-3-transition.html     # Optional transition (actions: 1)
├── images/
│   ├── cognitive-parallel.svg  # Shared diagrams
│   └── paradox-icons.png
├── data.json                   # Part metadata
├── navigation.html             # Local test hub
├── test-system.html           # Comprehensive tester
└── index.html                 # Legacy combined (optional)
```

### 4. Individual Slide Template
**Required structure for each slide file:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide [ID]: [Title]</title>
    <style>
        :root {
            --primary-text: #2d3748;
            --accent-color: #667eea;
            --success-color: #00a86b;
            --warning-color: #ff6b6b;
            --transition-normal: 0.3s ease;
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
<body class="slide-content">
    <!-- Progressive disclosure sections -->
    <div class="slide-section" data-action="0">
        <!-- Initial content -->
    </div>

    <div class="slide-section" data-action="1">
        <!-- Action 1 content -->
    </div>

    <script>
        function revealSection(actionIndex) {
            // Slide-specific reveal logic
            for (let i = 0; i <= actionIndex; i++) {
                const elements = document.querySelectorAll(`[data-action="${i}"]`);
                elements.forEach(element => element.classList.add('revealed'));
            }

            for (let i = actionIndex + 1; i <= maxActions; i++) {
                const elements = document.querySelectorAll(`[data-action="${i}"]`);
                elements.forEach(element => element.classList.remove('revealed'));
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
            id: "[slide-id]",
            title: "[Slide Title]",
            maxActions: [number],
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

### 5. Testing System Implementation
**Each part must include a comprehensive test system:**

```html
<!-- test-system.html structure -->
<div class="main-container">
    <div class="sidebar">
        <!-- Slide navigation buttons -->
        <button onclick="loadSlide('slides/1-1-title.html', this)">1.1 Title</button>
        <button onclick="loadSlide('slides/1-2-contrast.html', this)">1.2 Content</button>

        <!-- Action controls -->
        <div class="action-controls" id="actionControls">
            <!-- Dynamically generated action buttons -->
        </div>

        <!-- Navigation controls -->
        <button onclick="nextAction()">Next →</button>
        <button onclick="prevAction()">← Previous</button>
    </div>

    <div class="content-area">
        <iframe id="slideFrame" class="slide-frame" src="slides/1-1-title.html"></iframe>
    </div>
</div>
```

## Implementation Workflow

### 6. Development Process for New Parts

#### Step 1: Determine Part Type
**Multi-slide (complex)**: Use when you need:
- Multiple distinct slides within one part
- Sophisticated transitions between concepts
- Different visual layouts for different concepts

**Single slide (simple)**: Use when you have:
- Straightforward progressive disclosure
- Consistent visual layout throughout
- Simple step-by-step revelation

#### Step 2: Create Directory Structure
```bash
# For multi-slide parts
mkdir -p presentation/assets/[partId]/slides
mkdir -p presentation/assets/[partId]/images

# For single slide parts
mkdir -p presentation/assets/[partId]
mkdir -p presentation/assets/[partId]/images
```

#### Step 3: Update Main System Configuration
Add to `script.js` slideConfig:

```javascript
// Multi-slide configuration
[partId]: {
    title: "[Part Title]",
    section: "[Section Name]",
    customSlides: true,
    slides: [
        {
            file: "presentation/assets/[partId]/slides/[partId]-1-[name].html",
            title: "[Slide Title]",
            actions: [number]
        },
        {
            file: "presentation/assets/[partId]/slides/[partId]-2-[name].html",
            title: "[Slide Title]",
            actions: [number]
        }
    ]
}

// OR Single slide configuration
[partId]: {
    title: "[Part Title]",
    section: "[Section Name]"
}
```

#### Step 4: Implement Progressive Disclosure Logic
For multi-slide parts, add action mapping logic to `ProgressiveDisclosureController`:

```javascript
getTargetSlideForAction(slideConfig, actionIndex) {
    // Example for Part [X]
    if (actionIndex === 0) {
        return slideConfig.slides[0]; // First slide
    } else if (actionIndex <= 3) {
        return slideConfig.slides[1]; // Second slide
    } else {
        return slideConfig.slides[2]; // Third slide
    }
}

getSlideActionIndex(slideConfig, globalActionIndex, targetSlide) {
    // Map global actions to slide-specific actions
    if (targetSlide === slideConfig.slides[0]) {
        return 0;
    } else if (targetSlide === slideConfig.slides[1]) {
        return Math.max(0, globalActionIndex - 1);
    } else {
        return Math.max(0, globalActionIndex - 4);
    }
}
```

### 7. Quality Assurance Checklist

#### Technical Requirements
- [ ] **PostMessage communication** implemented in all slide files
- [ ] **Progressive disclosure** working with proper action mapping
- [ ] **Slide metadata** exposed via `window.slideMetadata`
- [ ] **Console logging** clear and helpful for debugging
- [ ] **Cross-origin security** handled properly
- [ ] **Fallback mechanisms** for legacy slide support

#### Testing Requirements
- [ ] **Local test system** (`test-system.html`) functional
- [ ] **Navigation hub** (`navigation.html`) with all links
- [ ] **Individual slide testing** works independently
- [ ] **Main system integration** works with continue button
- [ ] **Action progression** follows expected sequence
- [ ] **Error handling** graceful when slides fail to load

#### Content Requirements
- [ ] **Visual consistency** with established design system
- [ ] **Responsive design** works on different screen sizes
- [ ] **Accessibility** considerations for screen readers
- [ ] **Performance** - slides load quickly and smoothly
- [ ] **Browser compatibility** tested in major browsers

### 8. Deployment Process

#### Local Development
1. **Start dev server**: `python dev-server.py`
2. **Test part navigation**: `http://localhost:8000/presentation/assets/[partId]/navigation.html`
3. **Test main system**: `http://localhost:8000`
4. **Verify console logs** for proper communication

#### Production Deployment
1. **Validate all links** are relative and working
2. **Check image assets** are properly referenced
3. **Test responsive design** on multiple devices
4. **Verify HTTPS compatibility** for postMessage security
5. **Performance audit** for loading times

This implementation provides a robust, scalable system supporting both simple and complex slide presentations with secure communication and comprehensive testing capabilities.