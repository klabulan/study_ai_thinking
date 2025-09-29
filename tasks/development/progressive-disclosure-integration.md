# Progressive Disclosure Integration v2.0 - PostMessage Architecture

## Multi-Slide Progressive Disclosure System

This document details the enhanced progressive disclosure system using **postMessage communication** for secure cross-origin iframe control, supporting both multi-slide parts and single-slide parts with dynamic slide switching.

## Enhanced Progressive Disclosure Architecture

### PostMessage Data Flow Overview

```
User Action → Action Mapping → Slide Selection → PostMessage → Content Reveal → Progress Update
     ↓              ↓              ↓               ↓              ↓              ↓
  Keyboard/Click → Global→Local → Dynamic Switch → Cross-Origin → CSS Transitions → UI Feedback
```

### Multi-Slide Action Mapping

```
Global Actions:    [0] ──→ [1] ──→ [2] ──→ [3] ──→ [4]
                    │       │       │       │       │
Slide Targets:   Slide1   Slide2  Slide2  Slide2  Slide2
                    │       │       │       │       │
Local Actions:     [0]     [0]     [1]     [2]     [3]
```

### Multi-Slide Action Detection System

**Enhanced Part-Based Action Parsing:**
```javascript
class MultiSlideActionDetector {
    static parsePartActions(partConfig, partContent) {
        if (partConfig.customSlides) {
            // Multi-slide part: calculate total from slide configuration
            return this.parseMultiSlideActions(partConfig);
        } else {
            // Single slide part: use legacy parsing
            return this.parseSingleSlideActions(partContent);
        }
    }

    static parseMultiSlideActions(partConfig) {
        let totalActions = 0;
        const slideActionMap = [];

        partConfig.slides.forEach((slide, index) => {
            const slideActions = slide.actions || 0;
            slideActionMap.push({
                slideIndex: index,
                slideFile: slide.file,
                slideTitle: slide.title,
                localActions: slideActions,
                globalActionStart: totalActions,
                globalActionEnd: totalActions + slideActions - 1
            });
            totalActions += slideActions;
        });

        return {
            totalActions: Math.max(totalActions, 1),
            slideActionMap,
            type: 'multi-slide',
            partConfig
        };
    }

    static parseSingleSlideActions(partContent) {
        const sources = {
            speech: this.parseActionsFromSpeech(partContent.speech || ''),
            visual: this.parseActionsFromHTML(partContent.visual || ''),
            design: this.parseActionsFromDesign(partContent.design || '')
        };

        const maxActions = Math.max(...Object.values(sources), 1);

        return {
            totalActions: maxActions,
            sources,
            type: 'single-slide',
            actionMap: this.createActionMap(maxActions, sources)
        };
    }

    static parseActionsFromSpeech(speechText) {
        // Count [СЛАЙД] markers in speech notes
        const slideMarkers = speechText.match(/\[СЛАЙД\]/g);
        return slideMarkers ? slideMarkers.length : 1;
    }

    static parseActionsFromHTML(htmlContent) {
        // Count data-action attributes in visual content
        const actionMatches = htmlContent.match(/data-action="(\d+)"/g);
        if (!actionMatches) return 1;

        const actionNumbers = actionMatches.map(match =>
            parseInt(match.match(/data-action="(\d+)"/)[1])
        );

        return Math.max(...actionNumbers) + 1; // +1 because actions are 0-indexed
    }

    static parseActionsFromDesign(designText) {
        // Parse design specifications for interaction points
        const interactionMarkers = designText.match(/\[REVEAL\]|\[CLICK\]|\[SHOW\]/g);
        return interactionMarkers ? interactionMarkers.length : 0;
    }

    static createActionMap(maxActions, sources) {
        // Create mapping of actions to content sources
        const actionMap = [];

        for (let i = 0; i < maxActions; i++) {
            actionMap.push({
                index: i,
                hasVisual: i < sources.visual,
                hasSpeech: i < sources.speech,
                hasDesign: i < sources.design,
                description: this.getActionDescription(i, sources)
            });
        }

        return actionMap;
    }

    static getActionDescription(actionIndex, sources) {
        // Generate user-friendly description of what this action reveals
        if (actionIndex === 0) return "Initial slide content";

        const descriptions = [
            "Reveal key concepts",
            "Show business metrics",
            "Display technical details",
            "Present comparative analysis",
            "Conclude with insights"
        ];

        return descriptions[actionIndex - 1] || `Action ${actionIndex}`;
    }
}
```

### PostMessage Progressive Disclosure Controller

```javascript
class PostMessageProgressiveDisclosureController {
    constructor(multiSlideRenderer, navigationController) {
        this.renderer = multiSlideRenderer;
        this.navigationController = navigationController;
        this.currentPart = null;
        this.currentGlobalAction = 0;
        this.totalActions = 1;
        this.slideActionMap = [];
        this.partConfig = null;
        this.isAnimating = false;
        this.currentSlideIndex = 0;
    }

    initializePart(partConfig, partContent) {
        // Parse actions from part configuration
        const actionData = MultiSlideActionDetector.parsePartActions(partConfig, partContent);

        this.partConfig = partConfig;
        this.totalActions = actionData.totalActions;
        this.slideActionMap = actionData.slideActionMap || [];
        this.currentGlobalAction = 0;
        this.currentSlideIndex = 0;

        console.log('Initialized part with action data:', actionData);

        // Initialize UI state
        this.updateProgressDisplay();
        this.updateNavigationButtons();

        // Reveal initial content with postMessage
        this.revealContent(0, { immediate: true });

        // Set up interaction listeners
        this.setupInteractionListeners();
    }

    nextAction() {
        if (this.isAnimating) return false;

        if (this.currentGlobalAction < this.totalActions - 1) {
            this.currentGlobalAction++;
            this.revealContent(this.currentGlobalAction);
            this.updateProgressDisplay();
            this.updateNavigationButtons();
            console.log(`Advanced to global action ${this.currentGlobalAction}`);
            return true; // Action within part
        }

        return false; // Need to advance to next part
    }

    prevAction() {
        if (this.isAnimating) return false;

        if (this.currentGlobalAction > 0) {
            this.currentGlobalAction--;
            this.revealContent(this.currentGlobalAction);
            this.updateProgressDisplay();
            this.updateNavigationButtons();
            console.log(`Moved back to global action ${this.currentGlobalAction}`);
            return true; // Action within part
        }

        return false; // Need to go to previous part
    }

    async revealContent(globalActionIndex, options = {}) {
        if (this.isAnimating && !options.immediate) return;

        this.isAnimating = !options.immediate;

        try {
            console.log(`Revealing content for global action ${globalActionIndex}`);

            if (this.partConfig && this.partConfig.customSlides) {
                // Multi-slide part: use postMessage communication
                await this.revealMultiSlideContent(globalActionIndex, options);
            } else {
                // Single slide part: use legacy method
                await this.revealSingleSlideContent(globalActionIndex, options);
            }

            // Update main window elements
            this.updateMainWindowContent(globalActionIndex);

            // Handle special interactions
            this.handleSpecialInteractions(globalActionIndex);

        } finally {
            this.isAnimating = false;
        }
    }

    async revealMultiSlideContent(globalActionIndex, options) {
        const iframe = document.getElementById('slide-frame');
        if (!iframe) return;

        // Determine target slide and action mapping
        const targetSlide = this.getTargetSlideForAction(globalActionIndex);
        const slideActionIndex = this.getSlideActionIndex(globalActionIndex, targetSlide);

        console.log(`Target slide: ${targetSlide.file}, slide action: ${slideActionIndex}`);

        // Check if we need to switch slides
        if (!iframe.src.includes(targetSlide.file)) {
            console.log(`Switching slides: ${iframe.src} → ${targetSlide.file}`);

            // Update current slide index
            this.currentSlideIndex = this.partConfig.slides.indexOf(targetSlide);

            // Load new slide
            iframe.src = targetSlide.file;

            // Wait for slide to load, then send message
            iframe.onload = () => {
                setTimeout(() => {
                    this.sendRevealMessage(iframe, slideActionIndex);
                }, 100);
            };
            return;
        }

        // Same slide: just send postMessage
        this.sendRevealMessage(iframe, slideActionIndex);
    }

    getTargetSlideForAction(globalActionIndex) {
        // Find which slide should handle this global action
        for (let slideMap of this.slideActionMap) {
            if (globalActionIndex >= slideMap.globalActionStart &&
                globalActionIndex <= slideMap.globalActionEnd) {
                return this.partConfig.slides[slideMap.slideIndex];
            }
        }

        // Fallback to first slide
        return this.partConfig.slides[0];
    }

    getSlideActionIndex(globalActionIndex, targetSlide) {
        // Map global action to slide-specific action
        const slideMap = this.slideActionMap.find(map =>
            this.partConfig.slides[map.slideIndex] === targetSlide
        );

        if (slideMap) {
            return Math.max(0, globalActionIndex - slideMap.globalActionStart);
        }

        return 0;
    }

    sendRevealMessage(iframe, slideActionIndex) {
        try {
            console.log(`Sending postMessage: revealSection(${slideActionIndex})`);
            iframe.contentWindow.postMessage({
                type: 'revealSection',
                actionIndex: slideActionIndex
            }, '*');
        } catch (e) {
            console.warn('PostMessage failed, trying fallback:', e.message);
            this.fallbackRevealContent(iframe, slideActionIndex);
        }
    }

    fallbackRevealContent(iframe, actionIndex) {
        // Direct DOM access fallback for same-origin slides
        try {
            if (iframe.contentWindow && iframe.contentWindow.revealSection) {
                iframe.contentWindow.revealSection(actionIndex);
                console.log('Fallback direct access successful');
            }
        } catch (e) {
            console.error('Both postMessage and direct access failed:', e.message);
        }
    }

    async revealSingleSlideContent(globalActionIndex, options) {
        // Legacy method for single-slide parts
        const iframe = document.getElementById('slide-frame');
        if (!iframe || !iframe.contentDocument) return;

        const sections = iframe.contentDocument.querySelectorAll('[data-action]');

        sections.forEach((section) => {
            const sectionAction = parseInt(section.getAttribute('data-action'));

            if (sectionAction <= globalActionIndex) {
                section.classList.add('revealed');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            } else {
                section.classList.remove('revealed');
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            }
        });

        // Scroll to current content
        this.scrollToCurrentContent(globalActionIndex, options.immediate);
    }

    async updateIframeContent(actionIndex, options) {
        const iframe = this.slideRenderer.slideFrame;
        if (!iframe) return;

        const slideDocument = iframe.contentDocument || iframe.contentWindow.document;
        const sections = slideDocument.querySelectorAll('[data-action]');

        // Batch DOM updates for performance
        const updates = [];

        sections.forEach((section) => {
            const sectionAction = parseInt(section.getAttribute('data-action'));
            const shouldReveal = sectionAction <= actionIndex;

            updates.push(() => {
                if (shouldReveal) {
                    section.classList.add('revealed');
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                } else {
                    section.classList.remove('revealed');
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                }
            });
        });

        // Apply all updates in a single animation frame
        if (!options.immediate) {
            await new Promise(resolve => {
                requestAnimationFrame(() => {
                    updates.forEach(update => update());
                    resolve();
                });
            });
        } else {
            updates.forEach(update => update());
        }

        // Scroll to revealed content
        this.scrollToCurrentContent(actionIndex, options.immediate);
    }

    updateMainWindowContent(globalActionIndex) {
        // Update progress hint text with slide context
        const hintElement = document.getElementById('progress-hint');
        if (hintElement) {
            if (globalActionIndex < this.totalActions - 1) {
                const nextSlideIndex = this.getNextSlideIndex();
                if (nextSlideIndex !== this.currentSlideIndex && this.partConfig && this.partConfig.customSlides) {
                    const nextSlide = this.partConfig.slides[nextSlideIndex];
                    hintElement.textContent = `Next: ${nextSlide.title}`;
                } else {
                    hintElement.textContent = 'Next: Space or click to continue';
                }
            } else {
                hintElement.textContent = 'Next: Space for next part';
            }
        }

        // Update slide subtitle for current action
        this.updateSlideSubtitle(globalActionIndex);
    }

    updateSlideSubtitle(globalActionIndex) {
        const subtitleElement = document.querySelector('.slide-subtitle-dynamic');
        if (!subtitleElement) return;

        let description = '';

        if (this.partConfig && this.partConfig.customSlides) {
            // Multi-slide: show current slide and action
            const currentSlide = this.partConfig.slides[this.currentSlideIndex];
            const targetSlide = this.getTargetSlideForAction(globalActionIndex);
            const slideActionIndex = this.getSlideActionIndex(globalActionIndex, targetSlide);
            description = `${currentSlide.title} - Step ${slideActionIndex + 1}`;
        } else {
            // Single slide: use action map if available
            const actionInfo = this.actionMap && this.actionMap[globalActionIndex];
            description = actionInfo ? actionInfo.description : `Action ${globalActionIndex + 1}`;
        }

        if (description) {
            subtitleElement.textContent = description;
            subtitleElement.classList.add('subtitle-updated');

            setTimeout(() => {
                subtitleElement.classList.remove('subtitle-updated');
            }, 500);
        }
    }

    async animateContentReveal(actionIndex) {
        // Add entrance animations for newly revealed content
        const iframe = this.slideRenderer.slideFrame;
        if (!iframe) return;

        const slideDocument = iframe.contentDocument || iframe.contentWindow.document;
        const currentSection = slideDocument.querySelector(`[data-action="${actionIndex}"]`);

        if (currentSection) {
            // Add reveal animation class
            currentSection.classList.add('revealing');

            // Wait for animation to complete
            await new Promise(resolve => {
                const handleAnimationEnd = () => {
                    currentSection.removeEventListener('transitionend', handleAnimationEnd);
                    currentSection.classList.remove('revealing');
                    resolve();
                };

                currentSection.addEventListener('transitionend', handleAnimationEnd);

                // Fallback timeout
                setTimeout(() => {
                    handleAnimationEnd();
                }, 500);
            });
        }
    }

    handleSpecialInteractions(actionIndex) {
        // Handle special interactive elements that appear at this action
        const iframe = this.slideRenderer.slideFrame;
        if (!iframe) return;

        const slideDocument = iframe.contentDocument || iframe.contentWindow.document;
        const currentSection = slideDocument.querySelector(`[data-action="${actionIndex}"]`);

        if (currentSection) {
            // Activate interactive diagrams
            const interactiveDiagrams = currentSection.querySelectorAll('.interactive-diagram');
            interactiveDiagrams.forEach(diagram => {
                this.activateInteractiveDiagram(diagram);
            });

            // Start auto-animations
            const autoAnimations = currentSection.querySelectorAll('[data-auto-animate]');
            autoAnimations.forEach(element => {
                this.startAutoAnimation(element);
            });

            // Focus interactive elements
            const focusElements = currentSection.querySelectorAll('[data-focus-on-reveal]');
            if (focusElements.length > 0) {
                focusElements[0].focus();
            }
        }
    }

    activateInteractiveDiagram(diagram) {
        // Add click handlers for interactive elements
        const clickableElements = diagram.querySelectorAll('[onclick], [data-interactive]');

        clickableElements.forEach(element => {
            element.classList.add('interactive-ready');

            // Add hover effects
            element.addEventListener('mouseenter', () => {
                element.classList.add('interactive-hover');
            });

            element.addEventListener('mouseleave', () => {
                element.classList.remove('interactive-hover');
            });
        });
    }

    startAutoAnimation(element) {
        const animationType = element.getAttribute('data-auto-animate');

        switch (animationType) {
            case 'typewriter':
                this.startTypewriterAnimation(element);
                break;
            case 'counter':
                this.startCounterAnimation(element);
                break;
            case 'fade-in':
                this.startFadeInAnimation(element);
                break;
        }
    }

    startTypewriterAnimation(element) {
        const text = element.textContent;
        const speed = parseInt(element.getAttribute('data-speed')) || 50;

        element.textContent = '';
        element.style.opacity = '1';

        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text[i];
            i++;

            if (i >= text.length) {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    startCounterAnimation(element) {
        const targetValue = parseInt(element.getAttribute('data-target')) || 100;
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const startValue = 0;

        let currentValue = startValue;
        const increment = targetValue / (duration / 16); // 60fps

        const counterInterval = setInterval(() => {
            currentValue += increment;

            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counterInterval);
            }

            element.textContent = Math.floor(currentValue);
        }, 16);
    }

    scrollToCurrentContent(actionIndex, immediate = false) {
        const iframe = this.slideRenderer.slideFrame;
        if (!iframe) return;

        const slideDocument = iframe.contentDocument || iframe.contentWindow.document;
        const currentSection = slideDocument.querySelector(`[data-action="${actionIndex}"]`);

        if (currentSection) {
            currentSection.scrollIntoView({
                behavior: immediate ? 'auto' : 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    }

    updateProgressDisplay() {
        // Update progress dots
        const dotsElement = document.getElementById('progress-dots');
        if (dotsElement) {
            let dotsHTML = '';
            for (let i = 0; i < this.totalActions; i++) {
                dotsHTML += i <= this.currentGlobalAction ? '●' : '○';
            }
            dotsElement.textContent = dotsHTML;
        }

        // Update progress text
        const textElement = document.getElementById('progress-text');
        if (textElement) {
            textElement.textContent = `Action ${this.currentGlobalAction + 1} of ${this.totalActions}`;
        }

        // Update slide indicator for multi-slide parts
        const slideIndicator = document.getElementById('slide-indicator');
        if (slideIndicator && this.partConfig && this.partConfig.customSlides) {
            slideIndicator.textContent = `Slide ${this.currentSlideIndex + 1}/${this.partConfig.slides.length}`;
            slideIndicator.style.display = 'inline';
        } else if (slideIndicator) {
            slideIndicator.style.display = 'none';
        }

        // Update progress bar
        const fillElement = document.getElementById('progress-fill');
        if (fillElement) {
            const percentage = ((this.currentGlobalAction + 1) / this.totalActions) * 100;
            fillElement.style.width = `${percentage}%`;
        }

        // Update progress description with slide context
        this.updateProgressDescription();
    }

    updateProgressDescription() {
        const descElement = document.getElementById('progress-description');
        if (!descElement) return;

        if (this.partConfig && this.partConfig.customSlides) {
            // Multi-slide: show current slide info
            const currentSlide = this.partConfig.slides[this.currentSlideIndex];
            const targetSlide = this.getTargetSlideForAction(this.currentGlobalAction);
            const slideActionIndex = this.getSlideActionIndex(this.currentGlobalAction, targetSlide);

            descElement.textContent = `${currentSlide.title} - Action ${slideActionIndex + 1}`;
        } else {
            // Single slide: show action description
            const actionInfo = this.actionMap && this.actionMap[this.currentGlobalAction];
            descElement.textContent = actionInfo ? actionInfo.description : `Action ${this.currentGlobalAction + 1}`;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.disabled = this.currentGlobalAction === 0;
            prevBtn.classList.toggle('disabled', this.currentGlobalAction === 0);
        }

        if (nextBtn) {
            const isLastAction = this.currentGlobalAction >= this.totalActions - 1;

            if (isLastAction) {
                nextBtn.textContent = 'Next Part →';
                nextBtn.classList.add('next-part');
                nextBtn.classList.remove('next-slide');
            } else {
                // Check if next action will switch slides
                const nextSlideIndex = this.getNextSlideIndex();
                if (nextSlideIndex !== this.currentSlideIndex) {
                    const nextSlide = this.partConfig.slides[nextSlideIndex];
                    nextBtn.textContent = `→ ${nextSlide.title}`;
                    nextBtn.classList.add('next-slide');
                    nextBtn.classList.remove('next-part');
                } else {
                    nextBtn.textContent = 'Continue →';
                    nextBtn.classList.remove('next-slide', 'next-part');
                }
            }
        }
    }

    getNextSlideIndex() {
        if (!this.partConfig || !this.partConfig.customSlides) return 0;

        if (this.currentGlobalAction < this.totalActions - 1) {
            const nextTargetSlide = this.getTargetSlideForAction(this.currentGlobalAction + 1);
            return this.partConfig.slides.indexOf(nextTargetSlide);
        }
        return this.currentSlideIndex;
    }

    setupInteractionListeners() {
        // Listen for clicks on main content area to advance
        const mainContent = document.querySelector('.slide-display');
        if (mainContent) {
            mainContent.addEventListener('click', (e) => {
                // Only advance if clicking on non-interactive elements
                if (!e.target.closest('[onclick], [data-interactive], button, a')) {
                    this.nextAction();
                }
            });
        }

        // Listen for iframe-based interactions
        const iframe = this.slideRenderer.slideFrame;
        if (iframe) {
            const slideDocument = iframe.contentDocument || iframe.contentWindow.document;

            slideDocument.addEventListener('click', (e) => {
                // Handle clicks on interactive elements within slides
                if (e.target.closest('[data-advance-on-click]')) {
                    this.nextAction();
                }
            });
        }
    }

    // Public API for external control
    goToAction(actionIndex) {
        if (actionIndex >= 0 && actionIndex < this.totalActions) {
            this.currentGlobalAction = actionIndex;
            this.revealContent(actionIndex);
            this.updateProgressDisplay();
            this.updateNavigationButtons();
            console.log(`Jumped to global action ${actionIndex}`);
        }
    }

    resetPart() {
        this.goToAction(0);
    }

    getActionInfo() {
        return {
            current: this.currentGlobalAction,
            total: this.totalActions,
            currentSlideIndex: this.currentSlideIndex,
            slideActionMap: this.slideActionMap,
            partConfig: this.partConfig,
            progress: (this.currentGlobalAction + 1) / this.totalActions
        };
    }

    // Debug functionality
    debugCurrentState() {
        console.log('=== Progressive Disclosure Debug ===');
        console.log('Global action:', this.currentGlobalAction);
        console.log('Total actions:', this.totalActions);
        console.log('Current slide index:', this.currentSlideIndex);
        console.log('Part config:', this.partConfig);
        console.log('Slide action map:', this.slideActionMap);

        if (this.partConfig && this.partConfig.customSlides) {
            const targetSlide = this.getTargetSlideForAction(this.currentGlobalAction);
            const slideActionIndex = this.getSlideActionIndex(this.currentGlobalAction, targetSlide);
            console.log('Target slide:', targetSlide.file);
            console.log('Slide action index:', slideActionIndex);
        }
    }
}
```

## CSS Enhancements for Multi-Slide Progressive Disclosure

### Enhanced Animation Styles with PostMessage Support

```css
/* Progressive disclosure animations for multi-slide parts */
.slide-section {
    transition: all var(--transition-normal);
    opacity: 0;
    transform: translateY(20px);
    margin-bottom: var(--spacing-lg);
    will-change: opacity, transform;
}

.slide-section.revealed {
    opacity: 1;
    transform: translateY(0);
}

.slide-section.revealing {
    animation: contentReveal 0.5s ease-out forwards;
}

/* Slide transition animations */
.slide-frame {
    transition: opacity 0.3s ease-in-out;
}

.slide-frame.loading {
    opacity: 0.7;
    pointer-events: none;
}

/* Progress indicator enhancements */
.slide-indicator {
    font-size: 0.875rem;
    color: var(--secondary-text);
    margin-left: var(--spacing-sm);
    opacity: 0;
    transition: opacity var(--transition-normal);
}

.slide-indicator.visible {
    opacity: 1;
}

/* Button state variations */
.control-btn.next-slide {
    background: linear-gradient(135deg, var(--accent-color), #5a67d8);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.control-btn.next-part {
    background: linear-gradient(135deg, var(--success-color), #38a169);
    box-shadow: 0 4px 12px rgba(0, 168, 107, 0.3);
}

@keyframes contentReveal {
    0% {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    50% {
        opacity: 0.7;
        transform: translateY(10px) scale(0.98);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Staggered animations for child elements */
.slide-section.revealed .metric-card,
.slide-section.revealed .process-step {
    animation: staggeredFadeIn 0.4s ease-out forwards;
    opacity: 0;
}

.slide-section.revealed .metric-card:nth-child(1) { animation-delay: 0.1s; }
.slide-section.revealed .metric-card:nth-child(2) { animation-delay: 0.2s; }
.slide-section.revealed .metric-card:nth-child(3) { animation-delay: 0.3s; }

@keyframes staggeredFadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Interactive element states */
.interactive-ready {
    cursor: pointer;
    transition: all var(--transition-fast);
}

.interactive-hover {
    transform: scale(1.05);
    filter: brightness(1.1);
}

/* Progress indicator animations */
.progress-fill {
    transition: width var(--transition-slow) ease-out;
}

.subtitle-updated {
    animation: textHighlight 0.5s ease-out;
}

@keyframes textHighlight {
    0% { background: transparent; }
    50% { background: rgba(102, 126, 234, 0.2); }
    100% { background: transparent; }
}

/* Auto-animation styles with postMessage coordination */
[data-auto-animate="typewriter"] {
    opacity: 0;
    font-family: var(--font-family-mono);
}

[data-auto-animate="counter"] {
    font-weight: 700;
    color: var(--accent-color);
}

[data-auto-animate="fade-in"] {
    opacity: 0;
    transition: opacity 1s ease-in;
}

[data-auto-animate="fade-in"].animated {
    opacity: 1;
}

/* PostMessage communication indicators */
.debug-info {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: var(--spacing-sm);
    border-radius: 4px;
    font-size: 0.75rem;
    font-family: monospace;
    z-index: 1000;
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.debug-info.visible {
    opacity: 1;
}

/* Error state indicators */
.communication-error {
    color: var(--warning-color) !important;
    animation: errorPulse 1s ease-in-out infinite;
}

@keyframes errorPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Loading states for slide transitions */
.slide-transition-loading {
    position: relative;
}

.slide-transition-loading::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent-color);
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}
```

## PostMessage Event Listeners for Individual Slides

### Required Implementation for Each Slide File

```javascript
// Template for slide files to handle postMessage communication
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'revealSection') {
        console.log(`Slide received reveal message: action ${event.data.actionIndex}`);

        // Call slide-specific reveal function
        if (window.revealSection) {
            window.revealSection(event.data.actionIndex);
        }
    }

    if (event.data && event.data.type === 'debug') {
        console.log('Debug message received by slide:', event.data);

        // Send back slide metadata
        if (window.slideMetadata) {
            window.parent.postMessage({
                type: 'slideMetadata',
                metadata: window.slideMetadata
            }, '*');
        }
    }
});

// Required: Expose slide metadata
window.slideMetadata = {
    id: "[slide-id]",
    title: "[slide-title]",
    maxActions: [number],
    type: "[title|content|transition]",
    loaded: true
};

// Required: Expose reveal function for external control
window.revealSection = function(actionIndex) {
    // Slide-specific implementation
    console.log(`Revealing slide action: ${actionIndex}`);
};
```

This enhanced progressive disclosure system provides **robust postMessage communication**, dynamic slide switching, comprehensive error handling, and smooth animations while supporting both multi-slide parts and legacy single-slide parts.