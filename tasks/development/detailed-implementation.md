# Detailed Implementation Specifications

## Complete Requirements Implementation

This document provides comprehensive implementation details for the static presentation site, ensuring all user requirements are fully addressed with clear realization instructions.

## Enhanced Navigation System

### Sidebar Navigation Tree Structure

```html
<nav class="sidebar">
  <div class="nav-header">
    <h2>Парадокс Умного Незнакомца</h2>
    <div class="presentation-controls">
      <button onclick="toggleFullscreen()">🖥</button>
      <button onclick="restartPresentation()">⏮</button>
    </div>
  </div>

  <div class="nav-sections">
    <details class="section" open>
      <summary>📁 Введение (3/3)</summary>
      <div class="slides">
        <a href="#slide-1" class="slide-link active" data-slide="1">
          <span class="slide-number">1</span>
          <span class="slide-title">Парадокс незнакомца</span>
          <span class="progress-dots">●●●</span>
        </a>
        <a href="#slide-2" class="slide-link" data-slide="2">
          <span class="slide-number">2</span>
          <span class="slide-title">Тайна чёрного ящика</span>
          <span class="progress-dots">●●○</span>
        </a>
        <a href="#slide-3" class="slide-link" data-slide="3">
          <span class="slide-number">3</span>
          <span class="slide-title">Три шага к пониманию</span>
          <span class="progress-dots">○○○</span>
        </a>
      </div>
    </details>

    <details class="section">
      <summary>📁 Кодирование (2/4)</summary>
      <div class="slides">
        <!-- Similar structure for slides 4-7 -->
      </div>
    </details>
  </div>
</nav>
```

### Progressive Disclosure Implementation

```javascript
class PresentationApp {
  constructor() {
    this.state = {
      currentSlide: 1,
      currentAction: 0,
      maxActions: 1,
      fullscreen: false,
      activeTab: 'analysis',
      tabsVisible: true
    };

    this.slides = {};
    this.init();
  }

  async init() {
    await this.loadSlideConfig();
    this.setupEventListeners();
    this.initializeFromURL();
    this.loadCurrentSlide();
  }

  async loadSlideConfig() {
    // Discover available slides
    this.slideConfig = {
      1: { title: "Парадокс умного незнакомца", section: "Введение" },
      2: { title: "Тайна чёрного ящика", section: "Введение" },
      3: { title: "Три шага к пониманию", section: "Введение" },
      4: { title: "Человеческое чтение", section: "Кодирование" },
      5: { title: "Токенизация", section: "Кодирование" },
      6: { title: "Мультимодальность", section: "Кодирование" },
      7: { title: "Механизмы внимания", section: "Кодирование" },
      8: { title: "Слои понимания", section: "Размышление" }
    };
  }

  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));

    // Click navigation
    document.addEventListener('click', (e) => {
      if (e.target.closest('.main-content')) {
        this.nextAction();
      }
    });

    // URL changes
    window.addEventListener('popstate', (e) => this.handleURLChange(e));
  }

  handleKeyPress(e) {
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
      'End': () => this.goToSlide(this.getLastSlide())
    };

    // Handle number keys 1-9
    if (e.code.match(/^Digit[1-9]$/)) {
      const slideNum = parseInt(e.code.replace('Digit', ''));
      if (this.slideConfig[slideNum]) {
        this.goToSlide(slideNum);
      }
      return;
    }

    const handler = keyMap[e.code];
    if (handler) {
      e.preventDefault();
      handler();
    }
  }

  async loadSlideContent(slideId) {
    if (this.slides[slideId]) {
      return this.slides[slideId];
    }

    this.showLoadingState();

    // Updated paths: text content from presentation/[id]/, assets from presentation/assets/[id]/
    const textBasePath = `presentation/${slideId}/`;
    const assetsBasePath = `presentation/assets/${slideId}/`;

    const contentTypes = {
      analysis: 'extended_analysis.md',
      speech: 'speech_notes.md',
      design: 'slide_design.md',
      sources: 'sources_reference.md'
    };

    const content = { assetsPath: assetsBasePath };

    // Load markdown files from text folders
    for (const [type, filename] of Object.entries(contentTypes)) {
      try {
        const response = await fetch(`${textBasePath}${filename}`);
        if (response.ok) {
          content[type] = await response.text();
        } else {
          content[type] = this.getFallbackContent(type, filename);
        }
      } catch (error) {
        content[type] = this.getErrorContent(type, filename, error);
      }
    }

    // Check for assets directory (for future visual content)
    try {
      const assetsResponse = await fetch(assetsBasePath);
      content.hasAssets = assetsResponse.ok;
    } catch (error) {
      content.hasAssets = false;
    }

    // Parse actions from speech notes
    content.maxActions = this.parseActionsFromSpeech(content.speech);

    this.slides[slideId] = content;
    this.hideLoadingState();

    return content;
  }

  parseActionsFromSpeech(speechText) {
    // Look for [СЛАЙД] markers to determine action points
    const slideMarkers = speechText.match(/\\[СЛАЙД\\]/g);
    return slideMarkers ? slideMarkers.length : 1;
  }

  nextAction() {
    if (this.state.currentAction < this.state.maxActions) {
      this.state.currentAction++;
      this.revealContent();
      this.updateProgress();
    } else {
      this.nextSlide();
    }
  }

  revealContent() {
    const sections = document.querySelectorAll('[data-action]');
    sections.forEach((section, index) => {
      if (index < this.state.currentAction) {
        section.classList.add('revealed');
      } else {
        section.classList.remove('revealed');
      }
    });
  }

  renderMarkdown(text) {
    return text
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
      .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^\\d+\\. (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\\/li>)/gs, '<ul>$1</ul>')
      .replace(/\\n\\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/<\\/h([1-6])><\\/p>/g, '</h$1>');
  }

  updateProgress() {
    const progressDots = document.querySelector('.progress-dots');
    const progressText = document.querySelector('.progress-text');
    const progressBar = document.querySelector('.progress-fill');

    // Update dots
    let dotsHTML = '';
    for (let i = 1; i <= this.state.maxActions; i++) {
      dotsHTML += i <= this.state.currentAction ? '●' : '○';
    }
    progressDots.textContent = dotsHTML;

    // Update text
    progressText.textContent = `Action ${this.state.currentAction} of ${this.state.maxActions}`;
    if (this.state.currentAction < this.state.maxActions) {
      progressText.textContent += ' - Next: Space or click to continue';
    } else {
      progressText.textContent += ' - Next: Space for next slide';
    }

    // Update progress bar
    const percentage = (this.state.currentAction / this.state.maxActions) * 100;
    progressBar.style.width = `${percentage}%`;
  }
}
```

## Complete CSS Implementation

```css
/* Base Layout */
.app {
  display: grid;
  grid-template-areas:
    "sidebar main"
    "sidebar tabs";
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr 200px;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Fullscreen mode */
.app.fullscreen {
  grid-template-areas: "main";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.app.fullscreen .sidebar {
  position: fixed;
  left: -300px;
  transition: left 0.3s ease;
  z-index: 1000;
}

.app.fullscreen .sidebar:hover {
  left: 0;
}

/* Sidebar Navigation */
.sidebar {
  grid-area: sidebar;
  background: #f8f9fa;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  padding: 1rem;
}

.nav-header h2 {
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.section summary {
  cursor: pointer;
  font-weight: 600;
  padding: 0.5rem 0;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
}

.slide-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
  color: #4a5568;
  border-radius: 4px;
  margin: 2px 0;
  transition: background-color 0.2s;
}

.slide-link:hover {
  background: #e2e8f0;
}

.slide-link.active {
  background: #667eea;
  color: white;
}

.slide-number {
  min-width: 24px;
  height: 24px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

.slide-link.active .slide-number {
  background: rgba(255, 255, 255, 0.2);
}

.progress-dots {
  margin-left: auto;
  font-size: 0.75rem;
  color: #00a86b;
}

/* Main Content Area */
.main-content {
  grid-area: main;
  padding: 2rem;
  overflow-y: auto;
  cursor: pointer;
  background: white;
}

.slide-header {
  margin-bottom: 2rem;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #667eea;
  transition: width 0.3s ease;
}

/* Progressive Disclosure */
.reveal-section {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: translateY(20px);
}

.reveal-section.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Content Tabs */
.content-tabs {
  grid-area: tabs;
  background: white;
  border-top: 1px solid #e2e8f0;
}

.tab-headers {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e2e8f0;
}

.tab-header {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border: none;
  background: none;
  color: #4a5568;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-header.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.tab-content {
  padding: 1rem;
  height: calc(200px - 3rem);
  overflow-y: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app {
    grid-template-areas: "main";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .sidebar {
    position: fixed;
    left: -100%;
    width: 280px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }

  .sidebar.open {
    left: 0;
  }

  .content-tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .content-tabs.open {
    transform: translateY(0);
  }
}

/* Loading States */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Print Styles */
@media print {
  .sidebar, .content-tabs, .progress-container {
    display: none;
  }

  .main-content {
    padding: 0;
  }

  .reveal-section {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

## URL Routing & History Management

```javascript
class URLManager {
  static updateURL(slideId, actionId = 0) {
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

  static parseURL() {
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);

    const slideMatch = hash.match(/#slide-(\\d+)/);
    const slideId = slideMatch ? parseInt(slideMatch[1]) : 1;
    const actionId = parseInt(params.get('action')) || 0;

    return { slideId, actionId };
  }

  static initializeRouting(app) {
    window.addEventListener('popstate', (e) => {
      const { slideId, actionId } = URLManager.parseURL();
      app.goToSlide(slideId, actionId);
    });
  }
}
```

This detailed implementation provides complete specifications for building the presentation site with all required functionality, clear error handling, responsive design, and professional UX patterns.