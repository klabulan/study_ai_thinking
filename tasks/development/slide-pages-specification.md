# Slide Pages Content Specification v2.0
## Multi-Slide Architecture with PostMessage Communication

## Overview
This document defines the **updated requirements, structure, and specifications** for slide page content stored in `presentation/assets/[1-8]/` folders. Based on the successful implementation of **Part 1**, this specification covers the **multi-slide approach** with secure cross-origin communication using postMessage API.

## Content Requirements

### Multi-Slide Page Structure
Each part can contain **multiple individual slides** for complex presentations, supporting both simple and sophisticated slide transitions.

```
presentation/assets/
├── 1/                              # Part 1: Парадокс умного незнакомца
│   ├── slides/                     # Multi-slide structure
│   │   ├── 1-1-title.html         # Individual slide files
│   │   ├── 1-2-contrast.html      # Each with own logic
│   │   └── 1-3-transition.html    # Optional additional slides
│   ├── images/                     # Shared visual assets
│   │   ├── cognitive-parallel.svg
│   │   └── paradox-diagram.png
│   ├── data.json                   # Part metadata with slide configuration
│   ├── navigation.html             # Local test navigation
│   ├── test-system.html           # Comprehensive test system
│   └── index.html                  # Legacy combined version (optional)
├── 2/                              # Part 2: Simple single slide
│   ├── index.html                  # Direct slide content
│   ├── images/
│   └── data.json
└── .../
```

### Slide Content Format Standards

#### Configuration Types

**Type 1: Multi-Slide Parts (Complex)**
For parts requiring multiple slides and sophisticated transitions:

```javascript
// In script.js slideConfig
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
}
```

**Type 2: Single Slide Parts (Simple)**
For straightforward presentations:

```javascript
// In script.js slideConfig
2: {
    title: "Тайна чёрного ящика",
    section: "Введение"
    // No customSlides property = uses standard loading
}
```

#### Individual Slide Template
Each slide file must implement **postMessage communication** and **progressive disclosure**:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide [ID]: [Title]</title>
    <style>
        /* Embedded styles with CSS variables */
        :root {
            --primary-text: #2d3748;
            --secondary-text: #718096;
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
        <!-- Initial content visible on slide load -->
    </div>

    <div class="slide-section" data-action="1">
        <!-- Content revealed on first action -->
    </div>

    <div class="slide-section" data-action="2">
        <!-- Content revealed on second action -->
    </div>

    <script>
        // Progressive disclosure logic
        function revealSection(actionIndex) {
            console.log(`Slide revealing action: ${actionIndex}`);

            // Implementation varies by slide type
            // See examples below
        }

        // PostMessage communication (REQUIRED)
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'revealSection') {
                console.log('Slide received postMessage:', event.data);
                revealSection(event.data.actionIndex);
            }
        });

        // Global function for external control (REQUIRED)
        window.revealSection = revealSection;

        // Slide metadata (REQUIRED)
        window.slideMetadata = {
            id: "[slide-id]",
            title: "[Slide Title]",
            maxActions: [number],
            type: "[title|content|transition]"
        };

        // Auto-reveal initial content
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => revealSection(0), 300);
        });
    </script>
</body>
</html>
```

## Content Integration Requirements

### Main System Integration (script.js)

#### 1. Slide Configuration
The main system loads slide configurations in `loadSlideConfiguration()`:

```javascript
async loadSlideConfiguration() {
    this.slideConfig = {
        1: {
            title: "Парадокс умного незнакомца",
            section: "Введение",
            customSlides: true,  // Enables multi-slide mode
            slides: [
                {
                    file: "presentation/assets/1/slides/1-1-title.html",
                    title: "Титульный слайд",
                    actions: 0  // Number of actions this slide supports
                },
                {
                    file: "presentation/assets/1/slides/1-2-contrast.html",
                    title: "Контрастный слайд",
                    actions: 4
                }
            ]
        },
        2: {
            title: "Standard Slide",
            section: "Section"
            // No customSlides = uses legacy loading
        }
    };
}
```

#### 2. Content Loading Strategy
Enhanced `loadSlideContent()` with multi-slide support:

```javascript
async loadSlideContent(slideId) {
    if (this.slides[slideId]) {
        return this.slides[slideId];
    }

    const config = this.slideConfig[slideId];
    const content = {};
    const isFileProtocol = window.location.protocol === 'file:';

    // Handle custom slides (multi-slide parts)
    if (config && config.customSlides) {
        console.log('Loading custom slides for slide', slideId);

        // Use first slide as default
        const firstSlide = config.slides[0];
        content.visual = firstSlide.file;
        content.hasVisual = true;

        // Calculate total actions across all slides
        content.maxActions = config.slides.reduce((total, slide) => total + slide.actions, 0) + 1;
        content.customSlides = config.slides;

        // Load markdown content for tabs
        await this.loadMarkdownContent(content, slideId, isFileProtocol);

        this.slides[slideId] = content;
        return content;
    }

    // Standard single slide loading (legacy)
    await this.loadMarkdownContent(content, slideId, isFileProtocol);

    // Load visual content
    const visualPath = `presentation/assets/${slideId}/index.html`;
    // ... rest of standard loading logic

    return content;
}
```

### Progressive Disclosure Integration

#### 3. PostMessage Communication System
The main system uses **postMessage** instead of direct iframe access for security:

```javascript
// In ProgressiveDisclosureController class
revealContent(actionIndex) {
    const iframe = document.getElementById('slide-frame');
    if (!iframe) return;

    console.log('Revealing content for action:', actionIndex);

    // For custom slides, check if we need to switch slides
    const currentSlideId = this.app.state.currentSlide;
    const slideConfig = this.app.slideConfig[currentSlideId];

    if (slideConfig && slideConfig.customSlides) {
        // Determine which slide should be shown
        const targetSlide = this.getTargetSlideForAction(slideConfig, actionIndex);
        const currentSrc = iframe.src;

        // Switch slides if needed
        if (!currentSrc.includes(targetSlide.file)) {
            console.log('Switching to slide:', targetSlide.file);
            iframe.src = targetSlide.file;

            iframe.onload = () => {
                setTimeout(() => {
                    this.sendRevealMessage(iframe, actionIndex);
                }, 100);
            };
            return;
        }
    }

    this.sendRevealMessage(iframe, actionIndex);
}

sendRevealMessage(iframe, actionIndex) {
    const currentSlideId = this.app.state.currentSlide;
    const slideConfig = this.app.slideConfig[currentSlideId];
    let slideActionIndex = actionIndex;

    // Map global actions to slide-specific actions
    if (slideConfig && slideConfig.customSlides) {
        const targetSlide = this.getTargetSlideForAction(slideConfig, actionIndex);
        slideActionIndex = this.getSlideActionIndex(slideConfig, actionIndex, targetSlide);
    }

    // Send postMessage to iframe
    try {
        iframe.contentWindow.postMessage({
            type: 'revealSection',
            actionIndex: slideActionIndex
        }, '*');
        console.log('Sent postMessage revealSection with action:', slideActionIndex);
    } catch (e) {
        console.log('Could not send postMessage:', e.message);
        // Fallback to direct DOM manipulation for legacy slides
        this.fallbackRevealContent(iframe, slideActionIndex);
    }
}

getTargetSlideForAction(slideConfig, actionIndex) {
    // Example for Part 1: action 0 = title, actions 1+ = contrast
    if (actionIndex === 0) {
        return slideConfig.slides[0];
    } else {
        return slideConfig.slides[1];
    }
}

getSlideActionIndex(slideConfig, globalActionIndex, targetSlide) {
    // Map global action to slide-specific action
    if (targetSlide === slideConfig.slides[0]) {
        return 0; // Title slide always action 0
    } else {
        return Math.max(0, globalActionIndex - 1); // Contrast slide maps 1→0, 2→1, etc.
    }
}
```

## Visual Design Standards

### Consistent Styling System

**Global CSS Variables (style.css):**
```css
:root {
    /* Presentation Colors */
    --primary-text: #2d3748;
    --secondary-text: #718096;
    --accent-color: #667eea;
    --success-color: #00a86b;
    --warning-color: #ff6b6b;
    --background: #ffffff;
    --background-secondary: #f7fafc;
    --border-color: #e2e8f0;

    /* Typography */
    --font-family-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;

    /* Animation */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

**Slide-Specific Styling Template:**
```css
/* Template for slide content styling */
.slide-content {
    font-family: var(--font-family-main);
    color: var(--primary-text);
    line-height: 1.6;
    padding: var(--spacing-xl);
    max-width: 100%;
    box-sizing: border-box;
}

.slide-section {
    transition: all var(--transition-normal);
    opacity: 0;
    transform: translateY(20px);
    margin-bottom: var(--spacing-lg);
}

.slide-section.revealed {
    opacity: 1;
    transform: translateY(0);
}

.slide-title {
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: var(--spacing-lg);
    line-height: 1.2;
}

.slide-subtitle {
    font-size: 1.25rem;
    color: var(--secondary-text);
    margin-bottom: var(--spacing-xl);
}

.highlight {
    background: rgba(102, 126, 234, 0.1);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
    color: var(--accent-color);
    font-weight: 500;
}

.business-metric {
    background: rgba(0, 168, 107, 0.1);
    border-left: 4px solid var(--success-color);
    padding: var(--spacing-md);
    margin: var(--spacing-md) 0;
    border-radius: 0 4px 4px 0;
}

.tech-concept {
    background: rgba(255, 107, 107, 0.05);
    border: 1px solid rgba(255, 107, 107, 0.2);
    padding: var(--spacing-md);
    border-radius: 8px;
    margin: var(--spacing-md) 0;
}

.diagram-container {
    text-align: center;
    margin: var(--spacing-xl) 0;
}

.diagram-container svg,
.diagram-container img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Main Window Integration

**IFrame Rendering System:**
```html
<!-- Main presentation window structure -->
<div class="main-content">
    <div class="slide-header">
        <h1 class="slide-title-main">Slide [Number]: [Title]</h1>
        <div class="progress-container">
            <div class="progress-dots"></div>
            <div class="progress-text"></div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    </div>

    <div class="slide-display">
        <iframe
            id="slide-frame"
            src="presentation/assets/1/index.html"
            frameborder="0"
            scrolling="no"
            class="slide-iframe">
        </iframe>
    </div>

    <div class="slide-controls">
        <button onclick="prevAction()" class="nav-btn">← Previous</button>
        <button onclick="nextAction()" class="nav-btn primary">Next →</button>
    </div>
</div>
```

**IFrame Styling:**
```css
.slide-iframe {
    width: 100%;
    height: 70vh;
    border: none;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.slide-display {
    margin: var(--spacing-lg) 0;
    background: var(--background-secondary);
    padding: var(--spacing-md);
    border-radius: 12px;
}
```

## Content Creation Guidelines

### Slide Content Best Practices

**1. Progressive Disclosure Structure:**
```html
<!-- Example: Slide 1 - Парадокс умного незнакомца -->
<div class="slide-section" data-action="0">
    <h1 class="slide-title">Парадокс Умного Незнакомца</h1>
    <p class="slide-subtitle">Как ИИ понимает, думает и отвечает</p>
</div>

<div class="slide-section" data-action="1">
    <div class="business-metric">
        <h3>Реальность ИИ сегодня</h3>
        <ul>
            <li><span class="highlight">Tinkoff</span>: 95% кредитных решений за 2 минуты</li>
            <li><span class="highlight">Sber</span>: 50M клиентских взаимодействий в год</li>
            <li><span class="highlight">Яндекс</span>: 1B переводов ежедневно</li>
        </ul>
    </div>
</div>

<div class="slide-section" data-action="2">
    <div class="tech-concept">
        <h3>Но как это работает?</h3>
        <p>Большинство пользователей взаимодействуют с ИИ как с <em>"чёрным ящиком"</em></p>
        <img src="images/black-box-diagram.svg" alt="AI Black Box Concept" />
    </div>
</div>
```

**2. Visual Hierarchy:**
- Use consistent heading levels (h1 for slide title, h2 for major sections, h3 for subsections)
- Apply semantic classes for styling consistency
- Maintain 2:3 aspect ratio for diagrams and images
- Use SVG for diagrams when possible for crisp rendering

**3. Interactive Elements:**
```html
<!-- Hover effects and clickable elements -->
<div class="interactive-diagram" onclick="highlightSection('tokenization')">
    <svg class="process-flow">
        <g class="tokenization-step" data-highlight="tokenization">
            <!-- Diagram content -->
        </g>
    </svg>
</div>
```

**4. Responsive Design:**
```css
/* Slide content responsive behavior */
@media (max-width: 768px) {
    .slide-content {
        padding: var(--spacing-md);
    }

    .slide-title {
        font-size: 2rem;
    }

    .business-metric,
    .tech-concept {
        padding: var(--spacing-sm);
        margin: var(--spacing-sm) 0;
    }
}
```

### Content Types and Templates

**Business Metrics Display:**
```html
<div class="business-metric">
    <div class="metric-header">
        <span class="company-logo">[Company]</span>
        <span class="metric-category">Performance</span>
    </div>
    <div class="metric-value">95%</div>
    <div class="metric-description">кредитных решений за 2 минуты</div>
</div>
```

**Technical Concept Explanation:**
```html
<div class="tech-concept">
    <h3 class="concept-title">Tokenization</h3>
    <div class="concept-visual">
        <div class="before-after">
            <div class="before">
                <span class="label">Input:</span>
                <span class="text">"Я читаю это предложение"</span>
            </div>
            <div class="arrow">→</div>
            <div class="after">
                <span class="label">Tokens:</span>
                <span class="tokens">["Я", "чит", "аю", "это", "пред", "ложение"]</span>
            </div>
        </div>
    </div>
</div>
```

**Cognitive Parallel Illustration:**
```html
<div class="cognitive-parallel">
    <div class="human-side">
        <h4>Human Brain</h4>
        <div class="process-steps">
            <div class="step">Perception</div>
            <div class="step">Processing</div>
            <div class="step">Response</div>
        </div>
    </div>
    <div class="parallel-arrow">≈</div>
    <div class="ai-side">
        <h4>AI System</h4>
        <div class="process-steps">
            <div class="step">Encoding</div>
            <div class="step">Thinking</div>
            <div class="step">Generation</div>
        </div>
    </div>
</div>
```

## Error Handling and Fallbacks

**Default Slide Generation:**
```javascript
function generateDefaultSlideHTML(slideId, speechContent) {
    const config = SLIDE_CONFIG[slideId];
    const sections = speechContent.split(/\[СЛАЙД\]/);

    let html = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Slide ${slideId}: ${config.title}</title>
            <style>
                /* Embed default styles */
                ${getDefaultSlideStyles()}
            </style>
        </head>
        <body class="slide-content">
            <div class="slide-section" data-action="0">
                <h1 class="slide-title">${config.title}</h1>
            </div>
    `;

    sections.forEach((section, index) => {
        if (section.trim()) {
            html += `
                <div class="slide-section" data-action="${index + 1}">
                    <div class="auto-generated">
                        ${renderMarkdownToHTML(section.trim())}
                    </div>
                </div>
            `;
        }
    });

    html += `
        </body>
        </html>
    `;

    return html;
}
```

## Development Workflow

### Testing System Requirements
Each part **MUST** include a comprehensive testing system:

```
presentation/assets/[partId]/
├── navigation.html           # Central hub with all links
├── test-system.html         # Comprehensive test interface
└── slides/ or index.html    # Actual slide content
```

### Local Development Testing
1. **Start dev server**: `python dev-server.py`
2. **Navigate to part**: `http://localhost:8000/presentation/assets/[partId]/navigation.html`
3. **Test individual slides** and **full progressive disclosure**
4. **Verify postMessage communication** in browser console

### Standards Compliance Checklist
- [ ] **PostMessage listeners** implemented in all slide files
- [ ] **Progressive disclosure** working with data-action attributes
- [ ] **Slide metadata** properly exposed via window.slideMetadata
- [ ] **CSS variables** used for consistent styling
- [ ] **Multi-slide navigation** working in main system
- [ ] **Local test system** functional and comprehensive
- [ ] **Console logging** clear and helpful for debugging
- [ ] **Responsive design** working on different screen sizes

### Action Mapping Examples
```javascript
// Part 1 (Multi-slide): 5 total actions
// Action 0: Title slide (1-1-title.html, action 0)
// Action 1: Contrast slide (1-2-contrast.html, action 0 - header)
// Action 2: Contrast slide (1-2-contrast.html, action 1 - medical)
// Action 3: Contrast slide (1-2-contrast.html, action 2 - generation)
// Action 4: Contrast slide (1-2-contrast.html, action 3 - financial)

// Part 2 (Single slide): 3 total actions
// Action 0: Main slide (index.html, action 0)
// Action 1: Main slide (index.html, action 1)
// Action 2: Main slide (index.html, action 2)
```

This specification ensures that slide pages integrate seamlessly with the presentation system while maintaining visual consistency and supporting all progressive disclosure requirements through secure postMessage communication.