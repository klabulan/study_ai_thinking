# Slide Pages Content Specification

## Overview
This document defines the requirements, structure, and specifications for slide page content stored in `presentation/assets/[1-8]/` folders, ensuring proper rendering in the main presentation window with consistent styling and progressive disclosure support.

## Content Requirements

### Slide Page Structure
Each slide in `presentation/assets/[slideId]/` should contain visual content that complements the text-based markdown files in `presentation/[slideId]/`.

```
presentation/assets/
├── 1/                           # Slide 1: Парадокс умного незнакомца
│   ├── index.html              # Main slide content
│   ├── style.css               # Slide-specific styles (optional)
│   ├── images/                 # Visual assets
│   │   ├── paradox-diagram.svg
│   │   └── ai-black-box.png
│   └── data.json               # Slide metadata (optional)
├── 2/                          # Slide 2: Тайна чёрного ящика
│   ├── index.html
│   ├── images/
│   └── interactive/            # Interactive elements
└── .../
```

### Slide Content Format Standards

**Primary Content File: `index.html`**
Each slide must have an `index.html` file containing the visual presentation content:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide [Number]: [Title]</title>
    <!-- Slide-specific styles embedded or linked -->
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

    <!-- Additional action sections as needed -->
</body>
</html>
```

## Content Integration Requirements

### Main Window Rendering System

**Content Loading Strategy:**
```javascript
async function loadSlideContent(slideId) {
    const paths = {
        // Text content for tabs (existing structure)
        text: `presentation/${slideId}/`,
        // Visual content for main display (new structure)
        visual: `presentation/assets/${slideId}/index.html`
    };

    const content = {};

    // Load text content for tabs
    const textFiles = ['extended_analysis.md', 'speech_notes.md', 'slide_design.md', 'sources_reference.md'];
    for (const file of textFiles) {
        const response = await fetch(`${paths.text}${file}`);
        content[file.replace('.md', '')] = response.ok ? await response.text() : getDefaultContent(file);
    }

    // Load visual content for main area
    try {
        const visualResponse = await fetch(paths.visual);
        if (visualResponse.ok) {
            content.visual = await visualResponse.text();
            content.hasVisual = true;
        } else {
            content.visual = generateDefaultSlideHTML(slideId, content.speech);
            content.hasVisual = false;
        }
    } catch (error) {
        content.visual = generateDefaultSlideHTML(slideId, content.speech);
        content.hasVisual = false;
    }

    // Parse actions from both speech notes and visual content
    content.maxActions = Math.max(
        parseActionsFromSpeech(content.speech),
        parseActionsFromVisual(content.visual)
    );

    return content;
}
```

### Progressive Disclosure Integration

**Action Detection in Visual Content:**
```javascript
function parseActionsFromVisual(htmlContent) {
    // Count data-action attributes to determine total actions
    const actionMatches = htmlContent.match(/data-action="(\d+)"/g);
    if (!actionMatches) return 1;

    const actionNumbers = actionMatches.map(match =>
        parseInt(match.match(/data-action="(\d+)"/)[1])
    );

    return Math.max(...actionNumbers) + 1; // +1 because actions are 0-indexed
}

function revealVisualContent(actionIndex) {
    const slideFrame = document.getElementById('slide-frame');
    if (!slideFrame) return;

    const slideDocument = slideFrame.contentDocument || slideFrame.contentWindow.document;
    const sections = slideDocument.querySelectorAll('[data-action]');

    sections.forEach((section, index) => {
        const sectionAction = parseInt(section.getAttribute('data-action'));
        if (sectionAction <= actionIndex) {
            section.classList.add('revealed');
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            section.classList.remove('revealed');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        }
    });
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

This specification ensures that slide pages integrate seamlessly with the presentation system while maintaining visual consistency and supporting all progressive disclosure requirements.