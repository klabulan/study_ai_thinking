# Standardized Part Template v2.0

## Complete Implementation Template for New Parts

This document provides a comprehensive template for implementing new presentation parts using the proven multi-slide architecture with postMessage communication. Based on the successful **Part 1 implementation**.

## Implementation Decision Tree

### Step 1: Determine Part Type

**Multi-slide parts** (use when you need):
- Multiple distinct visual layouts within one part
- Sophisticated transitions between concepts
- Different slide types (title, content, transition)
- Complex progressive disclosure with slide switching

**Single slide parts** (use when you have):
- Consistent visual layout throughout
- Simple progressive disclosure within one view
- Straightforward step-by-step revelation

## Multi-Slide Part Template

### Directory Structure Template

```
presentation/assets/[PART_ID]/
├── slides/
│   ├── [PART_ID]-1-[NAME].html     # Title/intro slide
│   ├── [PART_ID]-2-[NAME].html     # Main content slide
│   ├── [PART_ID]-3-[NAME].html     # Optional additional slides
│   └── ...
├── images/
│   ├── [descriptive-name].svg      # Diagrams and illustrations
│   └── [other-assets].png
├── data.json                       # Part metadata
├── navigation.html                 # Local navigation hub
├── test-system.html               # Comprehensive tester
└── index.html                     # Optional legacy combined
```

### Main System Configuration Template

Add to `script.js` slideConfig:

```javascript
[PART_ID]: {
    title: "[Part Title in Russian]",
    section: "[Section Name]",
    customSlides: true,
    slides: [
        {
            file: "presentation/assets/[PART_ID]/slides/[PART_ID]-1-[name].html",
            title: "[Slide 1 Title]",
            actions: [NUMBER_OF_ACTIONS]
        },
        {
            file: "presentation/assets/[PART_ID]/slides/[PART_ID]-2-[name].html",
            title: "[Slide 2 Title]",
            actions: [NUMBER_OF_ACTIONS]
        }
        // Add more slides as needed
    ]
},
```

### Progressive Disclosure Controller Configuration

Add action mapping logic to `ProgressiveDisclosureController`:

```javascript
// In getTargetSlideForAction method, add case for your part:
if (this.currentPart === [PART_ID]) {
    if (actionIndex === 0) {
        return slideConfig.slides[0]; // Title slide
    } else if (actionIndex <= [THRESHOLD]) {
        return slideConfig.slides[1]; // Main content slide
    } else {
        return slideConfig.slides[2]; // Additional slides
    }
}

// In getSlideActionIndex method, add mapping:
if (this.currentPart === [PART_ID]) {
    if (targetSlide === slideConfig.slides[0]) {
        return 0; // Title slide action
    } else if (targetSlide === slideConfig.slides[1]) {
        return Math.max(0, globalActionIndex - 1); // Offset for second slide
    } else {
        return Math.max(0, globalActionIndex - [OFFSET]); // Offset for additional slides
    }
}
```

### Individual Slide File Template

**Template for each slide file:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide [PART_ID].[SLIDE_NUMBER]: [Slide Title]</title>
    <style>
        :root {
            --primary-text: #2d3748;
            --secondary-text: #6c757d;
            --accent-color: #667eea;
            --success-color: #00a86b;
            --warning-color: #ff6b6b;
            --background: #ffffff;
            --background-secondary: #f8f9fa;
            --border-color: #e2e8f0;

            --font-family-main: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

            --spacing-sm: 0.5rem;
            --spacing-md: 1rem;
            --spacing-lg: 1.5rem;
            --spacing-xl: 2rem;

            --transition-normal: 0.5s ease;
            --transition-fast: 0.3s ease;
        }

        body {
            margin: 0;
            padding: var(--spacing-xl);
            font-family: var(--font-family-main);
            background: var(--background);
            color: var(--primary-text);
            height: 100vh;
            box-sizing: border-box;
            overflow: hidden;
        }

        .slide-section {
            opacity: 0;
            transform: translateY(20px);
            transition: all var(--transition-normal);
            margin-bottom: var(--spacing-lg);
        }

        .slide-section.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        /* Add your specific styles here */
        .slide-title {
            font-size: 3rem;
            font-weight: 700;
            color: var(--primary-text);
            margin-bottom: var(--spacing-lg);
            text-align: center;
        }

        /* Responsive design */
        @media (max-width: 768px) {
            body {
                padding: var(--spacing-md);
            }

            .slide-title {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Progressive disclosure sections -->
    <div class="slide-section" data-action="0">
        <h1 class="slide-title">[Initial Content]</h1>
        <!-- Add your initial content here -->
    </div>

    <div class="slide-section" data-action="1">
        <!-- Action 1 content -->
        <div class="content-block">
            [Content for action 1]
        </div>
    </div>

    <div class="slide-section" data-action="2">
        <!-- Action 2 content -->
        <div class="content-block">
            [Content for action 2]
        </div>
    </div>

    <!-- Add more sections as needed -->

    <script>
        let currentAction = -1;
        const maxActions = [NUMBER_OF_ACTIONS]; // Update this number

        // Auto-reveal initial content on load
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                revealSection(0);
            }, 300);
        });

        function revealSection(actionIndex) {
            console.log(`Slide [SLIDE_ID]: revealSection called with: ${actionIndex}`);
            currentAction = actionIndex;

            // Reveal elements for current and previous actions
            for (let i = 0; i <= actionIndex; i++) {
                const elements = document.querySelectorAll(`[data-action="${i}"]`);
                console.log(`Action ${i}: found ${elements.length} elements`);
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('revealed');
                    }, index * 100); // Stagger animations
                });
            }

            // Hide elements for future actions
            for (let i = actionIndex + 1; i <= maxActions; i++) {
                const elements = document.querySelectorAll(`[data-action="${i}"]`);
                elements.forEach(element => {
                    element.classList.remove('revealed');
                });
            }
        }

        // Global function for external control (REQUIRED)
        window.revealSection = revealSection;

        // PostMessage listener (REQUIRED)
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'revealSection') {
                console.log(`[SLIDE_ID] received postMessage:`, event.data);
                revealSection(event.data.actionIndex);
            }
        });

        // Slide metadata (REQUIRED)
        window.slideMetadata = {
            id: "[SLIDE_ID]",
            title: "[Slide Title]",
            duration: [EXPECTED_DURATION_SECONDS],
            maxActions: maxActions,
            type: "[title|content|transition]",
            actions: [
                { index: 0, description: "[Action 0 description]", timing: "[timing]" },
                { index: 1, description: "[Action 1 description]", timing: "[timing]" },
                // Add more action descriptions
            ]
        };
    </script>
</body>
</html>
```

### Test System Template

**test-system.html template:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Part [PART_ID] Test System</title>
    <style>
        :root {
            --primary-text: #2d3748;
            --secondary-text: #6c757d;
            --accent-color: #667eea;
            --success-color: #00a86b;
            --background: #ffffff;
            --background-secondary: #f8f9fa;
            --border-color: #e2e8f0;

            --spacing-sm: 0.5rem;
            --spacing-md: 1rem;
            --spacing-lg: 1.5rem;
            --spacing-xl: 2rem;

            --transition-normal: 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--background-secondary);
            height: 100vh;
            display: flex;
            overflow: hidden;
        }

        .sidebar {
            width: 300px;
            background: white;
            border-right: 1px solid var(--border-color);
            padding: var(--spacing-lg);
            overflow-y: auto;
            flex-shrink: 0;
        }

        .main-container {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .content-area {
            flex: 1;
            position: relative;
        }

        .slide-frame {
            width: 100%;
            height: 100%;
            border: none;
            background: white;
        }

        .test-header {
            background: white;
            padding: var(--spacing-lg);
            border-bottom: 1px solid var(--border-color);
            text-align: center;
        }

        .slide-nav button {
            width: 100%;
            padding: var(--spacing-md);
            margin-bottom: var(--spacing-sm);
            border: 1px solid var(--border-color);
            background: white;
            color: var(--primary-text);
            border-radius: 6px;
            cursor: pointer;
            transition: all var(--transition-normal);
            text-align: left;
        }

        .slide-nav button:hover {
            background: var(--background-secondary);
            border-color: var(--accent-color);
        }

        .slide-nav button.active {
            background: var(--accent-color);
            color: white;
            border-color: var(--accent-color);
        }

        .controls {
            margin-top: var(--spacing-lg);
            padding-top: var(--spacing-lg);
            border-top: 1px solid var(--border-color);
        }

        .action-controls {
            margin: var(--spacing-md) 0;
        }

        .action-btn {
            width: 40px;
            height: 40px;
            margin: 2px;
            border: 1px solid var(--border-color);
            background: white;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-normal);
        }

        .action-btn:hover {
            background: var(--background-secondary);
        }

        .action-btn.active {
            background: var(--success-color);
            color: white;
            border-color: var(--success-color);
        }

        .nav-controls button {
            flex: 1;
            padding: var(--spacing-md);
            margin: var(--spacing-sm);
            border: 1px solid var(--border-color);
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all var(--transition-normal);
        }

        .nav-controls button:hover {
            background: var(--accent-color);
            color: white;
        }

        .nav-controls {
            display: flex;
        }

        .metadata-display {
            margin-top: var(--spacing-lg);
            padding: var(--spacing-md);
            background: var(--background-secondary);
            border-radius: 6px;
            font-size: 0.875rem;
            color: var(--secondary-text);
        }

        h1 {
            color: var(--primary-text);
            margin-bottom: var(--spacing-lg);
            font-size: 1.5rem;
        }

        h2 {
            color: var(--primary-text);
            margin: var(--spacing-lg) 0 var(--spacing-md) 0;
            font-size: 1.125rem;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h1>Part [PART_ID] Test</h1>

        <h2>Slides</h2>
        <div class="slide-nav" id="slideNav">
            <button onclick="loadSlide('slides/[PART_ID]-1-[name].html', this)">[PART_ID].1 Title</button>
            <button onclick="loadSlide('slides/[PART_ID]-2-[name].html', this)">[PART_ID].2 Content</button>
            <!-- Add more slide buttons as needed -->
        </div>

        <div class="controls">
            <h2>Actions</h2>
            <div class="action-controls" id="actionControls">
                <!-- Action buttons will be generated dynamically -->
            </div>

            <div class="nav-controls">
                <button onclick="prevAction()">← Previous</button>
                <button onclick="nextAction()">Next →</button>
            </div>

            <button onclick="resetSlide()" style="width: 100%; margin-top: var(--spacing-md);">
                Reset Slide
            </button>

            <button onclick="startAutoDemo()" style="width: 100%; margin-top: var(--spacing-sm);">
                Auto Demo
            </button>
        </div>

        <div class="metadata-display" id="metadataDisplay">
            <strong>Slide Metadata:</strong><br>
            <span id="metadataContent">Load a slide to see metadata</span>
        </div>
    </div>

    <div class="main-container">
        <div class="test-header">
            <h1>Part [PART_ID]: [Part Title]</h1>
            <p>Action: <span id="currentAction">0</span> |
               Slide: <span id="currentSlide">[PART_ID].1</span></p>
        </div>

        <div class="content-area">
            <iframe id="slideFrame" class="slide-frame" src="slides/[PART_ID]-1-[name].html"></iframe>
        </div>
    </div>

    <script>
        let currentActionIndex = 0;
        let maxActions = 4; // Will be updated based on slide metadata
        let currentSlideButton = null;
        let autoDemo = false;

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Load first slide by default
            const firstButton = document.querySelector('.slide-nav button');
            if (firstButton) {
                loadSlide(firstButton.onclick.toString().match(/'([^']+)'/)[1], firstButton);
            }
        });

        function loadSlide(slideUrl, buttonElement) {
            console.log('Loading slide:', slideUrl);

            // Update active button
            if (currentSlideButton) {
                currentSlideButton.classList.remove('active');
            }
            buttonElement.classList.add('active');
            currentSlideButton = buttonElement;

            // Load slide in iframe
            const iframe = document.getElementById('slideFrame');
            iframe.src = slideUrl;

            // Update current slide display
            const slideId = slideUrl.split('/').pop().split('.')[0];
            document.getElementById('currentSlide').textContent = slideId;

            // Reset action index
            currentActionIndex = 0;
            document.getElementById('currentAction').textContent = currentActionIndex;

            // Wait for slide to load, then get metadata
            iframe.onload = function() {
                setTimeout(() => {
                    updateSlideMetadata();
                    generateActionButtons();
                }, 100);
            };
        }

        function updateSlideMetadata() {
            const iframe = document.getElementById('slideFrame');

            try {
                if (iframe.contentWindow && iframe.contentWindow.slideMetadata) {
                    const metadata = iframe.contentWindow.slideMetadata;
                    maxActions = metadata.maxActions || 4;

                    document.getElementById('metadataContent').innerHTML = `
                        <strong>ID:</strong> ${metadata.id}<br>
                        <strong>Title:</strong> ${metadata.title}<br>
                        <strong>Max Actions:</strong> ${metadata.maxActions}<br>
                        <strong>Type:</strong> ${metadata.type}<br>
                        <strong>Duration:</strong> ${metadata.duration}s
                    `;
                } else {
                    document.getElementById('metadataContent').textContent = 'Metadata not accessible (cross-origin)';
                    maxActions = 4; // Default fallback
                }
            } catch (e) {
                console.log('Cannot access slide metadata:', e.message);
                document.getElementById('metadataContent').textContent = 'Cannot access metadata: ' + e.message;
                maxActions = 4; // Default fallback
            }
        }

        function generateActionButtons() {
            const container = document.getElementById('actionControls');
            container.innerHTML = '';

            for (let i = 0; i <= maxActions; i++) {
                const button = document.createElement('button');
                button.className = 'action-btn';
                button.textContent = i;
                button.onclick = () => goToAction(i);

                if (i === currentActionIndex) {
                    button.classList.add('active');
                }

                container.appendChild(button);
            }
        }

        function goToAction(actionIndex) {
            if (actionIndex < 0 || actionIndex > maxActions) return;

            currentActionIndex = actionIndex;
            document.getElementById('currentAction').textContent = currentActionIndex;

            // Send message to slide
            const iframe = document.getElementById('slideFrame');
            try {
                iframe.contentWindow.postMessage({
                    type: 'revealSection',
                    actionIndex: actionIndex
                }, '*');
            } catch (e) {
                console.warn('PostMessage failed:', e.message);

                // Fallback: try direct function call
                if (iframe.contentWindow && iframe.contentWindow.revealSection) {
                    iframe.contentWindow.revealSection(actionIndex);
                }
            }

            // Update action button states
            document.querySelectorAll('.action-btn').forEach((btn, index) => {
                btn.classList.toggle('active', index === actionIndex);
            });
        }

        function nextAction() {
            if (currentActionIndex < maxActions) {
                goToAction(currentActionIndex + 1);
            }
        }

        function prevAction() {
            if (currentActionIndex > 0) {
                goToAction(currentActionIndex - 1);
            }
        }

        function resetSlide() {
            goToAction(0);
        }

        function startAutoDemo() {
            if (autoDemo) return;

            autoDemo = true;
            resetSlide();

            let actionIndex = 0;
            const demoInterval = setInterval(() => {
                goToAction(actionIndex);
                actionIndex++;

                if (actionIndex > maxActions) {
                    clearInterval(demoInterval);
                    autoDemo = false;
                }
            }, 2000);
        }

        // Listen for messages from slides
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'slideMetadata') {
                console.log('Received slide metadata:', event.data.metadata);
            }
        });
    </script>
</body>
</html>
```

### Navigation Hub Template

**navigation.html template:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Part [PART_ID] Navigation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #f8f9fa;
        }

        .nav-container {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #2d3748;
            margin-bottom: 2rem;
            text-align: center;
        }

        .nav-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .nav-link {
            display: block;
            padding: 1.5rem;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .nav-link:hover {
            background: #5a67d8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .test-link {
            background: #00a86b;
        }

        .test-link:hover {
            background: #38a169;
        }

        .back-link {
            background: #6c757d;
        }

        .back-link:hover {
            background: #5a6268;
        }

        .description {
            color: #6c757d;
            text-align: center;
            margin-bottom: 2rem;
        }

        .slide-list {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .slide-list h3 {
            color: #2d3748;
            margin-bottom: 1rem;
        }

        .slide-list ul {
            list-style: none;
            padding: 0;
        }

        .slide-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e2e8f0;
        }

        .slide-list li:last-child {
            border-bottom: none;
        }
    </style>
</head>
<body>
    <div class="nav-container">
        <h1>Part [PART_ID]: [Part Title]</h1>

        <p class="description">
            Navigation hub for testing and developing Part [PART_ID] slides.
        </p>

        <div class="slide-list">
            <h3>Available Slides</h3>
            <ul>
                <li>[PART_ID].1: [Slide 1 Title] - [Duration]s - [Actions] actions</li>
                <li>[PART_ID].2: [Slide 2 Title] - [Duration]s - [Actions] actions</li>
                <!-- Add more slides as needed -->
            </ul>
        </div>

        <div class="nav-grid">
            <a href="slides/[PART_ID]-1-[name].html" class="nav-link">
                📖 Slide 1: [Title]
            </a>

            <a href="slides/[PART_ID]-2-[name].html" class="nav-link">
                🎯 Slide 2: [Title]
            </a>

            <!-- Add more slide links as needed -->

            <a href="test-system.html" class="nav-link test-link">
                🧪 Test System
            </a>

            <a href="../../../index.html" class="nav-link back-link">
                ← Back to Main
            </a>
        </div>
    </div>
</body>
</html>
```

### Data Metadata Template

**data.json template:**

```json
{
    "partId": "[PART_ID]",
    "title": "[Part Title in Russian]",
    "section": "[Section Name]",
    "description": "[Brief description of the part]",
    "type": "multi-slide",
    "totalActions": [TOTAL_ACTIONS_ACROSS_ALL_SLIDES],
    "estimatedDuration": "[TOTAL_MINUTES]",
    "slides": [
        {
            "id": "[PART_ID]-1",
            "file": "slides/[PART_ID]-1-[name].html",
            "title": "[Slide 1 Title]",
            "type": "title",
            "actions": [NUMBER],
            "duration": "[SECONDS]",
            "description": "[What this slide covers]"
        },
        {
            "id": "[PART_ID]-2",
            "file": "slides/[PART_ID]-2-[name].html",
            "title": "[Slide 2 Title]",
            "type": "content",
            "actions": [NUMBER],
            "duration": "[SECONDS]",
            "description": "[What this slide covers]"
        }
    ],
    "assets": [
        {
            "file": "images/[name].svg",
            "type": "diagram",
            "description": "[What the asset represents]"
        }
    ],
    "created": "[DATE]",
    "lastModified": "[DATE]",
    "version": "1.0"
}
```

## Single Slide Part Template

For simpler parts that don't need multiple slides:

### Configuration

```javascript
[PART_ID]: {
    title: "[Part Title]",
    section: "[Section Name]"
    // No customSlides property = uses legacy loading
}
```

### Directory Structure

```
presentation/assets/[PART_ID]/
├── index.html                  # Single slide file
├── images/
│   └── [assets].svg
├── data.json                   # Part metadata
└── test.html                   # Simple tester
```

## Implementation Checklist

### Technical Requirements
- [ ] **PostMessage communication** implemented in all slide files
- [ ] **Progressive disclosure** working with proper action mapping
- [ ] **Slide metadata** exposed via `window.slideMetadata`
- [ ] **Console logging** clear and helpful for debugging
- [ ] **Cross-origin security** handled properly
- [ ] **Action mapping** configured in main ProgressiveDisclosureController

### Testing Requirements
- [ ] **Local test system** functional with all slides
- [ ] **Navigation hub** with working links
- [ ] **Individual slide testing** works independently
- [ ] **Main system integration** works with continue button
- [ ] **Action progression** follows expected sequence
- [ ] **Error handling** graceful when slides fail to load

### Content Requirements
- [ ] **Visual consistency** with established design system
- [ ] **Responsive design** works on different screen sizes
- [ ] **Performance** - slides load quickly and smoothly
- [ ] **Browser compatibility** tested in major browsers

### Development Workflow
1. **Create directory structure** using template
2. **Implement individual slides** with postMessage support
3. **Configure main system** slideConfig and action mapping
4. **Test locally** using test-system.html
5. **Integrate with main system** and verify continue button works
6. **Validate all requirements** using checklist

This standardized template ensures consistent implementation across all parts while maintaining the robust postMessage communication and multi-slide architecture proven in Part 1.