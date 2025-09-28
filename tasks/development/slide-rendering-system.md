# Slide Rendering System Specification

## Main Window Display Integration

This document details how slide pages integrate with the main presentation window, ensuring consistent rendering, proper progressive disclosure, and seamless user experience.

## Rendering Architecture

### Dual Content System

**Content Sources:**
1. **Visual Content**: `presentation/assets/[slideId]/index.html` → Main display area
2. **Text Content**: `presentation/[slideId]/*.md` → Bottom tabs

**Integration Flow:**
```
User Navigation → Load Slide → Display Visual + Load Text → Progressive Disclosure
```

### Main Window Layout Integration

**HTML Structure:**
```html
<div class="app">
    <!-- Sidebar Navigation -->
    <nav class="sidebar">
        <!-- Navigation tree (existing) -->
    </nav>

    <!-- Main Content Area -->
    <main class="main-content">
        <!-- Slide Header -->
        <header class="slide-header">
            <h1 class="slide-title-main" id="current-slide-title">
                Slide 1: Парадокс умного незнакомца
            </h1>

            <!-- Progress Indicators -->
            <div class="progress-container">
                <div class="progress-info">
                    <span class="progress-dots" id="progress-dots">●●○○○</span>
                    <span class="progress-text" id="progress-text">Action 2 of 5</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 40%"></div>
                </div>
                <div class="progress-hint" id="progress-hint">
                    Next: Space or click to reveal business metrics
                </div>
            </div>
        </header>

        <!-- Slide Display Area -->
        <div class="slide-display-container">
            <div class="slide-display">
                <iframe
                    id="slide-frame"
                    class="slide-iframe"
                    frameborder="0"
                    scrolling="auto"
                    sandbox="allow-scripts allow-same-origin">
                </iframe>
            </div>

            <!-- Slide Controls -->
            <div class="slide-controls">
                <button onclick="prevAction()" class="control-btn prev-btn" id="prev-btn">
                    <span class="btn-icon">←</span>
                    <span class="btn-text">Previous</span>
                </button>

                <div class="control-center">
                    <button onclick="toggleFullscreen()" class="control-btn fullscreen-btn">
                        <span class="btn-icon">⛶</span>
                    </button>
                    <button onclick="restartSlide()" class="control-btn restart-btn">
                        <span class="btn-icon">⟲</span>
                    </button>
                </div>

                <button onclick="nextAction()" class="control-btn next-btn primary" id="next-btn">
                    <span class="btn-text">Next</span>
                    <span class="btn-icon">→</span>
                </button>
            </div>
        </div>
    </main>

    <!-- Content Tabs Area -->
    <section class="content-tabs" id="content-tabs">
        <!-- Tab system (existing) -->
    </section>
</div>
```

## Slide Content Loading System

### Enhanced Content Loader

```javascript
class SlideRenderer {
    constructor() {
        this.currentSlide = null;
        this.slideFrame = null;
        this.isLoading = false;
    }

    async loadSlide(slideId) {
        if (this.isLoading) return;
        this.isLoading = true;

        try {
            // Show loading state
            this.showLoadingState();

            // Load both visual and text content
            const content = await this.loadSlideContent(slideId);

            // Update main window
            await this.renderSlideContent(slideId, content);

            // Update tabs content
            this.updateTabsContent(content);

            // Initialize progressive disclosure
            this.initializeProgressiveDisclosure(content);

            // Update navigation state
            this.updateNavigationState(slideId);

        } catch (error) {
            this.handleLoadError(slideId, error);
        } finally {
            this.hideLoadingState();
            this.isLoading = false;
        }
    }

    async loadSlideContent(slideId) {
        const content = {};

        // Load text content for tabs
        const textPath = `presentation/${slideId}/`;
        const textFiles = {
            analysis: 'extended_analysis.md',
            speech: 'speech_notes.md',
            design: 'slide_design.md',
            sources: 'sources_reference.md'
        };

        for (const [key, filename] of Object.entries(textFiles)) {
            try {
                const response = await fetch(`${textPath}${filename}`);
                content[key] = response.ok ? await response.text() : this.getDefaultTextContent(key);
            } catch (error) {
                content[key] = this.getErrorTextContent(key, error);
            }
        }

        // Load visual content for main display
        const visualPath = `presentation/assets/${slideId}/index.html`;
        try {
            const visualResponse = await fetch(visualPath);
            if (visualResponse.ok) {
                content.visual = await visualResponse.text();
                content.hasCustomVisual = true;
            } else {
                content.visual = this.generateDefaultSlideHTML(slideId, content);
                content.hasCustomVisual = false;
            }
        } catch (error) {
            content.visual = this.generateDefaultSlideHTML(slideId, content);
            content.hasCustomVisual = false;
        }

        // Parse actions from both sources
        content.speechActions = this.parseActionsFromText(content.speech);
        content.visualActions = this.parseActionsFromHTML(content.visual);
        content.maxActions = Math.max(content.speechActions, content.visualActions, 1);

        return content;
    }

    async renderSlideContent(slideId, content) {
        // Update slide title
        const titleElement = document.getElementById('current-slide-title');
        const slideConfig = SLIDE_CONFIG[slideId];
        titleElement.textContent = `Slide ${slideId}: ${slideConfig.title}`;

        // Prepare iframe content with injected styles
        const styledContent = this.injectGlobalStyles(content.visual);

        // Create blob URL for iframe content
        const blob = new Blob([styledContent], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);

        // Load content in iframe
        const iframe = document.getElementById('slide-frame');
        iframe.src = blobUrl;

        // Wait for iframe load
        await new Promise((resolve) => {
            iframe.onload = () => {
                // Clean up blob URL
                URL.revokeObjectURL(blobUrl);
                resolve();
            };
        });

        // Store reference to iframe document
        this.slideFrame = iframe.contentDocument || iframe.contentWindow.document;
        this.currentSlide = { id: slideId, content };
    }

    injectGlobalStyles(htmlContent) {
        // Extract existing head content
        const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
        const existingHead = headMatch ? headMatch[1] : '';

        // Inject global presentation styles
        const globalStyles = `
            <style>
                /* Import global CSS variables */
                ${this.getGlobalCSSVariables()}

                /* Slide-specific enhancements */
                ${this.getSlideEnhancements()}

                /* Progressive disclosure styles */
                ${this.getProgressiveDisclosureStyles()}

                /* Responsive adjustments */
                ${this.getResponsiveStyles()}
            </style>
        `;

        // Replace or inject head with enhanced styles
        if (headMatch) {
            return htmlContent.replace(
                /<head[^>]*>[\s\S]*?<\/head>/i,
                `<head>${existingHead}${globalStyles}</head>`
            );
        } else {
            return htmlContent.replace(
                /<html[^>]*>/i,
                `$&<head>${globalStyles}</head>`
            );
        }
    }

    getGlobalCSSVariables() {
        return `
            :root {
                --primary-text: #2d3748;
                --secondary-text: #718096;
                --accent-color: #667eea;
                --success-color: #00a86b;
                --warning-color: #ff6b6b;
                --background: #ffffff;
                --background-secondary: #f7fafc;
                --border-color: #e2e8f0;
                --font-family-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                --spacing-xs: 0.25rem;
                --spacing-sm: 0.5rem;
                --spacing-md: 1rem;
                --spacing-lg: 1.5rem;
                --spacing-xl: 2rem;
                --spacing-2xl: 3rem;
                --transition-fast: 0.15s ease;
                --transition-normal: 0.3s ease;
                --transition-slow: 0.5s ease;
            }
        `;
    }

    getSlideEnhancements() {
        return `
            body {
                font-family: var(--font-family-main);
                color: var(--primary-text);
                line-height: 1.6;
                margin: 0;
                padding: var(--spacing-xl);
                background: var(--background);
                overflow-x: hidden;
            }

            .slide-content {
                max-width: 100%;
                margin: 0 auto;
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
                font-weight: 400;
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
                padding: var(--spacing-md) var(--spacing-lg);
                margin: var(--spacing-lg) 0;
                border-radius: 0 8px 8px 0;
            }

            .tech-concept {
                background: rgba(255, 107, 107, 0.05);
                border: 1px solid rgba(255, 107, 107, 0.2);
                padding: var(--spacing-lg);
                border-radius: 8px;
                margin: var(--spacing-lg) 0;
            }

            .cognitive-parallel {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--spacing-lg);
                margin: var(--spacing-xl) 0;
                padding: var(--spacing-lg);
                background: var(--background-secondary);
                border-radius: 8px;
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
        `;
    }

    getProgressiveDisclosureStyles() {
        return `
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

            .slide-section[data-action="0"] {
                opacity: 1;
                transform: translateY(0);
            }

            /* Animation delays for staggered reveals */
            .slide-section.revealed:nth-child(2) { transition-delay: 0.1s; }
            .slide-section.revealed:nth-child(3) { transition-delay: 0.2s; }
            .slide-section.revealed:nth-child(4) { transition-delay: 0.3s; }
        `;
    }

    getResponsiveStyles() {
        return `
            @media (max-width: 768px) {
                body {
                    padding: var(--spacing-md);
                }

                .slide-title {
                    font-size: 2rem;
                }

                .cognitive-parallel {
                    flex-direction: column;
                    text-align: center;
                }

                .business-metric,
                .tech-concept {
                    padding: var(--spacing-md);
                    margin: var(--spacing-md) 0;
                }
            }

            @media (max-width: 480px) {
                .slide-title {
                    font-size: 1.75rem;
                }

                body {
                    padding: var(--spacing-sm);
                }
            }
        `;
    }
}
```

## Progressive Disclosure Implementation

### Action Management System

```javascript
class ProgressiveDisclosure {
    constructor(slideRenderer) {
        this.slideRenderer = slideRenderer;
        this.currentAction = 0;
        this.maxActions = 1;
    }

    initializeSlide(slideContent) {
        this.maxActions = slideContent.maxActions;
        this.currentAction = 0;
        this.updateProgressDisplay();
        this.revealContent(0);
    }

    nextAction() {
        if (this.currentAction < this.maxActions - 1) {
            this.currentAction++;
            this.revealContent(this.currentAction);
            this.updateProgressDisplay();
            return true; // Action within slide
        }
        return false; // Need to go to next slide
    }

    prevAction() {
        if (this.currentAction > 0) {
            this.currentAction--;
            this.revealContent(this.currentAction);
            this.updateProgressDisplay();
            return true; // Action within slide
        }
        return false; // Need to go to previous slide
    }

    revealContent(actionIndex) {
        if (!this.slideRenderer.slideFrame) return;

        const sections = this.slideRenderer.slideFrame.querySelectorAll('[data-action]');

        sections.forEach((section) => {
            const sectionAction = parseInt(section.getAttribute('data-action'));

            if (sectionAction <= actionIndex) {
                section.classList.add('revealed');
            } else {
                section.classList.remove('revealed');
            }
        });

        // Smooth scroll to revealed content
        this.scrollToCurrentContent(actionIndex);
    }

    scrollToCurrentContent(actionIndex) {
        const currentSection = this.slideRenderer.slideFrame.querySelector(`[data-action="${actionIndex}"]`);
        if (currentSection) {
            currentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    updateProgressDisplay() {
        // Update dots
        const dotsElement = document.getElementById('progress-dots');
        let dotsHTML = '';
        for (let i = 0; i < this.maxActions; i++) {
            dotsHTML += i <= this.currentAction ? '●' : '○';
        }
        dotsElement.textContent = dotsHTML;

        // Update text
        const textElement = document.getElementById('progress-text');
        textElement.textContent = `Action ${this.currentAction + 1} of ${this.maxActions}`;

        // Update progress bar
        const fillElement = document.getElementById('progress-fill');
        const percentage = ((this.currentAction + 1) / this.maxActions) * 100;
        fillElement.style.width = `${percentage}%`;

        // Update hint
        const hintElement = document.getElementById('progress-hint');
        if (this.currentAction < this.maxActions - 1) {
            hintElement.textContent = 'Next: Space or click to continue';
        } else {
            hintElement.textContent = 'Next: Space for next slide';
        }

        // Update button states
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentAction === 0;
        nextBtn.textContent = this.currentAction < this.maxActions - 1 ? 'Continue' : 'Next Slide';
    }
}
```

## Error Handling and Fallbacks

### Default Content Generation

```javascript
function generateDefaultSlideHTML(slideId, content) {
    const config = SLIDE_CONFIG[slideId];
    const speechSections = content.speech.split(/\[СЛАЙД\]/);

    return `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Slide ${slideId}: ${config.title}</title>
        </head>
        <body class="slide-content">
            <div class="slide-section" data-action="0">
                <h1 class="slide-title">${config.title}</h1>
                <p class="slide-subtitle">Generated from speech notes</p>
            </div>

            ${speechSections.map((section, index) => {
                if (!section.trim()) return '';
                return `
                    <div class="slide-section" data-action="${index + 1}">
                        <div class="auto-generated-content">
                            ${this.convertTextToHTML(section.trim())}
                        </div>
                    </div>
                `;
            }).join('')}
        </body>
        </html>
    `;
}

function convertTextToHTML(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.+)$/gm, '<p>$1</p>')
        .replace(/<p><\/p>/g, '');
}
```

This rendering system ensures seamless integration between slide content and the main presentation window while maintaining consistent styling and smooth progressive disclosure functionality.