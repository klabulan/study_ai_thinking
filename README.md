# AI Research Collection & Presentation Repository

**"Парадокс Умного Незнакомца: Как ИИ Понимает, Думает и Отвечает"**

This repository serves as a comprehensive collection and storage system for research materials on Large Language Models and their presentation for a Russian tech meetup audience.

## 📚 Repository Purpose

**Primary Goal**: Systematic collection, organization, and presentation of AI research materials exploring how LLMs process information, "think," and generate responses.

**Secondary Goal**: Interactive presentation system designed for technical audiences who want to understand AI mechanics through cognitive science parallels.

## 🔬 Research Focus Areas

### Core Research Topics
- **Tokenization & Encoding**: How AI breaks down and processes input
- **Attention Mechanisms**: Selective focus and context understanding
- **Layer Specialization**: Progressive complexity in neural networks
- **Generation Processes**: Word-by-word prediction and creativity
- **Cognitive Parallels**: Human thinking analogies for AI mechanisms

### Research Methodology
- **Academic Sources**: Peer-reviewed papers from cognitive science and AI research
- **Industry Applications**: Real-world AI system specifications and performance data
- **Cross-Verification**: All claims backed by authoritative sources with citations
- **Cognitive Science Integration**: Human thinking processes as explanatory framework

### Key Research Areas by Section
- **Background Research** (`/research/background/`): Foundational LLM architecture, attention mechanisms, transformer models
- **Error Analysis** (`/research/3_2_errors/`): Common prompting mistakes, cognitive biases in AI interaction
- **Interpretability** (`/research/4_1_interpret/`): Latest breakthroughs in understanding AI decision-making
- **Cognitive Studies** (`/research/5_1_cognitive/`): Human-AI perception parallels, cognitive science applications

## 📋 Presentation Materials

### Presentation Overview
**Format**: 45-60 minute interactive presentation for Russian tech meetup
**Structure**: Three-phase journey (Encoding → Thinking → Generation)
**Audience**: Tech-savvy professionals with basic AI knowledge
**Language**: Russian with natural English technical terms
**Style**: TED-talk meets tech meetup - professional with strategic humor

### Content Development Process
Each presentation section includes:
1. **Extended Analysis** (2-3 pages): Technical AI mechanisms with cognitive parallels
2. **Speech Notes**: Precise timing with slide markers and audience engagement
3. **Visual Design**: Progressive disclosure system with technical diagrams
4. **Source References**: Academic citations and industry verification

### Presentation Philosophy
- **Understanding over Application**: Focus on AI mechanisms rather than practical usage
- **Cognitive Parallels**: Human thinking analogies for complex technical concepts
- **Source-Verified**: All facts backed by academic or industry sources
- **Streamlined Efficiency**: Dense, information-rich content for technical audience

## 🎯 Key Differentiators

### Research Approach
- **AI-First Content**: Technical depth on tokenization, layers, generation mechanics
- **Cognitive Science Foundation**: Verified parallels with human thinking processes
- **Academic Rigor**: All claims sourced from peer-reviewed research
- **Russian Context**: Localized examples using familiar tech companies and systems

### Presentation Innovation
- **Interactive Progressive Disclosure**: Multi-layered content revelation
- **Smart Content Loading**: File-first approach with graceful fallbacks
- **Responsive Design**: Works on desktop, mobile, and presentation systems
- **Real-time Navigation**: Keyboard shortcuts, touch controls, progress tracking

## 📋 Features

### 🎮 Navigation Controls

**Keyboard Shortcuts:**
- `Space` / `→` - Next action/slide
- `Backspace` / `←` - Previous action/slide
- `F5` - Enter/exit fullscreen
- `Esc` - Exit fullscreen
- `Tab` - Toggle content tabs
- `Home` - First slide
- `End` - Last slide
- `1-9` - Jump to slide number
- `Ctrl + R` - Restart presentation
- `?` - Show help

**Mouse/Touch:**
- Click anywhere on slide to advance
- Swipe left/right for navigation (mobile)
- Swipe up/down for tabs/sidebar (mobile)

### 📱 Progressive Disclosure

- **Multi-source actions**: Detects from speech notes `[СЛАЙД]` markers and visual content `data-action` attributes
- **Smooth animations**: CSS transitions with proper timing
- **Real-time progress**: Synchronized progress dots, bar, and descriptive hints
- **Smart fallbacks**: Auto-generates content when slides are missing

### 🧠 Smart Content Loading

- **File-First Approach**: Always tries to load content from `presentation/[slideId]/` folders first
- **Graceful Fallbacks**: Shows helpful placeholder content when files are missing
- **GitHub Pages Ready**: Loads external markdown files when deployed
- **Local Development**: Works with file:// protocol, shows guidance for adding content

### 🖥️ Presentation Modes

- **Normal Mode**: Three-panel layout with navigation and content tabs
- **Fullscreen Mode**: Optimized for presentation delivery with auto-hide UI
- **Mobile Mode**: Touch-optimized responsive design


## 🗂️ Repository Structure

```
research/                          # Core research materials
├── index.md                      # Research methodology & overview
├── background/                   # Foundational AI concepts
├── 3_2_errors/                  # Prompting errors & cognitive biases
├── 4_1_interpret/               # AI interpretability research
├── 5_1_cognitive/               # Cognitive perception studies
└── extensions/                  # Advanced topics for Q&A

presentation/                     # Presentation materials
├── overview.md                  # Complete presentation structure
├── work_breakdown.md            # Task breakdown for all slides
├── persona.md                   # Dr. Elena Cognitive guidelines
├── 1/ through 12/               # Individual slide materials
│   ├── extended_analysis.md     # Research integration & analysis
│   ├── speech_notes.md          # Speaker notes with timing
│   ├── slide_design.md          # Visual design specifications
│   └── sources_reference.md     # Academic & industry citations
├── slides/                      # Working slide development
└── assets/                      # Visual presentation content

tasks/                           # Development process
├── init/                        # Initial planning materials
└── development/                 # Iterative development notes

CLAUDE.md                        # Project configuration & guidelines
```


## 📁 Content Structure

```
presentation/
├── assets/                     # Visual slide content
│   ├── 1/index.html           # Slide 1 visual content
│   ├── 2/index.html           # Slide 2 visual content
│   └── ...
├── 1/                         # Text content for slide 1
│   ├── extended_analysis.md   # Detailed analysis
│   ├── speech_notes.md        # Speaker notes with [СЛАЙД] markers
│   ├── slide_design.md        # Visual design specifications
│   └── sources_reference.md   # Research sources
├── 2/                         # Text content for slide 2
└── ...
```

### Creating Slide Content

**Visual Slides** (`presentation/assets/[slideId]/index.html`):
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Slide Title</title>
</head>
<body class="slide-content">
    <!-- Action 0: Always visible -->
    <div class="slide-section" data-action="0">
        <h1 class="slide-title">Slide Title</h1>
    </div>

    <!-- Action 1: Revealed on first click -->
    <div class="slide-section" data-action="1">
        <div class="business-metric">
            <h3>Business Metrics</h3>
            <p>Content revealed progressively</p>
        </div>
    </div>
</body>
</html>
```

**Speech Notes** (`presentation/[slideId]/speech_notes.md`):
```markdown
# Speaker Notes

Initial content explanation.

[СЛАЙД] Second section content.

[СЛАЙД] Third section content.
```

## 🎨 Styling System

The presentation uses a comprehensive CSS variable system for consistent styling:

```css
:root {
    --primary-text: #2d3748;
    --accent-color: #667eea;
    --success-color: #00a86b;
    /* ... more variables */
}
```

**Built-in Component Classes:**
- `.business-metric` - Highlighted business statistics
- `.tech-concept` - Technical explanations
- `.highlight` - Inline highlights
- `.cognitive-parallel` - Human vs AI comparisons

## 🛠️ Development

### Adding New Slides

1. Create slide folder: `presentation/[number]/`
2. Add markdown files: `extended_analysis.md`, `speech_notes.md`, etc.
3. (Optional) Create visual content: `presentation/assets/[number]/index.html`
4. Update slide configuration in `script.js` if needed

### Customizing Styles

- Global styles: Edit `style.css`
- Slide-specific styles: Add to individual slide HTML files
- The system automatically injects global CSS variables into slide iframes

### Error Handling

The presentation includes comprehensive error handling:
- **Missing files**: Auto-generates fallback content
- **Network issues**: Shows retry options
- **CORS problems**: Provides local server solutions

## 📊 Browser Support

- **Desktop**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS 14+, Android 10+
- **Features**: CSS Grid, ES6 modules, Fetch API, Fullscreen API

## 🔧 Troubleshooting

### CORS Issues
- **Problem**: Content not loading when opening `index.html` directly
- **Solution**: Use development server (`python dev-server.py` or `node dev-server.js`)

### Missing Content
- **Problem**: Slides show "Content not available"
- **Solution**: Check file paths and ensure markdown files exist in `presentation/[slideId]/`

### Performance Issues
- **Problem**: Slow loading or animations
- **Solution**: Use local server, check browser developer tools for errors

## 📝 License

This presentation system is designed for the "Парадокс Умного Незнакомца" presentation. Feel free to adapt for your own presentations.

---

**Made with ❤️ for AI education and understanding**