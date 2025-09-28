# Progressive Disclosure Integration for Slide Pages

## Complete Integration System

This document details how progressive disclosure works across the presentation system, ensuring seamless coordination between slide content, navigation controls, and user interactions.

## Progressive Disclosure Architecture

### Data Flow Overview

```
User Action → Navigation Controller → Slide Renderer → Content Reveal → Progress Update
     ↓              ↓                    ↓               ↓              ↓
  Keyboard/Click → Parse Actions → Update iframe → CSS Transitions → UI Feedback
```

### Action Detection System

**Multi-Source Action Parsing:**
```javascript
class ActionDetector {
    static parseSlideActions(slideContent) {
        const sources = {
            speech: this.parseActionsFromSpeech(slideContent.speech),
            visual: this.parseActionsFromHTML(slideContent.visual),
            design: this.parseActionsFromDesign(slideContent.design)
        };

        // Take the maximum to ensure all content is accessible
        const maxActions = Math.max(...Object.values(sources), 1);

        return {
            maxActions,
            sources,
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

### Enhanced Progressive Disclosure Controller

```javascript
class ProgressiveDisclosureController {
    constructor(slideRenderer, navigationController) {
        this.slideRenderer = slideRenderer;
        this.navigationController = navigationController;
        this.currentSlide = null;
        this.currentAction = 0;
        this.maxActions = 1;
        this.actionMap = [];
        this.animationQueue = [];
        this.isAnimating = false;
    }

    initializeSlide(slideContent) {
        // Parse actions from all sources
        const actionData = ActionDetector.parseSlideActions(slideContent);

        this.maxActions = actionData.maxActions;
        this.actionMap = actionData.actionMap;
        this.currentAction = 0;

        // Initialize UI state
        this.updateProgressDisplay();
        this.updateNavigationButtons();

        // Reveal initial content
        this.revealContent(0, { immediate: true });

        // Set up interaction listeners
        this.setupInteractionListeners();
    }

    nextAction() {
        if (this.isAnimating) return false;

        if (this.currentAction < this.maxActions - 1) {
            this.currentAction++;
            this.revealContent(this.currentAction);
            this.updateProgressDisplay();
            this.updateNavigationButtons();
            return true; // Action within slide
        }

        return false; // Need to advance to next slide
    }

    prevAction() {
        if (this.isAnimating) return false;

        if (this.currentAction > 0) {
            this.currentAction--;
            this.revealContent(this.currentAction);
            this.updateProgressDisplay();
            this.updateNavigationButtons();
            return true; // Action within slide
        }

        return false; // Need to go to previous slide
    }

    async revealContent(actionIndex, options = {}) {
        if (this.isAnimating && !options.immediate) return;

        this.isAnimating = !options.immediate;

        try {
            // Update iframe content
            await this.updateIframeContent(actionIndex, options);

            // Update main window elements
            this.updateMainWindowContent(actionIndex);

            // Trigger animations
            if (!options.immediate) {
                await this.animateContentReveal(actionIndex);
            }

            // Handle special interactions
            this.handleSpecialInteractions(actionIndex);

        } finally {
            this.isAnimating = false;
        }
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

    updateMainWindowContent(actionIndex) {
        // Update any main window elements that sync with slide content
        const actionInfo = this.actionMap[actionIndex];

        // Update progress hint text
        const hintElement = document.getElementById('progress-hint');
        if (hintElement) {
            if (actionIndex < this.maxActions - 1) {
                hintElement.textContent = `Next: ${this.actionMap[actionIndex + 1]?.description || 'Continue'}`;
            } else {
                hintElement.textContent = 'Next: Space for next slide';
            }
        }

        // Update slide subtitle if it changes per action
        this.updateSlideSubtitle(actionIndex);
    }

    updateSlideSubtitle(actionIndex) {
        const actionInfo = this.actionMap[actionIndex];
        const subtitleElement = document.querySelector('.slide-subtitle-dynamic');

        if (subtitleElement && actionInfo.description) {
            subtitleElement.textContent = actionInfo.description;
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
            for (let i = 0; i < this.maxActions; i++) {
                dotsHTML += i <= this.currentAction ? '●' : '○';
            }
            dotsElement.textContent = dotsHTML;
        }

        // Update progress text
        const textElement = document.getElementById('progress-text');
        if (textElement) {
            textElement.textContent = `Action ${this.currentAction + 1} of ${this.maxActions}`;
        }

        // Update progress bar
        const fillElement = document.getElementById('progress-fill');
        if (fillElement) {
            const percentage = ((this.currentAction + 1) / this.maxActions) * 100;
            fillElement.style.width = `${percentage}%`;
        }

        // Update progress description
        const actionInfo = this.actionMap[this.currentAction];
        const descElement = document.getElementById('progress-description');
        if (descElement && actionInfo) {
            descElement.textContent = actionInfo.description;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.disabled = this.currentAction === 0;
            prevBtn.classList.toggle('disabled', this.currentAction === 0);
        }

        if (nextBtn) {
            const isLastAction = this.currentAction >= this.maxActions - 1;
            nextBtn.textContent = isLastAction ? 'Next Slide →' : 'Continue →';
            nextBtn.classList.toggle('next-slide', isLastAction);
        }
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
        if (actionIndex >= 0 && actionIndex < this.maxActions) {
            this.currentAction = actionIndex;
            this.revealContent(actionIndex);
            this.updateProgressDisplay();
            this.updateNavigationButtons();
        }
    }

    resetSlide() {
        this.goToAction(0);
    }

    getActionInfo() {
        return {
            current: this.currentAction,
            max: this.maxActions,
            map: this.actionMap,
            progress: (this.currentAction + 1) / this.maxActions
        };
    }
}
```

## CSS Enhancements for Progressive Disclosure

### Animation Styles

```css
/* Progressive disclosure animations */
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

.slide-section.revealing {
    animation: contentReveal 0.5s ease-out forwards;
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

/* Auto-animation styles */
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
```

This comprehensive progressive disclosure system ensures smooth, engaging transitions between content sections while maintaining perfect synchronization between slide content, navigation controls, and user feedback.