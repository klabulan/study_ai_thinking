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

    // ===== Slide Configuration (Dynamic Loading from data.json) =====
    async loadSlideConfiguration() {
        this.slideConfig = {};

        try {
            // Auto-detect available parts by scanning assets directory
            const availableParts = await this.detectAvailableParts();
            console.log('Detected available parts:', availableParts);

            // Load configuration for each detected part
            for (const partId of availableParts) {
                try {
                    const partConfig = await this.loadPartConfiguration(partId);
                    this.slideConfig[partId] = partConfig;
                    console.log(`✅ Loaded configuration for part ${partId}:`, partConfig.title);
                } catch (error) {
                    console.warn(`⚠️ Failed to load configuration for part ${partId}:`, error.message);
                    // Create fallback configuration
                    this.slideConfig[partId] = this.createFallbackConfig(partId);
                }
            }

            // Ensure we have at least some slides
            if (Object.keys(this.slideConfig).length === 0) {
                console.warn('No parts detected, creating fallback configurations');
                this.createFallbackSlides();
            }

        } catch (error) {
            console.error('Failed to load slide configuration:', error);
            // Create emergency fallback
            this.createFallbackSlides();
        }

        // Build navigation tree
        this.buildNavigationTree();
    }

    async detectAvailableParts() {
        const availableParts = [];
        const isFileProtocol = window.location.protocol === 'file:';

        // For file:// protocol, assume parts 1-16 exist (extended range)
        if (isFileProtocol) {
            console.info('🖥️ File protocol detected - using fallback part detection');
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 15, 16];
        }

        // For HTTP/HTTPS, try to detect parts dynamically (extended range)
        for (let i = 1; i <= 20; i++) {
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
                // Part doesn't exist, continue silently
            }
        }

        return availableParts.length > 0 ? availableParts : [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 15, 16];
    }

    async loadPartConfiguration(partId) {
        const dataPath = `presentation/assets/${partId}/data.json`;
        const isFileProtocol = window.location.protocol === 'file:';

        if (isFileProtocol) {
            // For file protocol, return fallback config
            return this.createFallbackConfig(partId);
        }

        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${dataPath}: ${response.status}`);
        }

        const partData = await response.json();
        return this.transformDataToConfig(partData, partId);
    }

    transformDataToConfig(partData, partId) {
        // Handle different data.json formats
        const isNewFormat = partData.part && partData.slides;
        const isLegacyFormat = partData.partId && partData.slides;

        if (isNewFormat) {
            // Part 2+ format
            return {
                title: partData.part.title,
                section: partData.part.section || "Unknown",
                customSlides: partData.part.customSlides || false,
                slides: partData.slides.map(slide => ({
                    file: `presentation/assets/${partData.part.id}/${slide.file}`,
                    title: slide.title,
                    actions: slide.maxActions || 0,
                    duration: slide.duration || 60,
                    type: slide.type || "content",
                    id: slide.id
                }))
            };
        } else if (isLegacyFormat) {
            // Part 1 format
            return {
                title: partData.partTitle,
                section: "Введение", // Could be extracted from partData if added
                customSlides: partData.structure === "multi-slide",
                slides: partData.slides.map(slide => ({
                    file: `presentation/assets/${partData.partId}/${slide.file}`,
                    title: slide.title,
                    actions: slide.maxActions || 0,
                    duration: slide.duration || 60,
                    type: slide.type || "content",
                    id: slide.id
                }))
            };
        } else {
            // Unknown format, create basic config
            return this.createFallbackConfig(partId);
        }
    }

    createFallbackConfig(partId) {
        const fallbackTitles = {
            1: "Парадокс умного незнакомца",
            2: "Тайна чёрного ящика",
            3: "Три шага к пониманию",
            4: "Человеческое чтение",
            5: "Токенизация",
            6: "Мультимодальность",
            7: "Механизмы внимания",
            8: "Слои понимания"
        };

        const fallbackSections = {
            1: "Введение", 2: "Введение", 3: "Введение",
            4: "Кодирование", 5: "Кодирование", 6: "Кодирование", 7: "Кодирование",
            8: "Размышление"
        };

        return {
            title: fallbackTitles[partId] || `Part ${partId}`,
            section: fallbackSections[partId] || "Unknown",
            customSlides: false // Will use legacy loading
        };
    }

    createFallbackSlides() {
        // Emergency fallback configuration
        this.slideConfig = {
            1: this.createFallbackConfig(1),
            2: this.createFallbackConfig(2),
            3: this.createFallbackConfig(3),
            4: this.createFallbackConfig(4),
            5: this.createFallbackConfig(5),
            6: this.createFallbackConfig(6),
            7: this.createFallbackConfig(7),
            8: this.createFallbackConfig(8)
        };
    }

    buildNavigationTree() {
        const navSections = document.getElementById('nav-sections');
        if (!navSections) return;

        // Define phase mapping
        const phaseMapping = {
            1: { phase: 'Act I: Основы', icon: '🏁', order: 1 },
            2: { phase: 'Act I: Основы', icon: '🏁', order: 1 },
            3: { phase: 'Act I: Основы', icon: '🏁', order: 1 },
            4: { phase: 'Фаза 1: Кодирование', icon: '🔍', order: 2 },
            5: { phase: 'Фаза 1: Кодирование', icon: '🔍', order: 2 },
            6: { phase: 'Фаза 1: Кодирование', icon: '🔍', order: 2 },
            7: { phase: 'Фаза 2: Размышление', icon: '🧠', order: 3 },
            8: { phase: 'Фаза 2: Размышление', icon: '🧠', order: 3 },
            9: { phase: 'Фаза 2: Размышление', icon: '🧠', order: 3 },
            12: { phase: 'Фаза 3: Генерация', icon: '✨', order: 4 },
            13: { phase: 'Фаза 3: Генерация', icon: '✨', order: 4 },
            15: { phase: 'Act III: Практика', icon: '🎯', order: 5 },
            16: { phase: 'Интерактивная Сессия', icon: '🙋‍♀️', order: 6 }
        };

        // Group slides by phase
        const phases = {};
        Object.entries(this.slideConfig).forEach(([id, config]) => {
            const slideId = parseInt(id);
            const mapping = phaseMapping[slideId] || { phase: 'Другое', icon: '📋', order: 6 };

            if (!phases[mapping.phase]) {
                phases[mapping.phase] = {
                    slides: [],
                    icon: mapping.icon,
                    order: mapping.order
                };
            }
            phases[mapping.phase].slides.push({ id: slideId, ...config });
        });

        // Sort phases by order and slides by ID
        const sortedPhases = Object.entries(phases)
            .sort(([,a], [,b]) => a.order - b.order)
            .map(([phaseName, phaseData]) => [
                phaseName,
                {
                    ...phaseData,
                    slides: phaseData.slides.sort((a, b) => a.id - b.id)
                }
            ]);

        // Build HTML
        let html = '';
        sortedPhases.forEach(([phaseName, phaseData]) => {
            const completedCount = 0; // Will be updated dynamically
            html += `
                <details class="section" open>
                    <summary>${phaseData.icon} ${phaseName} (${completedCount}/${phaseData.slides.length})</summary>
                    <div class="slides">
            `;

            phaseData.slides.forEach(slide => {
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

        // Handle custom slides (loaded from data.json)
        if (config && config.customSlides && config.slides && config.slides.length > 0) {
            console.log('Loading custom slides for slide', slideId, '- slides found:', config.slides.length);

            // For custom slides, we use the first slide by default
            const firstSlide = config.slides[0];
            content.visual = firstSlide.file;
            content.hasVisual = true;

            // Calculate total actions across all slides in the part
            // Each slide's maxActions represents the highest action index (0-based)
            // So maxActions: 2 means actions 0, 1, 2 (3 total actions)
            content.maxActions = config.slides.reduce((total, slide) => {
                const slideActionCount = (slide.actions || 0) + 1; // +1 because maxActions is 0-based
                return total + slideActionCount;
            }, 0);

            // Ensure minimum of 1 action
            content.maxActions = Math.max(content.maxActions, 1);
            content.customSlides = config.slides;

            console.log(`Part ${slideId}: Total actions calculated:`, content.maxActions);

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

        // Parse actions from content (for legacy slides without data.json)
        content.speechActions = this.parseActionsFromText(content.speech);
        content.visualActions = this.parseActionsFromHTML(content.visual);
        content.maxActions = Math.max(content.speechActions, content.visualActions, 1);

        console.log(`Part ${slideId} (legacy): Actions from speech: ${content.speechActions}, visual: ${content.visualActions}, max: ${content.maxActions}`);

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
        // Configure marked for GitHub-flavored markdown
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                gfm: true,         // GitHub Flavored Markdown
                breaks: true,      // Convert \n to <br>
                pedantic: false,   // Don't be overly strict
                sanitize: false,   // Allow HTML (we control the content)
                smartLists: true,  // Use smarter list behavior
                smartypants: false // Don't use smart quotes
            });
            return marked.parse(text);
        }

        // Fallback to simple parser if marked is not loaded
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
        // Check if content already has custom styling
        if (htmlContent.includes(':root {') || htmlContent.includes('font-size:') || htmlContent.includes('<style>')) {
            // Content has custom styling, don't inject our styles
            return htmlContent;
        }

        const globalStyles = `
            <style>
                :root {
                    /* Enhanced colors for big screen visibility */
                    --primary-text: #1a202c;
                    --secondary-text: #4a5568;
                    --accent-color: #667eea;
                    --success-color: #00a86b;
                    --warning-color: #ff6b6b;
                    --background: #ffffff;
                    --background-secondary: #f7fafc;
                    --border-color: #e2e8f0;
                    --font-family-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

                    /* Balanced spacing for slide content */
                    --spacing-xs: 0.5rem;
                    --spacing-sm: 0.75rem;
                    --spacing-md: 1.2rem;
                    --spacing-lg: 1.8rem;
                    --spacing-xl: 2.4rem;

                    /* Font sizes - only for auto-generated content */
                    --font-size-xs: 1rem;
                    --font-size-sm: 1.125rem;
                    --font-size-base: 1.25rem;
                    --font-size-lg: 1.4rem;
                    --font-size-xl: 1.75rem;
                    --font-size-2xl: 2.25rem;
                    --font-size-3xl: 3rem;
                    --font-size-4xl: 4rem;

                    /* Enhanced brightness for slide content */
                    --text-brightness: 1.1;

                    --transition-normal: 0.3s ease;
                }

                body {
                    font-family: var(--font-family-main);
                    color: var(--primary-text);
                    line-height: 1.6;
                    margin: 0;
                    padding: var(--spacing-xl);
                    background: var(--background);
                    font-size: var(--font-size-base);
                    font-weight: 500;
                    filter: brightness(var(--text-brightness));
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
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    color: var(--primary-text);
                    margin-bottom: var(--spacing-lg);
                    line-height: 1.1;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .slide-subtitle {
                    font-size: var(--font-size-2xl);
                    font-weight: 500;
                    color: var(--secondary-text);
                    margin-bottom: var(--spacing-xl);
                    filter: brightness(var(--text-brightness));
                }

                .business-metric {
                    background: rgba(0, 168, 107, 0.1);
                    border-left: 6px solid var(--success-color);
                    padding: var(--spacing-md);
                    margin: var(--spacing-md) 0;
                    border-radius: 0 6px 6px 0;
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                }

                .tech-concept {
                    background: rgba(255, 107, 107, 0.05);
                    border: 2px solid rgba(255, 107, 107, 0.2);
                    padding: var(--spacing-md);
                    border-radius: 6px;
                    margin: var(--spacing-md) 0;
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                }

                .highlight {
                    background: rgba(102, 126, 234, 0.15);
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: 6px;
                    color: var(--accent-color);
                    font-weight: 700;
                    font-size: 1.2em;
                }

                /* Only apply to auto-generated slides */
                .auto-generated-content {
                    font-size: var(--font-size-base);
                    line-height: 1.5;
                }

                .auto-generated-content h1 { font-size: var(--font-size-4xl); }
                .auto-generated-content h2 { font-size: var(--font-size-3xl); }
                .auto-generated-content h3 { font-size: var(--font-size-2xl); }
                .auto-generated-content h4 { font-size: var(--font-size-xl); }
                .auto-generated-content p { font-size: var(--font-size-base); }
                .auto-generated-content li { font-size: var(--font-size-base); }
                .auto-generated-content ul, .auto-generated-content ol {
                    margin: var(--spacing-sm) 0;
                    padding-left: var(--spacing-lg);
                }

                /* Only enhance specific utility classes if they exist */
                .slide-description { font-size: var(--font-size-sm); }
                .slide-comment { font-size: var(--font-size-sm); }
                .slide-note { font-size: var(--font-size-sm); }

                h1 {
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    color: var(--primary-text);
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-bottom: var(--spacing-lg);
                    line-height: 1.2;
                }
                h2 {
                    font-size: var(--font-size-3xl);
                    font-weight: 700;
                    color: var(--primary-text);
                    margin-bottom: var(--spacing-lg);
                    line-height: 1.3;
                }
                h3 {
                    font-size: var(--font-size-2xl);
                    font-weight: 600;
                    color: var(--primary-text);
                    margin-bottom: var(--spacing-md);
                    line-height: 1.4;
                }
                h4 {
                    font-size: var(--font-size-xl);
                    font-weight: 600;
                    color: var(--primary-text);
                    margin-bottom: var(--spacing-md);
                    line-height: 1.4;
                }
                h5 {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--primary-text);
                    margin-bottom: var(--spacing-sm);
                    line-height: 1.5;
                }
                h6 {
                    font-size: var(--font-size-base);
                    font-weight: 600;
                    color: var(--secondary-text);
                    margin-bottom: var(--spacing-sm);
                    line-height: 1.5;
                }
                p {
                    font-size: var(--font-size-base);
                    font-weight: 500;
                    line-height: 1.6;
                    margin-bottom: var(--spacing-sm);
                }
                strong {
                    color: var(--accent-color);
                    font-weight: 700;
                }
                em {
                    color: var(--secondary-text);
                    font-style: italic;
                    font-weight: 500;
                }
                code {
                    background: var(--background-secondary);
                    padding: 6px 10px;
                    border-radius: 6px;
                    font-family: monospace;
                    font-size: var(--font-size-base);
                    font-weight: 600;
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
        if (!slideConfig.slides || slideConfig.slides.length === 0) {
            return null;
        }

        // Dynamic calculation based on slide action counts
        let cumulativeActions = 0;

        for (const slide of slideConfig.slides) {
            const slideActionCount = (slide.actions || 0) + 1; // +1 for initial state (action 0)

            if (actionIndex < cumulativeActions + slideActionCount) {
                return slide;
            }

            cumulativeActions += slideActionCount;
        }

        // Default to last slide if actionIndex exceeds total
        return slideConfig.slides[slideConfig.slides.length - 1];
    }

    getSlideActionIndex(slideConfig, globalActionIndex, targetSlide) {
        if (!slideConfig.slides || slideConfig.slides.length === 0 || !targetSlide) {
            return Math.max(0, globalActionIndex);
        }

        // Dynamic calculation based on slide positions and action counts
        let cumulativeActions = 0;

        for (const slide of slideConfig.slides) {
            const slideActionCount = (slide.actions || 0) + 1;

            if (slide === targetSlide) {
                // Return the local action index within this slide
                const localActionIndex = globalActionIndex - cumulativeActions;
                return Math.max(0, Math.min(localActionIndex, slide.actions || 0));
            }

            cumulativeActions += slideActionCount;
        }

        // Fallback: return 0 if slide not found
        return 0;
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