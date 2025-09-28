# Slide Content Styling Templates

## Complete Styling System for Slide Pages

This document provides comprehensive styling templates and guidelines for creating consistent, professional slide content that integrates seamlessly with the presentation system.

## Core Styling Framework

### Base Template Structure

**Standard Slide Template (`presentation/assets/[slideId]/index.html`):**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide [Number]: [Title]</title>
    <style>
        /* Slide-specific styles can be added here */
        /* Global styles will be injected by the presentation system */
    </style>
</head>
<body class="slide-content">
    <!-- Action 0: Always visible on slide load -->
    <div class="slide-section" data-action="0">
        <h1 class="slide-title">[Slide Title]</h1>
        <p class="slide-subtitle">[Subtitle or brief description]</p>
    </div>

    <!-- Action 1: First progressive disclosure -->
    <div class="slide-section" data-action="1">
        <!-- Content revealed on first action -->
    </div>

    <!-- Action 2: Second progressive disclosure -->
    <div class="slide-section" data-action="2">
        <!-- Content revealed on second action -->
    </div>

    <!-- Additional actions as needed -->
</body>
</html>
```

## Content Type Templates

### 1. Business Metrics Display

**Template:**
```html
<div class="slide-section" data-action="1">
    <div class="metrics-grid">
        <div class="metric-card">
            <div class="metric-header">
                <img src="images/tinkoff-logo.svg" alt="Tinkoff" class="company-logo">
                <span class="metric-category">Credit Decisions</span>
            </div>
            <div class="metric-value">95%</div>
            <div class="metric-description">решений за 2 минуты</div>
            <div class="metric-detail">Billions processed monthly</div>
        </div>

        <div class="metric-card">
            <div class="metric-header">
                <img src="images/sber-logo.svg" alt="Sber" class="company-logo">
                <span class="metric-category">Customer Interactions</span>
            </div>
            <div class="metric-value">50M</div>
            <div class="metric-description">взаимодействий в год</div>
            <div class="metric-detail">AI tokenization powered</div>
        </div>

        <div class="metric-card">
            <div class="metric-header">
                <img src="images/yandex-logo.svg" alt="Yandex" class="company-logo">
                <span class="metric-category">Translations</span>
            </div>
            <div class="metric-value">1B</div>
            <div class="metric-description">переводов ежедневно</div>
            <div class="metric-detail">Attention mechanism driven</div>
        </div>
    </div>
</div>
```

**Styling:**
```css
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    margin: var(--spacing-xl) 0;
}

.metric-card {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(0, 168, 107, 0.05) 100%);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: var(--spacing-lg);
    text-align: center;
    transition: all var(--transition-normal);
    position: relative;
    overflow: hidden;
}

.metric-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--success-color));
}

.metric-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.metric-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.company-logo {
    width: 32px;
    height: 32px;
    border-radius: 8px;
}

.metric-category {
    font-size: 0.875rem;
    color: var(--secondary-text);
    font-weight: 500;
}

.metric-value {
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent-color);
    line-height: 1;
    margin-bottom: var(--spacing-sm);
}

.metric-description {
    font-size: 1.125rem;
    color: var(--primary-text);
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.metric-detail {
    font-size: 0.875rem;
    color: var(--secondary-text);
    font-style: italic;
}
```

### 2. Technical Concept Explanation

**Template:**
```html
<div class="slide-section" data-action="2">
    <div class="concept-explanation">
        <h2 class="concept-title">Tokenization Process</h2>

        <div class="concept-demo">
            <div class="demo-input">
                <span class="demo-label">Input Text:</span>
                <div class="text-example">"Я читаю это предложение"</div>
            </div>

            <div class="demo-arrow">
                <svg class="arrow-icon" viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <span class="process-label">AI Tokenization</span>
            </div>

            <div class="demo-output">
                <span class="demo-label">Token Output:</span>
                <div class="tokens-container">
                    <span class="token">Я</span>
                    <span class="token">чит</span>
                    <span class="token">аю</span>
                    <span class="token">это</span>
                    <span class="token">пред</span>
                    <span class="token">ложение</span>
                </div>
            </div>
        </div>

        <div class="concept-insight">
            <h3>Key Insight</h3>
            <p>AI processes text as <em>sub-word units</em>, not complete words like humans</p>
        </div>
    </div>
</div>
```

**Styling:**
```css
.concept-explanation {
    background: var(--background-secondary);
    border-radius: 16px;
    padding: var(--spacing-2xl);
    margin: var(--spacing-xl) 0;
}

.concept-title {
    font-size: 2rem;
    color: var(--accent-color);
    text-align: center;
    margin-bottom: var(--spacing-xl);
    position: relative;
}

.concept-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--accent-color);
    border-radius: 2px;
}

.concept-demo {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--spacing-lg);
    align-items: center;
    margin: var(--spacing-2xl) 0;
}

.demo-input,
.demo-output {
    text-align: center;
}

.demo-label {
    display: block;
    font-weight: 600;
    color: var(--secondary-text);
    margin-bottom: var(--spacing-sm);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.text-example {
    background: white;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    padding: var(--spacing-md);
    font-family: var(--font-family-mono);
    font-size: 1.125rem;
    color: var(--primary-text);
}

.demo-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
}

.arrow-icon {
    width: 32px;
    height: 32px;
    color: var(--accent-color);
}

.process-label {
    font-size: 0.75rem;
    color: var(--secondary-text);
    font-weight: 500;
    text-align: center;
}

.tokens-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    justify-content: center;
}

.token {
    background: var(--accent-color);
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 16px;
    font-family: var(--font-family-mono);
    font-size: 0.875rem;
    font-weight: 500;
}

.concept-insight {
    background: rgba(102, 126, 234, 0.1);
    border-left: 4px solid var(--accent-color);
    padding: var(--spacing-lg);
    border-radius: 0 8px 8px 0;
    margin-top: var(--spacing-xl);
}

.concept-insight h3 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--accent-color);
    font-size: 1.125rem;
}

.concept-insight p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
}
```

### 3. Cognitive Parallel Illustration

**Template:**
```html
<div class="slide-section" data-action="3">
    <div class="cognitive-parallel">
        <h2 class="parallel-title">Human vs AI Processing</h2>

        <div class="parallel-comparison">
            <div class="human-side">
                <div class="side-header">
                    <div class="brain-icon">🧠</div>
                    <h3>Human Brain</h3>
                </div>

                <div class="process-flow">
                    <div class="process-step">
                        <div class="step-icon">👁</div>
                        <div class="step-content">
                            <div class="step-title">Perception</div>
                            <div class="step-description">Read whole words</div>
                        </div>
                    </div>

                    <div class="flow-arrow">↓</div>

                    <div class="process-step">
                        <div class="step-icon">🤔</div>
                        <div class="step-content">
                            <div class="step-title">Processing</div>
                            <div class="step-description">Understand meaning</div>
                        </div>
                    </div>

                    <div class="flow-arrow">↓</div>

                    <div class="process-step">
                        <div class="step-icon">💬</div>
                        <div class="step-content">
                            <div class="step-title">Response</div>
                            <div class="step-description">Generate thoughts</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="parallel-divider">
                <div class="similarity-indicator">≈</div>
                <div class="similarity-text">Similar but different</div>
            </div>

            <div class="ai-side">
                <div class="side-header">
                    <div class="ai-icon">🤖</div>
                    <h3>AI System</h3>
                </div>

                <div class="process-flow">
                    <div class="process-step">
                        <div class="step-icon">🔤</div>
                        <div class="step-content">
                            <div class="step-title">Encoding</div>
                            <div class="step-description">Break into tokens</div>
                        </div>
                    </div>

                    <div class="flow-arrow">↓</div>

                    <div class="process-step">
                        <div class="step-icon">⚙️</div>
                        <div class="step-content">
                            <div class="step-title">Thinking</div>
                            <div class="step-description">Find patterns</div>
                        </div>
                    </div>

                    <div class="flow-arrow">↓</div>

                    <div class="process-step">
                        <div class="step-icon">📝</div>
                        <div class="step-content">
                            <div class="step-title">Generation</div>
                            <div class="step-description">Predict next word</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Styling:**
```css
.cognitive-parallel {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 20px;
    padding: var(--spacing-2xl);
    margin: var(--spacing-xl) 0;
}

.parallel-title {
    text-align: center;
    font-size: 2rem;
    color: var(--primary-text);
    margin-bottom: var(--spacing-2xl);
}

.parallel-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--spacing-2xl);
    align-items: start;
}

.human-side,
.ai-side {
    background: white;
    border-radius: 16px;
    padding: var(--spacing-xl);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.side-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
    justify-content: center;
}

.brain-icon,
.ai-icon {
    font-size: 2rem;
}

.side-header h3 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--primary-text);
}

.process-flow {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.process-step {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--background-secondary);
    border-radius: 12px;
    transition: all var(--transition-normal);
}

.process-step:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step-icon {
    font-size: 1.5rem;
    width: 40px;
    text-align: center;
}

.step-content {
    flex: 1;
}

.step-title {
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: var(--spacing-xs);
}

.step-description {
    font-size: 0.875rem;
    color: var(--secondary-text);
}

.flow-arrow {
    text-align: center;
    font-size: 1.5rem;
    color: var(--accent-color);
    margin: var(--spacing-sm) 0;
}

.parallel-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
}

.similarity-indicator {
    font-size: 3rem;
    color: var(--accent-color);
    font-weight: 300;
}

.similarity-text {
    font-size: 0.875rem;
    color: var(--secondary-text);
    text-align: center;
    writing-mode: vertical-rl;
    text-orientation: mixed;
}
```

### 4. Interactive Diagram Template

**Template:**
```html
<div class="slide-section" data-action="2">
    <div class="interactive-diagram">
        <h2 class="diagram-title">Attention Mechanism Visualization</h2>

        <div class="diagram-container">
            <svg class="attention-diagram" viewBox="0 0 800 400">
                <!-- Input tokens -->
                <g class="input-layer">
                    <text x="50" y="30" class="layer-label">Input Tokens</text>
                    <rect x="20" y="50" width="80" height="40" class="token-box" onclick="highlightPath('token1')">
                        <title>Token: "Я"</title>
                    </rect>
                    <text x="60" y="75" class="token-text">Я</text>

                    <rect x="120" y="50" width="80" height="40" class="token-box" onclick="highlightPath('token2')">
                        <title>Token: "читаю"</title>
                    </rect>
                    <text x="160" y="75" class="token-text">читаю</text>

                    <!-- More tokens... -->
                </g>

                <!-- Attention weights -->
                <g class="attention-layer">
                    <text x="350" y="30" class="layer-label">Attention Weights</text>
                    <circle cx="300" cy="70" r="20" class="attention-node" data-weight="0.8">
                        <title>Weight: 0.8</title>
                    </circle>
                    <circle cx="400" cy="70" r="15" class="attention-node" data-weight="0.6">
                        <title>Weight: 0.6</title>
                    </circle>
                    <!-- More attention nodes... -->
                </g>

                <!-- Output -->
                <g class="output-layer">
                    <text x="650" y="30" class="layer-label">Focused Output</text>
                    <rect x="620" y="50" width="120" height="40" class="output-box">
                        <title>Attention-focused representation</title>
                    </rect>
                    <text x="680" y="75" class="output-text">Focus Result</text>
                </g>

                <!-- Connection lines -->
                <g class="connections">
                    <line x1="100" y1="90" x2="280" y2="70" class="connection-line" stroke-width="2"/>
                    <line x1="160" y1="90" x2="320" y2="70" class="connection-line" stroke-width="3"/>
                    <!-- More connections... -->
                </g>
            </svg>
        </div>

        <div class="diagram-controls">
            <button onclick="animateAttention()" class="control-btn">
                ▶️ Show Attention Flow
            </button>
            <button onclick="resetDiagram()" class="control-btn">
                🔄 Reset
            </button>
        </div>

        <div class="diagram-explanation">
            <p>Click on tokens to see how attention weights determine focus</p>
        </div>
    </div>
</div>
```

**Styling:**
```css
.interactive-diagram {
    background: white;
    border: 2px solid var(--border-color);
    border-radius: 16px;
    padding: var(--spacing-xl);
    margin: var(--spacing-xl) 0;
}

.diagram-title {
    text-align: center;
    color: var(--accent-color);
    margin-bottom: var(--spacing-lg);
}

.attention-diagram {
    width: 100%;
    height: 400px;
    background: #fafbfc;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.layer-label {
    font-family: var(--font-family-main);
    font-size: 14px;
    font-weight: 600;
    fill: var(--secondary-text);
}

.token-box {
    fill: var(--accent-color);
    stroke: white;
    stroke-width: 2;
    cursor: pointer;
    transition: all 0.3s ease;
}

.token-box:hover {
    fill: var(--success-color);
    transform: scale(1.05);
}

.token-text,
.output-text {
    font-family: var(--font-family-main);
    font-size: 12px;
    font-weight: 500;
    fill: white;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
}

.attention-node {
    fill: var(--warning-color);
    stroke: white;
    stroke-width: 2;
    cursor: pointer;
    transition: all 0.3s ease;
}

.attention-node:hover {
    r: 25;
    fill: var(--accent-color);
}

.output-box {
    fill: var(--success-color);
    stroke: white;
    stroke-width: 2;
}

.connection-line {
    stroke: var(--accent-color);
    stroke-opacity: 0.6;
    transition: all 0.3s ease;
}

.connection-line.highlighted {
    stroke: var(--warning-color);
    stroke-opacity: 1;
    stroke-width: 4;
}

.diagram-controls {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin: var(--spacing-lg) 0;
}

.control-btn {
    background: var(--accent-color);
    color: white;
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all var(--transition-normal);
}

.control-btn:hover {
    background: var(--success-color);
    transform: translateY(-2px);
}

.diagram-explanation {
    text-align: center;
    color: var(--secondary-text);
    font-style: italic;
    margin-top: var(--spacing-md);
}
```

## Responsive Adaptations

### Mobile-First Responsive Rules

```css
/* Base mobile styles */
@media (max-width: 768px) {
    .metrics-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .concept-demo {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        text-align: center;
    }

    .demo-arrow {
        transform: rotate(90deg);
    }

    .parallel-comparison {
        grid-template-columns: 1fr;
        gap: var(--spacing-lg);
    }

    .parallel-divider {
        order: 2;
        flex-direction: row;
    }

    .similarity-text {
        writing-mode: horizontal-tb;
    }

    .cognitive-parallel {
        padding: var(--spacing-lg);
    }

    .slide-title {
        font-size: 2rem;
    }

    .metric-value {
        font-size: 2.5rem;
    }
}

@media (max-width: 480px) {
    .slide-content {
        padding: var(--spacing-md);
    }

    .slide-title {
        font-size: 1.75rem;
    }

    .concept-explanation,
    .cognitive-parallel {
        padding: var(--spacing-md);
    }

    .metric-card {
        padding: var(--spacing-md);
    }

    .tokens-container {
        gap: var(--spacing-xs);
    }

    .token {
        font-size: 0.75rem;
        padding: 2px var(--spacing-xs);
    }
}
```

This comprehensive styling system ensures that all slide content maintains visual consistency while providing engaging, interactive presentations that work seamlessly across all devices and screen sizes.