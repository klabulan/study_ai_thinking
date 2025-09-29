// ===== Presentation Application =====
class PresentationApp {
    constructor() {
        this.state = {
            currentSlide: 1,
            currentAction: 0,
            maxActions: 1,
            fullscreen: false,
            activeTab: 'analysis',
            tabsVisible: true,
            sidebarOpen: false,
            isLoading: false,
            startTime: null
        };

        this.slides = {};
        this.slideConfig = {};
        this.progressiveDisclosure = null;
        this.urlManager = null;

        this.init();
    }

    async init() {
        try {
            this.showLoadingScreen();
            this.updateLoadingProgress(10);

            // Initialize core systems
            this.setupEventListeners();
            this.updateLoadingProgress(30);

            // Load slide configuration
            await this.loadSlideConfiguration();
            this.updateLoadingProgress(50);

            // Initialize URL management
            this.urlManager = new URLManager(this);
            this.updateLoadingProgress(70);

            // Initialize progressive disclosure
            this.progressiveDisclosure = new ProgressiveDisclosureController(this);
            this.updateLoadingProgress(90);

            // Load initial slide from URL or default
            const { slideId } = this.urlManager.parseURL();
            await this.goToSlide(slideId || 1);
            this.updateLoadingProgress(100);

            // Start presentation timer
            this.startPresentationTimer();

            // Hide loading screen
            setTimeout(() => this.hideLoadingScreen(), 500);

        } catch (error) {
            console.error('Failed to initialize presentation:', error);
            this.showError('Failed to load presentation. Please refresh the page.');
            this.hideLoadingScreen();
        }
    }

    // ===== Core System Setup =====
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('beforeunload', () => this.handleBeforeUnload());

        // Click handlers for main content area
        const slideDisplay = document.getElementById('slide-display');
        if (slideDisplay) {
            slideDisplay.addEventListener('click', (e) => {
                if (!e.target.closest('button, a, [onclick], [data-interactive]')) {
                    this.nextAction();
                }
            });
        }

        // Touch events for mobile
        this.setupTouchEvents();

        // Resize functionality
        this.setupResizeHandle();
    }

    setupTouchEvents() {
        let startX, startY, startTime;

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const endTime = Date.now();

            const diffX = startX - endX;
            const diffY = startY - endY;
            const diffTime = endTime - startTime;

            // Only handle quick swipes
            if (diffTime > 500) return;

            // Horizontal swipe (navigation)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                e.preventDefault();
                if (diffX > 0) {
                    this.nextAction(); // Swipe left = next
                } else {
                    this.prevAction(); // Swipe right = previous
                }
            }
            // Vertical swipe (tabs/sidebar)
            else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    this.toggleTabs(); // Swipe up = toggle tabs
                } else {
                    this.toggleSidebar(); // Swipe down = toggle sidebar
                }
            }

            startX = startY = null;
        }, { passive: false });
    }

    setupResizeHandle() {
        const resizeHandle = document.getElementById('resize-handle');
        const app = document.getElementById('app');

        if (!resizeHandle || !app) return;

        let isResizing = false;
        let startY = 0;
        let startTabsHeight = 0;

        // Mouse events
        resizeHandle.addEventListener('mousedown', startResize);
        document.addEventListener('mousemove', doResize);
        document.addEventListener('mouseup', stopResize);

        // Touch events for mobile
        resizeHandle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startResize(e.touches[0]);
        });
        document.addEventListener('touchmove', (e) => {
            if (isResizing) {
                e.preventDefault();
                doResize(e.touches[0]);
            }
        });
        document.addEventListener('touchend', stopResize);

        function startResize(e) {
            isResizing = true;
            startY = e.clientY;

            // Get current tabs height from CSS custom property or computed style
            const computedStyle = getComputedStyle(document.documentElement);
            const currentTabsHeight = computedStyle.getPropertyValue('--tabs-height');
            startTabsHeight = parseInt(currentTabsHeight) || 240;

            app.classList.add('resizing');
            document.body.style.cursor = 'row-resize';
        }

        function doResize(e) {
            if (!isResizing) return;

            const deltaY = startY - e.clientY; // Inverted because we want up to increase height
            const newTabsHeight = Math.max(120, Math.min(600, startTabsHeight + deltaY));

            // Update CSS custom property
            document.documentElement.style.setProperty('--tabs-height', `${newTabsHeight}px`);

            // Update the grid layout
            app.style.gridTemplateRows = `1fr ${newTabsHeight}px`;
        }

        function stopResize() {
            if (!isResizing) return;

            isResizing = false;
            app.classList.remove('resizing');
            document.body.style.cursor = '';

            // Save the new size to localStorage
            const newTabsHeight = getComputedStyle(document.documentElement).getPropertyValue('--tabs-height');
            localStorage.setItem('presentation-tabs-height', newTabsHeight);
        }

        // Load saved size from localStorage
        const savedTabsHeight = localStorage.getItem('presentation-tabs-height');
        if (savedTabsHeight) {
            document.documentElement.style.setProperty('--tabs-height', savedTabsHeight);
            app.style.gridTemplateRows = `1fr ${savedTabsHeight}`;
        }
    }

    handleKeyPress(e) {
        // Don't handle keys when typing in inputs or if modal is open
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ||
            document.querySelector('.help-modal.visible, .error-modal.visible')) {
            return;
        }

        const keyMap = {
            'Space': () => this.nextAction(),
            'ArrowRight': () => this.nextAction(),
            'PageDown': () => this.nextAction(),
            'Backspace': () => this.prevAction(),
            'ArrowLeft': () => this.prevAction(),
            'PageUp': () => this.prevAction(),
            'F5': () => this.toggleFullscreen(),
            'Escape': () => this.exitFullscreen(),
            'Tab': () => this.toggleTabs(),
            'Home': () => this.goToSlide(1),
            'End': () => this.goToSlide(this.getLastSlideId()),
            'KeyR': () => e.ctrlKey && this.restartPresentation(),
            'Slash': () => this.showHelp(),
            'Question': () => this.showHelp()
        };

        // Handle number keys 1-9
        if (e.code.match(/^Digit[1-9]$/)) {
            const slideNum = parseInt(e.code.replace('Digit', ''));
            if (this.slideConfig[slideNum]) {
                e.preventDefault();
                this.goToSlide(slideNum);
            }
            return;
        }

        // Handle Ctrl+1-4 for tab switching
        if (e.ctrlKey && e.code.match(/^Digit[1-4]$/)) {
            const tabNum = parseInt(e.code.replace('Digit', ''));
            const tabs = ['analysis', 'speech', 'design', 'sources'];
            e.preventDefault();
            this.switchTab(tabs[tabNum - 1]);
            return;
        }

        const handler = keyMap[e.code];
        if (handler) {
            e.preventDefault();
            handler();
        }
    }

    handleResize() {
        // Update mobile layout
        this.updateMobileLayout();

        // Refresh iframe if needed
        if (this.state.currentSlide && window.innerWidth !== this.lastWidth) {
            this.refreshCurrentSlide();
            this.lastWidth = window.innerWidth;
        }
    }

    handleBeforeUnload() {
        // Save current state to localStorage
        localStorage.setItem('presentation-state', JSON.stringify({
            currentSlide: this.state.currentSlide,
            currentAction: this.state.currentAction,
            activeTab: this.state.activeTab,
            timestamp: Date.now()
        }));
    }

    // ===== Slide Configuration =====
    async loadSlideConfiguration() {
        // Define slide structure (can be loaded from JSON in the future)
        this.slideConfig = {
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
            2: {
                title: "Тайна чёрного ящика",
                section: "Введение",
                customSlides: true,
                slides: [
                    {
                        file: "presentation/assets/2/slides/2-1-investment-gap.html",
                        title: "Разрыв использования и понимания",
                        actions: 3
                    },
                    {
                        file: "presentation/assets/2/slides/2-2-russian-cases.html",
                        title: "Российские кейсы",
                        actions: 3
                    },
                    {
                        file: "presentation/assets/2/slides/2-3-cost-of-ignorance.html",
                        title: "Цена непонимания",
                        actions: 3
                    },
                    {
                        file: "presentation/assets/2/slides/2-4-black-box-opening.html",
                        title: "Открытие чёрного ящика",
                        actions: 2
                    }
                ]
            },
            3: { title: "Три шага к пониманию", section: "Введение" },
            4: { title: "Человеческое чтение", section: "Кодирование" },
            5: { title: "Токенизация", section: "Кодирование" },
            6: { title: "Мультимодальность", section: "Кодирование" },
            7: { title: "Механизмы внимания", section: "Кодирование" },
            8: { title: "Слои понимания", section: "Размышление" }
        };

        // Build navigation tree
        this.buildNavigationTree();
    }

    buildNavigationTree() {
        const navSections = document.getElementById('nav-sections');
        if (!navSections) return;

        // Group slides by section
        const sections = {};
        Object.entries(this.slideConfig).forEach(([id, config]) => {
            if (!sections[config.section]) {
                sections[config.section] = [];
            }
            sections[config.section].push({ id: parseInt(id), ...config });
        });

        // Build HTML
        let html = '';
        Object.entries(sections).forEach(([sectionName, slides]) => {
            html += `
                <details class="section" open>
                    <summary>📁 ${sectionName} (0/${slides.length})</summary>
                    <div class="slides">
            `;

            slides.forEach(slide => {
                html += `
                    <a href="#slide-${slide.id}" class="slide-link" data-slide="${slide.id}" onclick="app.goToSlide(${slide.id})">
                        <span class="slide-number">${slide.id}</span>
                        <span class="slide-title-nav">${slide.title}</span>
                        <span class="progress-dots-nav">○○○</span>
                    </a>
                `;
            });

            html += `
                    </div>
                </details>
            `;
        });

        navSections.innerHTML = html;
    }

    // ===== Content Loading =====
    async loadSlideContent(slideId) {
        if (this.slides[slideId]) {
            return this.slides[slideId];
        }

        const config = this.slideConfig[slideId];
        const content = {};
        const isFileProtocol = window.location.protocol === 'file:';

        // Handle custom slides (like our Part 1 assets)
        if (config && config.customSlides) {
            console.log('Loading custom slides for slide', slideId);

            // For custom slides, we use the first slide by default
            const firstSlide = config.slides[0];
            content.visual = firstSlide.file;
            content.hasVisual = true;

            // Calculate total actions across all slides in the part
            // For Part 1: 1 action for title + 4 actions for contrast = 5 total (0-4)
            content.maxActions = config.slides.reduce((total, slide) => total + slide.actions, 0) + 1;
            content.customSlides = config.slides;

            // Load markdown content for tabs (fallback to default structure)
            await this.loadMarkdownContent(content, slideId, isFileProtocol);

            this.slides[slideId] = content;
            return content;
        }

        // For file:// protocol, show informative message and use fallbacks
        if (isFileProtocol) {
            console.info(`🚀 Local Development Mode Detected`);
            console.info(`📁 To use external content files, run a local server:`);
            console.info(`   Python: python dev-server.py`);
            console.info(`   Node.js: node dev-server.js`);
            console.info(`   Or deploy to GitHub Pages for full functionality`);

            // Show visual indicator in UI
            this.showLocalModeIndicator();
        }

        // Load markdown content for tabs
        await this.loadMarkdownContent(content, slideId, isFileProtocol);

        // Load visual content for main display
        const visualPath = `presentation/assets/${slideId}/index.html`;
        if (isFileProtocol) {
            // Skip fetch attempts on file:// protocol
            content.visual = this.generateDefaultSlideHTML(slideId, content);
            content.hasCustomVisual = false;
        } else {
            // For HTTP/HTTPS protocols, try to fetch
            try {
                const visualResponse = await fetch(visualPath);
                if (visualResponse.ok) {
                    content.visual = await visualResponse.text();
                    content.hasCustomVisual = true;
                    console.info(`✅ Loaded visual content for slide ${slideId}`);
                } else {
                    console.info(`📄 No visual content found: ${visualPath}, generating from text`);
                    content.visual = this.generateDefaultSlideHTML(slideId, content);
                    content.hasCustomVisual = false;
                }
            } catch (error) {
                console.warn(`❌ Failed to load visual content for slide ${slideId}:`, error.message);
                content.visual = this.generateDefaultSlideHTML(slideId, content);
                content.hasCustomVisual = false;
            }
        }

        // Parse actions from content
        content.speechActions = this.parseActionsFromText(content.speech);
        content.visualActions = this.parseActionsFromHTML(content.visual);
        content.maxActions = Math.max(content.speechActions, content.visualActions, 1);

        // Cache the content
        this.slides[slideId] = content;
        return content;
    }

    async loadMarkdownContent(content, slideId, isFileProtocol) {
        // Load text content for tabs
        const textPath = `presentation/${slideId}/`;
        const textFiles = {
            analysis: 'extended_analysis.md',
            speech: 'speech_notes.md',
            design: 'slide_design.md',
            sources: 'sources_reference.md'
        };

        for (const [key, filename] of Object.entries(textFiles)) {
            if (isFileProtocol) {
                // Skip fetch attempts on file:// protocol to avoid CORS errors
                content[key] = this.getDefaultTextContent(key, slideId);
            } else {
                // For HTTP/HTTPS protocols, try to fetch
                try {
                    const response = await fetch(`${textPath}${filename}`);
                    if (response.ok) {
                        content[key] = await response.text();
                        console.info(`✅ Loaded ${filename} for slide ${slideId}`);
                    } else {
                        console.warn(`📄 File not found: ${textPath}${filename}, using fallback content`);
                        content[key] = this.getDefaultTextContent(key, slideId);
                    }
                } catch (error) {
                    console.warn(`❌ Failed to load ${filename} for slide ${slideId}:`, error.message);
                    content[key] = this.getDefaultTextContent(key, slideId);
                }
            }
        }
    }

    parseActionsFromText(text) {
        const slideMarkers = text.match(/\[СЛАЙД\]/g);
        return slideMarkers ? slideMarkers.length : 1;
    }

    parseActionsFromHTML(html) {
        const actionMatches = html.match(/data-action="(\d+)"/g);
        if (!actionMatches) return 1;

        const actionNumbers = actionMatches.map(match =>
            parseInt(match.match(/data-action="(\d+)"/)[1])
        );

        return Math.max(...actionNumbers) + 1;
    }

    getDefaultTextContent(type, slideId) {
        const config = this.slideConfig[slideId];
        const isFileProtocol = window.location.protocol === 'file:';

        const serverInstructions = isFileProtocol ? `

## 🚀 For External Content Files:

**Option 1: Local Server (Recommended)**
\`\`\`bash
# Python
python dev-server.py

# Node.js
node dev-server.js
\`\`\`

**Option 2: GitHub Pages**
1. Push to GitHub repository
2. Enable Pages in Settings
3. Access via: \`https://username.github.io/repo-name/\`

**Option 3: Use Built-in Content**
This placeholder content works for demonstration purposes.` : `

## 📁 Content File Expected
This content should be automatically loaded from \`presentation/${slideId}/${type}.md\`.

If you're seeing this message, the file may be missing or there's a loading issue.`;

        const defaults = {
            analysis: `# ${config.title}

## 📊 Analysis Content

This is placeholder content for the analysis tab.${serverInstructions}

### Expected File Location
\`presentation/${slideId}/extended_analysis.md\`

### Content Structure
- Key concepts and ideas
- Business implications
- Technical details
- Research findings
- Practical applications`,

            speech: `# 🎤 Speaker Notes: ${config.title}

[СЛАЙД] Introduction to ${config.title}

Welcome to this section on ${config.title}. This is the opening content that's always visible.

[СЛАЙД] Main concepts and examples

Here we dive into the core material, showing key concepts and real-world examples.

[СЛАЙД] Key takeaways and practical implications

Finally, we conclude with actionable insights and practical applications.${serverInstructions}

### Expected File Location
\`presentation/${slideId}/speech_notes.md\`

### How to Use [СЛАЙД] Markers
- Each \`[СЛАЙД]\` creates a new action
- Content between markers is revealed progressively
- Use this to control presentation flow`,

            design: `# 🎨 Design Specifications: ${config.title}

## Visual Design Guidelines${serverInstructions}

### Expected File Location
\`presentation/${slideId}/slide_design.md\`

### Design Elements to Include
- **Visual Concepts**: Layout and composition ideas
- **Color Schemes**: Primary and accent colors
- **Typography**: Font choices and hierarchy
- **Interactive Elements**: Buttons, hover effects, animations
- **Progressive Disclosure**: How content should be revealed
- **Responsive Design**: Mobile and desktop considerations`,

            sources: `# 📚 Sources and References: ${config.title}

## Research Sources${serverInstructions}

### Expected File Location
\`presentation/${slideId}/sources_reference.md\`

### Types of Sources to Include
- **Academic Research**: Peer-reviewed papers and studies
- **Business Data**: Company reports and statistics
- **Technical Documentation**: API docs, whitepapers
- **Case Studies**: Real-world implementations
- **Industry Reports**: Market analysis and trends
- **News Articles**: Recent developments and announcements`
        };

        return defaults[type] || `# ${type}

Content not available. Expected location: \`presentation/${slideId}/${type}.md\`${serverInstructions}`;
    }

    getErrorTextContent(type, filename) {
        return `# Error Loading Content\n\nFailed to load ${filename}. Please check your connection and try again.`;
    }

    generateDefaultSlideHTML(slideId, content) {
        const config = this.slideConfig[slideId];
        const speechSections = content.speech.split(/\[СЛАЙД\]/);

        let html = `
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
                    <p class="slide-subtitle">Auto-generated from speech notes</p>
                </div>
        `;

        speechSections.forEach((section, index) => {
            if (section.trim()) {
                html += `
                    <div class="slide-section" data-action="${index + 1}">
                        <div class="auto-generated-content">
                            ${this.convertMarkdownToHTML(section.trim())}
                        </div>
                    </div>
                `;
            }
        });

        html += '</body></html>';
        return html;
    }

    convertMarkdownToHTML(text) {
        return text
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, '<p>$1</p>')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
            .replace(/<p><ul>/g, '<ul>')
            .replace(/<\/ul><\/p>/g, '</ul>');
    }

    // ===== Navigation =====
    async goToSlide(slideId, actionIndex = 0) {
        if (this.state.isLoading) return;

        slideId = parseInt(slideId);
        if (!this.slideConfig[slideId]) return;

        this.state.isLoading = true;

        try {
            // Load slide content
            const content = await this.loadSlideContent(slideId);

            // Update state
            this.state.currentSlide = slideId;
            this.state.currentAction = actionIndex;
            this.state.maxActions = content.maxActions;

            // Render slide
            await this.renderSlide(slideId, content);

            // Update UI
            this.updateNavigationState();
            this.updateProgressDisplay();
            this.updateTabsContent(content);

            // Initialize progressive disclosure
            if (this.progressiveDisclosure) {
                this.progressiveDisclosure.initializeSlide(content);
                if (actionIndex > 0) {
                    this.progressiveDisclosure.goToAction(actionIndex);
                }
            }

            // Update URL
            if (this.urlManager) {
                this.urlManager.updateURL(slideId, actionIndex);
            }

        } catch (error) {
            console.error('Failed to load slide:', error);
            this.showError(`Failed to load slide ${slideId}. Please try again.`);
        } finally {
            this.state.isLoading = false;
        }
    }

    async renderSlide(slideId, content) {
        const config = this.slideConfig[slideId];

        // Load content in iframe
        const iframe = document.getElementById('slide-frame');
        if (iframe) {
            // For custom slides, load the file directly
            if (config && config.customSlides) {
                console.log('Loading custom slide directly:', content.visual);
                iframe.src = content.visual;
            } else {
                // For regular slides, inject global styles and create blob
                const styledContent = this.injectGlobalStyles(content.visual);
                const blob = new Blob([styledContent], { type: 'text/html' });
                const blobUrl = URL.createObjectURL(blob);
                iframe.src = blobUrl;
            }

            // Wait for iframe load
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => reject(new Error('Iframe load timeout')), 10000);

                iframe.onload = () => {
                    clearTimeout(timeout);
                    // Only revoke blob URLs for non-custom slides
                    if (!(config && config.customSlides) && typeof blobUrl !== 'undefined') {
                        URL.revokeObjectURL(blobUrl);
                    }
                    resolve();
                };

                iframe.onerror = () => {
                    clearTimeout(timeout);
                    // Only revoke blob URLs for non-custom slides
                    if (!(config && config.customSlides) && typeof blobUrl !== 'undefined') {
                        URL.revokeObjectURL(blobUrl);
                    }
                    reject(new Error('Iframe load error'));
                };
            });
        }
    }

    injectGlobalStyles(htmlContent) {
        const globalStyles = `
            <style>
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
                    --transition-normal: 0.3s ease;
                }

                body {
                    font-family: var(--font-family-main);
                    color: var(--primary-text);
                    line-height: 1.6;
                    margin: 0;
                    padding: var(--spacing-xl);
                    background: var(--background);
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

                .slide-section[data-action="0"] {
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

                .business-metric {
                    background: rgba(0, 168, 107, 0.1);
                    border-left: 4px solid var(--success-color);
                    padding: var(--spacing-lg);
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

                .highlight {
                    background: rgba(102, 126, 234, 0.1);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: 4px;
                    color: var(--accent-color);
                    font-weight: 500;
                }

                h1, h2, h3 { color: var(--primary-text); }
                strong { color: var(--accent-color); }
                em { color: var(--secondary-text); }
                code {
                    background: var(--background-secondary);
                    padding: 2px 4px;
                    border-radius: 3px;
                    font-family: monospace;
                }
            </style>
        `;

        // Insert styles into head
        if (htmlContent.includes('<head>')) {
            return htmlContent.replace('</head>', `${globalStyles}</head>`);
        } else {
            return htmlContent.replace('<html>', `<html><head>${globalStyles}</head>`);
        }
    }

    nextAction() {
        if (this.progressiveDisclosure) {
            const handled = this.progressiveDisclosure.nextAction();
            if (!handled) {
                this.nextSlide();
            }
        } else {
            this.nextSlide();
        }
    }

    prevAction() {
        if (this.progressiveDisclosure) {
            const handled = this.progressiveDisclosure.prevAction();
            if (!handled) {
                this.prevSlide();
            }
        } else {
            this.prevSlide();
        }
    }

    nextSlide() {
        const slideIds = Object.keys(this.slideConfig).map(Number).sort((a, b) => a - b);
        const currentIndex = slideIds.indexOf(this.state.currentSlide);

        if (currentIndex < slideIds.length - 1) {
            this.goToSlide(slideIds[currentIndex + 1]);
        }
    }

    prevSlide() {
        const slideIds = Object.keys(this.slideConfig).map(Number).sort((a, b) => a - b);
        const currentIndex = slideIds.indexOf(this.state.currentSlide);

        if (currentIndex > 0) {
            this.goToSlide(slideIds[currentIndex - 1]);
        }
    }

    getLastSlideId() {
        const slideIds = Object.keys(this.slideConfig).map(Number);
        return Math.max(...slideIds);
    }

    // ===== UI Updates =====
    updateNavigationState() {
        // Update sidebar active state
        document.querySelectorAll('.slide-link').forEach(link => {
            const slideId = parseInt(link.dataset.slide);
            link.classList.toggle('active', slideId === this.state.currentSlide);
        });

        // Update slide count
        const slideCountElement = document.getElementById('slide-count');
        const totalSlides = Object.keys(this.slideConfig).length;
        if (slideCountElement) {
            slideCountElement.textContent = `Slide ${this.state.currentSlide} of ${totalSlides}`;
        }
    }

    updateProgressDisplay() {
        // Update progress dots
        const dotsElement = document.getElementById('progress-dots');
        if (dotsElement) {
            let dotsHTML = '';
            for (let i = 0; i < this.state.maxActions; i++) {
                dotsHTML += i <= this.state.currentAction ? '●' : '○';
            }
            dotsElement.textContent = dotsHTML;
        }

        // Update progress text
        const textElement = document.getElementById('progress-text');
        if (textElement) {
            textElement.textContent = `Action ${this.state.currentAction + 1} of ${this.state.maxActions}`;
        }

        // Update progress bar
        const fillElement = document.getElementById('progress-fill');
        if (fillElement) {
            const percentage = ((this.state.currentAction + 1) / this.state.maxActions) * 100;
            fillElement.style.width = `${percentage}%`;
        }

        // Update progress hint
        const hintElement = document.getElementById('progress-hint');
        if (hintElement) {
            if (this.state.currentAction < this.state.maxActions - 1) {
                hintElement.textContent = 'Next: Space or click to continue';
            } else {
                hintElement.textContent = 'Next: Space for next slide';
            }
        }

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.disabled = this.state.currentSlide === 1 && this.state.currentAction === 0;
        }

        if (nextBtn) {
            const isLastAction = this.state.currentAction >= this.state.maxActions - 1;
            const isLastSlide = this.state.currentSlide === this.getLastSlideId();

            if (isLastAction && isLastSlide) {
                nextBtn.innerHTML = '<span class="btn-text">End</span><span class="btn-icon">🏁</span>';
                nextBtn.disabled = true;
            } else if (isLastAction) {
                nextBtn.innerHTML = '<span class="btn-text">Next Slide</span><span class="btn-icon">→</span>';
            } else {
                nextBtn.innerHTML = '<span class="btn-text">Continue</span><span class="btn-icon">→</span>';
            }
        }
    }

    updateTabsContent(content) {
        const tabs = ['analysis', 'speech', 'design', 'sources'];

        tabs.forEach(tab => {
            const tabPane = document.getElementById(`tab-${tab}`);
            if (tabPane && content[tab]) {
                tabPane.innerHTML = `<div class="markdown-content">${this.convertMarkdownToHTML(content[tab])}</div>`;
            }
        });
    }

    // ===== Tab Management =====
    switchTab(tabName) {
        // Update active tab header
        document.querySelectorAll('.tab-header').forEach(header => {
            header.classList.toggle('active', header.dataset.tab === tabName);
        });

        // Update active tab pane
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab-${tabName}`);
        });

        this.state.activeTab = tabName;
    }

    toggleTabs() {
        this.state.tabsVisible = !this.state.tabsVisible;
        const tabsElement = document.getElementById('content-tabs');

        if (window.innerWidth <= 768) {
            tabsElement.classList.toggle('open', this.state.tabsVisible);
        } else {
            tabsElement.classList.toggle('hidden', !this.state.tabsVisible);
        }
    }

    // ===== Fullscreen & Mobile =====
    toggleFullscreen() {
        if (document.fullscreenElement) {
            this.exitFullscreen();
        } else {
            this.enterFullscreen();
        }
    }

    enterFullscreen() {
        const app = document.getElementById('app');

        if (app.requestFullscreen) {
            app.requestFullscreen();
        } else if (app.webkitRequestFullscreen) {
            app.webkitRequestFullscreen();
        } else if (app.mozRequestFullScreen) {
            app.mozRequestFullScreen();
        }

        app.classList.add('fullscreen');
        this.state.fullscreen = true;
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }

        const app = document.getElementById('app');
        app.classList.remove('fullscreen');
        this.state.fullscreen = false;
    }

    toggleSidebar() {
        this.state.sidebarOpen = !this.state.sidebarOpen;
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');

        sidebar.classList.toggle('open', this.state.sidebarOpen);
        overlay.classList.toggle('visible', this.state.sidebarOpen);
    }

    updateMobileLayout() {
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
            // Reset mobile states on desktop
            this.state.sidebarOpen = false;
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('mobile-overlay').classList.remove('visible');
        }
    }

    // ===== Utility Functions =====
    restartPresentation() {
        this.goToSlide(1, 0);
        this.startPresentationTimer();
    }

    restartSlide() {
        this.goToSlide(this.state.currentSlide, 0);
    }

    refreshCurrentSlide() {
        const currentSlide = this.state.currentSlide;
        const currentAction = this.state.currentAction;

        // Clear cached content
        delete this.slides[currentSlide];

        // Reload slide
        this.goToSlide(currentSlide, currentAction);
    }

    startPresentationTimer() {
        this.state.startTime = Date.now();
        this.updatePresentationTimer();

        this.timerInterval = setInterval(() => {
            this.updatePresentationTimer();
        }, 1000);
    }

    updatePresentationTimer() {
        if (!this.state.startTime) return;

        const elapsed = Date.now() - this.state.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        const timeElement = document.getElementById('presentation-time');
        if (timeElement) {
            timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // ===== Loading & Error Handling =====
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    updateLoadingProgress(percentage) {
        const progressBar = document.getElementById('loading-progress');
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }

    showError(message) {
        const errorModal = document.getElementById('error-modal');
        const errorMessage = document.getElementById('error-message');

        if (errorModal && errorMessage) {
            errorMessage.textContent = message;
            errorModal.classList.add('visible');
        }
    }

    closeError() {
        const errorModal = document.getElementById('error-modal');
        if (errorModal) {
            errorModal.classList.remove('visible');
        }
    }

    retryLoad() {
        this.closeError();
        this.refreshCurrentSlide();
    }

    showHelp() {
        const helpModal = document.getElementById('help-modal');
        if (helpModal) {
            helpModal.classList.add('visible');
        }
    }

    closeHelp() {
        const helpModal = document.getElementById('help-modal');
        if (helpModal) {
            helpModal.classList.remove('visible');
        }
    }

    showLocalModeIndicator() {
        // Only show once per session
        if (this.localModeShown) return;
        this.localModeShown = true;

        // Create and show a temporary notice
        const notice = document.createElement('div');
        notice.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;

        notice.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span>🖥️</span>
                <div>
                    <div style="font-weight: 600;">Local Development Mode</div>
                    <div style="font-size: 12px; opacity: 0.9;">Using built-in content. Run dev-server for external files.</div>
                </div>
            </div>
        `;

        document.body.appendChild(notice);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            notice.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (notice.parentNode) {
                    notice.parentNode.removeChild(notice);
                }
            }, 300);
        }, 5000);

        // Add CSS animations if not already present
        if (!document.querySelector('#local-mode-animations')) {
            const style = document.createElement('style');
            style.id = 'local-mode-animations';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===== Progressive Disclosure Controller =====
class ProgressiveDisclosureController {
    constructor(app) {
        this.app = app;
        this.currentAction = 0;
        this.maxActions = 1;
    }

    initializeSlide(content) {
        this.maxActions = content.maxActions;
        this.currentAction = 0;
        this.revealContent(0);
    }

    nextAction() {
        if (this.currentAction < this.maxActions - 1) {
            this.currentAction++;
            this.app.state.currentAction = this.currentAction;
            this.revealContent(this.currentAction);
            this.app.updateProgressDisplay();
            return true;
        }
        return false;
    }

    prevAction() {
        if (this.currentAction > 0) {
            this.currentAction--;
            this.app.state.currentAction = this.currentAction;
            this.revealContent(this.currentAction);
            this.app.updateProgressDisplay();
            return true;
        }
        return false;
    }

    goToAction(actionIndex) {
        if (actionIndex >= 0 && actionIndex < this.maxActions) {
            this.currentAction = actionIndex;
            this.app.state.currentAction = actionIndex;
            this.revealContent(actionIndex);
            this.app.updateProgressDisplay();
        }
    }

    revealContent(actionIndex) {
        const iframe = document.getElementById('slide-frame');
        if (!iframe) return;

        console.log('Revealing content for action:', actionIndex);

        // For custom slides, check if we need to switch slides
        const currentSlideId = this.app.state.currentSlide;
        const slideConfig = this.app.slideConfig[currentSlideId];

        if (slideConfig && slideConfig.customSlides) {
            // Determine which slide should be shown based on action
            const targetSlide = this.getTargetSlideForAction(slideConfig, actionIndex);
            const currentSrc = iframe.src;
            const expectedSrc = window.location.origin + '/' + targetSlide.file;

            // If we need to switch slides, do it first
            if (!currentSrc.includes(targetSlide.file)) {
                console.log('Switching to slide:', targetSlide.file);
                iframe.src = targetSlide.file;

                // Wait for the iframe to load before sending message
                iframe.onload = () => {
                    setTimeout(() => {
                        this.sendRevealMessage(iframe, actionIndex);
                    }, 100);
                };
                return;
            }
        }

        // Send reveal message to current slide
        this.sendRevealMessage(iframe, actionIndex);
    }

    getTargetSlideForAction(slideConfig, actionIndex) {
        const currentSlideId = this.app.state.currentSlide;

        if (currentSlideId === 1) {
            // Part 1: action 0 = title slide, actions 1+ = contrast slide
            if (actionIndex === 0) {
                return slideConfig.slides[0]; // Title slide
            } else {
                return slideConfig.slides[1]; // Contrast slide
            }
        } else if (currentSlideId === 2) {
            // Part 2: distribute actions across 4 slides
            // Slide 2-1 (Investment gap): actions 0-2 (3 actions: 0,1,2)
            // Slide 2-2 (Russian cases): actions 3-5 (3 actions: 0,1,2)
            // Slide 2-3 (Cost of ignorance): actions 6-8 (3 actions: 0,1,2)
            // Slide 2-4 (Black box opening): actions 9-11 (2 actions: 0,1)
            if (actionIndex <= 2) {
                return slideConfig.slides[0]; // Investment gap (actions 0-2)
            } else if (actionIndex <= 5) {
                return slideConfig.slides[1]; // Russian cases (actions 3-5)
            } else if (actionIndex <= 8) {
                return slideConfig.slides[2]; // Cost of ignorance (actions 6-8)
            } else {
                return slideConfig.slides[3]; // Black box opening (actions 9-11)
            }
        }

        // Default fallback
        return slideConfig.slides[0];
    }

    getSlideActionIndex(slideConfig, globalActionIndex, targetSlide) {
        const currentSlideId = this.app.state.currentSlide;

        if (currentSlideId === 1) {
            // Part 1 mapping
            if (targetSlide === slideConfig.slides[0]) {
                // Title slide: always action 0
                return 0;
            } else {
                // Contrast slide: map actions 1+ to 0-3
                return Math.max(0, globalActionIndex - 1);
            }
        } else if (currentSlideId === 2) {
            // Part 2 mapping
            if (targetSlide === slideConfig.slides[0]) {
                // Investment gap slide: global actions 0-2 → slide actions 0-2
                return Math.min(globalActionIndex, 2);
            } else if (targetSlide === slideConfig.slides[1]) {
                // Russian cases slide: global actions 3-5 → slide actions 0-2
                return Math.max(0, Math.min(globalActionIndex - 3, 2));
            } else if (targetSlide === slideConfig.slides[2]) {
                // Cost of ignorance slide: global actions 6-8 → slide actions 0-2
                return Math.max(0, Math.min(globalActionIndex - 6, 2));
            } else if (targetSlide === slideConfig.slides[3]) {
                // Black box opening slide: global actions 9-11 → slide actions 0-1
                return Math.max(0, Math.min(globalActionIndex - 9, 1));
            }
        }

        // Default fallback
        return Math.max(0, globalActionIndex);
    }

    sendRevealMessage(iframe, actionIndex) {
        const currentSlideId = this.app.state.currentSlide;
        const slideConfig = this.app.slideConfig[currentSlideId];
        let slideActionIndex = actionIndex;

        // Adjust action index for custom slides
        if (slideConfig && slideConfig.customSlides) {
            const targetSlide = this.getTargetSlideForAction(slideConfig, actionIndex);
            slideActionIndex = this.getSlideActionIndex(slideConfig, actionIndex, targetSlide);
            console.log(`Global action ${actionIndex} → Slide action ${slideActionIndex} for ${targetSlide.title}`);
        }

        // Try postMessage communication first (for new slide format)
        try {
            iframe.contentWindow.postMessage({
                type: 'revealSection',
                actionIndex: slideActionIndex
            }, '*');
            console.log('Sent postMessage revealSection with action:', slideActionIndex);
            return;
        } catch (e) {
            console.log('Could not send postMessage:', e.message);
        }

        // Fallback: try direct DOM manipulation (for legacy slides)
        try {
            if (iframe.contentDocument) {
                console.log('Using direct DOM manipulation with action:', actionIndex);
                const slideDocument = iframe.contentDocument;
                const sections = slideDocument.querySelectorAll('[data-action]');

                sections.forEach((section) => {
                    const sectionAction = parseInt(section.getAttribute('data-action'));

                    if (sectionAction <= actionIndex) {
                        section.classList.add('revealed');
                    } else {
                        section.classList.remove('revealed');
                    }
                });

                // Scroll to current content
                const currentSection = slideDocument.querySelector(`[data-action="${actionIndex}"]`);
                if (currentSection) {
                    currentSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        } catch (e) {
            console.log('Could not access iframe.contentDocument:', e.message);
        }

        console.log('Progressive disclosure attempt completed');
    }
}

// ===== URL Manager =====
class URLManager {
    constructor(app) {
        this.app = app;
        this.setupPopstateListener();
    }

    parseURL() {
        const hash = window.location.hash;
        const params = new URLSearchParams(window.location.search);

        const slideMatch = hash.match(/#slide-(\d+)/);
        const slideId = slideMatch ? parseInt(slideMatch[1]) : null;
        const actionId = parseInt(params.get('action')) || 0;

        return { slideId, actionId };
    }

    updateURL(slideId, actionId = 0) {
        const url = new URL(window.location);
        url.hash = `slide-${slideId}`;

        if (actionId > 0) {
            url.searchParams.set('action', actionId);
        } else {
            url.searchParams.delete('action');
        }

        history.pushState(
            { slideId, actionId },
            `Slide ${slideId}`,
            url.toString()
        );
    }

    setupPopstateListener() {
        window.addEventListener('popstate', (e) => {
            const { slideId, actionId } = this.parseURL();
            if (slideId) {
                this.app.goToSlide(slideId, actionId);
            }
        });
    }
}

// ===== Global Functions (for onclick handlers) =====
let app;

function nextAction() {
    if (app) app.nextAction();
}

function prevAction() {
    if (app) app.prevAction();
}

function toggleFullscreen() {
    if (app) app.toggleFullscreen();
}

function restartPresentation() {
    if (app) app.restartPresentation();
}

function restartSlide() {
    if (app) app.restartSlide();
}

function toggleTabs() {
    if (app) app.toggleTabs();
}

function toggleSidebar() {
    if (app) app.toggleSidebar();
}

function switchTab(tabName) {
    if (app) app.switchTab(tabName);
}

function showHelp() {
    if (app) app.showHelp();
}

function closeHelp() {
    if (app) app.closeHelp();
}

function closeError() {
    if (app) app.closeError();
}

function retryLoad() {
    if (app) app.retryLoad();
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    app = new PresentationApp();
});

// ===== Service Worker Registration (Optional) =====
// Disabled - no sw.js file available
/*
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
*/