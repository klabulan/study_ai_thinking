# Slide Rendering System Specification v2.0

## Multi-Slide Architecture Integration

This document details how the enhanced multi-slide system integrates with the main presentation window, using **postMessage communication** for secure cross-origin iframe control and dynamic slide switching within parts.

## Enhanced Rendering Architecture

### Multi-Slide Content System

**Content Sources:**
1. **Multi-slide parts**: `presentation/assets/[partId]/slides/[slideId].html` → Individual slide files
2. **Single slide parts**: `presentation/assets/[partId]/index.html` → Legacy combined slides
3. **Text Content**: `presentation/[partId]/*.md` → Bottom tabs and documentation

**Integration Flow:**
```
User Navigation → Load Part Configuration → Determine Slide Type →
Load Individual Slide → PostMessage Communication → Progressive Disclosure
```

### Part Configuration Detection

**slideConfig Structure:**
```javascript
// Multi-slide part configuration
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

// Single slide part configuration
2: {
    title: "Тайна чёрного ящика",
    section: "Введение"
    // No customSlides = uses legacy loading
}
```

### PostMessage Communication Architecture

**Main System Integration:**
```html
<div class="app">
    <!-- Sidebar Navigation -->
    <nav class="sidebar">
        <!-- Navigation tree with part-based structure -->
    </nav>

    <!-- Main Content Area -->
    <main class="main-content">
        <!-- Part Header -->
        <header class="slide-header">
            <h1 class="slide-title-main" id="current-slide-title">
                Part 1: Парадокс умного незнакомца
            </h1>

            <!-- Enhanced Progress Indicators -->
            <div class="progress-container">
                <div class="progress-info">
                    <span class="progress-dots" id="progress-dots">●●○○○</span>
                    <span class="progress-text" id="progress-text">Action 2 of 5</span>
                    <span class="slide-indicator" id="slide-indicator">Slide 2/2</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 40%"></div>
                </div>
                <div class="progress-hint" id="progress-hint">
                    Next: Space or click to reveal business metrics
                </div>
            </div>
        </header>

        <!-- Slide Display Area with PostMessage Support -->
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

            <!-- Enhanced Slide Controls -->
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
                    <button onclick="debugSlide()" class="control-btn debug-btn" title="Show slide metadata">
                        <span class="btn-icon">🔍</span>
                    </button>
                </div>

                <button onclick="nextAction()" class="control-btn next-btn primary" id="next-btn">
                    <span class="btn-text">Continue</span>
                    <span class="btn-icon">→</span>
                </button>
            </div>
        </div>
    </main>

    <!-- Content Tabs Area -->
    <section class="content-tabs" id="content-tabs">
        <!-- Tab system with part-based content -->
    </section>
</div>
```

## Multi-Slide Content Loading System

### Enhanced Part Loader with Dynamic Slide Switching

```javascript
class MultiSlideRenderer {
    constructor() {
        this.currentPart = null;
        this.currentSlideIndex = 0;
        this.slideFrame = null;
        this.isLoading = false;
        this.partConfig = null;
    }

    async loadPart(partId) {
        if (this.isLoading) return;
        this.isLoading = true;

        try {
            // Show loading state
            this.showLoadingState();

            // Load part configuration
            this.partConfig = this.getPartConfiguration(partId);

            // Determine loading strategy
            if (this.partConfig.customSlides) {
                await this.loadMultiSlidePart(partId);
            } else {
                await this.loadSingleSlidePart(partId);
            }

            // Update tabs content
            this.updateTabsContent(partId);

            // Initialize progressive disclosure with postMessage
            this.initializePostMessageDisclosure();

            // Update navigation state
            this.updateNavigationState(partId);

        } catch (error) {
            this.handleLoadError(partId, error);
        } finally {
            this.hideLoadingState();
            this.isLoading = false;
        }
    }

    async loadMultiSlidePart(partId) {
        // Load first slide by default
        this.currentSlideIndex = 0;
        const firstSlide = this.partConfig.slides[0];
        await this.loadIndividualSlide(firstSlide.file);

        // Update part title
        this.updatePartTitle(partId, this.partConfig.title);

        // Calculate total actions across all slides
        this.calculateTotalActions();
    }

    async loadIndividualSlide(slideFile) {
        const iframe = document.getElementById('slide-frame');

        // Load slide with proper error handling
        iframe.src = slideFile;

        return new Promise((resolve, reject) => {
            iframe.onload = () => {
                console.log(`Loaded slide: ${slideFile}`);
                this.slideFrame = iframe.contentWindow;

                // Wait for slide initialization
                setTimeout(() => {
                    this.verifySlideMetadata();
                    resolve();
                }, 100);
            };

            iframe.onerror = () => {
                console.error(`Failed to load slide: ${slideFile}`);
                reject(new Error(`Failed to load slide: ${slideFile}`));
            };
        });
    }

    verifySlideMetadata() {
        try {
            if (this.slideFrame && this.slideFrame.slideMetadata) {
                const metadata = this.slideFrame.slideMetadata;
                console.log('Slide metadata:', metadata);

                // Update UI with slide-specific information
                this.updateSlideIndicator(metadata);
            } else {
                console.warn('Slide metadata not available');
            }
        } catch (e) {
            console.warn('Cannot access slide metadata (cross-origin):', e.message);
        }
    }

    async loadSingleSlidePart(partId) {
        // Legacy single slide loading
        const content = await this.loadPartContent(partId);
        await this.renderSlideContent(partId, content);
    }

    async loadPartContent(partId) {
        const content = {};

        // Load text content for tabs
        const textPath = `presentation/${partId}/`;
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

        return content;
    }

    calculateTotalActions() {
        let totalActions = 0;
        this.partConfig.slides.forEach(slide => {
            totalActions += slide.actions || 0;
        });
        this.totalActions = Math.max(totalActions, 1);
        return this.totalActions;
    }

    getPartConfiguration(partId) {
        // Access slideConfig from main app
        return this.app.slideConfig[partId] || {
            title: `Part ${partId}`,
            section: "Unknown",
            customSlides: false
        };
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

## PostMessage Progressive Disclosure Implementation

### Enhanced Action Management with Dynamic Slide Switching

```javascript
class PostMessageProgressiveDisclosure {
    constructor(multiSlideRenderer) {
        this.renderer = multiSlideRenderer;
        this.currentGlobalAction = 0;
        this.totalActions = 1;
        this.currentSlideIndex = 0;
    }

    initializePart(partConfig) {
        this.partConfig = partConfig;

        if (partConfig.customSlides) {
            this.totalActions = this.renderer.calculateTotalActions();
        } else {
            this.totalActions = this.parseActionsFromContent();
        }

        this.currentGlobalAction = 0;
        this.updateProgressDisplay();
        this.revealContent(0);
    }

    nextAction() {
        if (this.currentGlobalAction < this.totalActions - 1) {
            this.currentGlobalAction++;
            this.revealContent(this.currentGlobalAction);
            this.updateProgressDisplay();
            return true; // Action within part
        }
        return false; // Need to go to next part
    }

    prevAction() {
        if (this.currentGlobalAction > 0) {
            this.currentGlobalAction--;
            this.revealContent(this.currentGlobalAction);
            this.updateProgressDisplay();
            return true; // Action within part
        }
        return false; // Need to go to previous part
    }

    revealContent(globalActionIndex) {
        const iframe = document.getElementById('slide-frame');
        if (!iframe) return;

        if (this.partConfig && this.partConfig.customSlides) {
            // Multi-slide part: determine target slide and switch if needed
            const targetSlide = this.getTargetSlideForAction(globalActionIndex);
            const slideActionIndex = this.getSlideActionIndex(globalActionIndex, targetSlide);

            // Check if we need to switch slides
            if (!iframe.src.includes(targetSlide.file)) {
                console.log(`Switching to slide: ${targetSlide.file}`);
                iframe.src = targetSlide.file;
                iframe.onload = () => {
                    setTimeout(() => {
                        this.sendRevealMessage(iframe, slideActionIndex);
                    }, 100);
                };
                return;
            }

            // Same slide: just send message
            this.sendRevealMessage(iframe, slideActionIndex);
        } else {
            // Single slide part: use legacy method
            this.legacyRevealContent(globalActionIndex);
        }
    }

    getTargetSlideForAction(globalActionIndex) {
        // Map global actions to specific slides
        // Example for Part 1: Actions 0 → slide 1, Actions 1-4 → slide 2
        if (globalActionIndex === 0) {
            return this.partConfig.slides[0];
        } else {
            return this.partConfig.slides[1];
        }
    }

    getSlideActionIndex(globalActionIndex, targetSlide) {
        // Map global actions to slide-specific actions
        // Example: Global action 3 → slide action 2 for second slide
        if (targetSlide === this.partConfig.slides[0]) {
            return 0; // Title slide only has action 0
        } else {
            return Math.max(0, globalActionIndex - 1); // Subtract offset for second slide
        }
    }

    sendRevealMessage(iframe, actionIndex) {
        try {
            console.log(`Sending postMessage: revealSection(${actionIndex})`);
            iframe.contentWindow.postMessage({
                type: 'revealSection',
                actionIndex: actionIndex
            }, '*');
        } catch (e) {
            console.warn('PostMessage failed, trying fallback:', e.message);
            this.fallbackRevealContent(iframe, actionIndex);
        }
    }

    fallbackRevealContent(iframe, actionIndex) {
        // Direct DOM access fallback for same-origin slides
        try {
            if (iframe.contentWindow && iframe.contentWindow.revealSection) {
                iframe.contentWindow.revealSection(actionIndex);
            }
        } catch (e) {
            console.error('Both postMessage and direct access failed:', e.message);
        }
    }

    legacyRevealContent(actionIndex) {
        // Legacy method for single-slide parts
        const iframe = document.getElementById('slide-frame');
        if (!iframe || !iframe.contentDocument) return;

        const sections = iframe.contentDocument.querySelectorAll('[data-action]');
        sections.forEach((section) => {
            const sectionAction = parseInt(section.getAttribute('data-action'));
            if (sectionAction <= actionIndex) {
                section.classList.add('revealed');
            } else {
                section.classList.remove('revealed');
            }
        });
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
        for (let i = 0; i < this.totalActions; i++) {
            dotsHTML += i <= this.currentGlobalAction ? '●' : '○';
        }
        dotsElement.textContent = dotsHTML;

        // Update text
        const textElement = document.getElementById('progress-text');
        textElement.textContent = `Action ${this.currentGlobalAction + 1} of ${this.totalActions}`;

        // Update slide indicator for multi-slide parts
        const slideIndicator = document.getElementById('slide-indicator');
        if (this.partConfig && this.partConfig.customSlides) {
            const currentSlideIndex = this.getCurrentSlideIndex();
            slideIndicator.textContent = `Slide ${currentSlideIndex + 1}/${this.partConfig.slides.length}`;
            slideIndicator.style.display = 'inline';
        } else {
            slideIndicator.style.display = 'none';
        }

        // Update progress bar
        const fillElement = document.getElementById('progress-fill');
        const percentage = ((this.currentGlobalAction + 1) / this.totalActions) * 100;
        fillElement.style.width = `${percentage}%`;

        // Update hint
        const hintElement = document.getElementById('progress-hint');
        if (this.currentGlobalAction < this.totalActions - 1) {
            const nextSlideIndex = this.getNextSlideIndex();
            if (nextSlideIndex !== this.getCurrentSlideIndex()) {
                const nextSlide = this.partConfig.slides[nextSlideIndex];
                hintElement.textContent = `Next: ${nextSlide.title}`;
            } else {
                hintElement.textContent = 'Next: Space or click to continue';
            }
        } else {
            hintElement.textContent = 'Next: Space for next part';
        }

        // Update button states
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentGlobalAction === 0;
        nextBtn.textContent = this.currentGlobalAction < this.totalActions - 1 ? 'Continue' : 'Next Part';
    }

    getCurrentSlideIndex() {
        if (!this.partConfig || !this.partConfig.customSlides) return 0;

        // Determine current slide based on global action
        const targetSlide = this.getTargetSlideForAction(this.currentGlobalAction);
        return this.partConfig.slides.indexOf(targetSlide);
    }

    getNextSlideIndex() {
        if (!this.partConfig || !this.partConfig.customSlides) return 0;

        if (this.currentGlobalAction < this.totalActions - 1) {
            const nextTargetSlide = this.getTargetSlideForAction(this.currentGlobalAction + 1);
            return this.partConfig.slides.indexOf(nextTargetSlide);
        }
        return this.getCurrentSlideIndex();
    }
}
```

## Error Handling and Fallbacks

### PostMessage Communication Error Handling

```javascript
class ErrorHandler {
    static handleSlideLoadError(slideFile, error) {
        console.error(`Failed to load slide: ${slideFile}`, error);

        // Show error state in iframe
        const iframe = document.getElementById('slide-frame');
        const errorHTML = this.generateErrorSlideHTML(slideFile, error);

        const blob = new Blob([errorHTML], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        iframe.src = blobUrl;

        // Clean up after loading
        iframe.onload = () => URL.revokeObjectURL(blobUrl);
    }

    static handlePostMessageError(actionIndex, error) {
        console.warn('PostMessage communication failed:', error);

        // Try direct DOM access as fallback
        const iframe = document.getElementById('slide-frame');
        try {
            if (iframe.contentWindow && iframe.contentWindow.revealSection) {
                iframe.contentWindow.revealSection(actionIndex);
                console.log('Fallback direct access successful');
            }
        } catch (fallbackError) {
            console.error('All communication methods failed:', fallbackError);
            this.showCommunicationError();
        }
    }

    static generateErrorSlideHTML(slideFile, error) {
        return `
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Error Loading Slide</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                        padding: 2rem;
                        text-align: center;
                        color: #dc3545;
                    }
                    .error-container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 2rem;
                        border: 2px solid #dc3545;
                        border-radius: 8px;
                        background: #fff5f5;
                    }
                    .error-title {
                        font-size: 1.5rem;
                        margin-bottom: 1rem;
                    }
                    .error-details {
                        font-size: 0.9rem;
                        color: #666;
                        margin-top: 1rem;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1 class="error-title">⚠️ Slide Loading Error</h1>
                    <p>Failed to load slide:</p>
                    <code>${slideFile}</code>
                    <div class="error-details">
                        <strong>Error:</strong> ${error.message || error}
                    </div>
                    <div class="error-details">
                        <strong>Solution:</strong> Check that the slide file exists and is accessible.
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    static showCommunicationError() {
        const hint = document.getElementById('progress-hint');
        if (hint) {
            hint.textContent = '⚠️ Slide communication error - check console';
            hint.style.color = '#dc3545';
        }
    }
}

// Global error handlers
window.addEventListener('error', (event) => {
    if (event.target.tagName === 'IFRAME') {
        console.error('Iframe error:', event);
        ErrorHandler.handleSlideLoadError(event.target.src, event.error);
    }
});

window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('slide')) {
        console.error('Slide-related promise rejection:', event.reason);
    }
});
```

### Debugging and Development Tools

```javascript
// Debugging functions for development
function debugSlide() {
    const iframe = document.getElementById('slide-frame');
    if (!iframe) {
        console.log('No iframe found');
        return;
    }

    console.log('=== Slide Debug Info ===');
    console.log('Iframe src:', iframe.src);

    try {
        if (iframe.contentWindow && iframe.contentWindow.slideMetadata) {
            console.log('Slide metadata:', iframe.contentWindow.slideMetadata);
        } else {
            console.log('No slide metadata accessible');
        }
    } catch (e) {
        console.log('Cannot access slide content (cross-origin)');
    }

    // Test postMessage communication
    iframe.contentWindow.postMessage({
        type: 'debug',
        message: 'Debug test from main window'
    }, '*');
}

// Listen for debug messages from slides
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'debug') {
        console.log('Debug message from slide:', event.data);
    }
});
```

This enhanced rendering system provides robust **postMessage communication**, dynamic slide switching within parts, comprehensive error handling, and debugging tools for development. The system supports both multi-slide parts with individual HTML files and legacy single-slide parts, ensuring backward compatibility while enabling sophisticated presentation structures.