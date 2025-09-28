# AI Presentation: Парадокс Умного Незнакомца

> Интерактивная презентация о том, как ИИ понимает, думает и отвечает

## 🚀 Quick Start

### GitHub Pages Deployment (Recommended)

1. **Push to GitHub**: Upload this repository to GitHub
2. **Enable Pages**: Go to repository Settings → Pages → Source: Deploy from branch `main`
3. **Access**: `https://username.github.io/repository-name/`

The presentation will work immediately with full functionality!

### Local Development

**Option 1: Direct File Access (Quick Demo)**
- Open `index.html` directly in your browser
- Uses built-in placeholder content (CORS restrictions prevent loading external files)
- Perfect for testing the presentation interface and functionality

**Option 2: Development Server (Full Content)**
```bash
# Python (recommended)
python dev-server.py

# Node.js
node dev-server.js

# Then open: http://localhost:8000
```
- Loads actual content from `presentation/[slideId]/` folders
- No CORS restrictions
- Full external file support

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