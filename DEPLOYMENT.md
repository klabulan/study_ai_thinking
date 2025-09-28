# GitHub Pages Deployment Guide

## 🚀 One-Click Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add AI presentation"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### Step 3: Access Your Presentation
Your presentation will be available at:
```
https://yourusername.github.io/your-repository-name/
```

## ✅ What Works Out of the Box

### Core Features
- ✅ **Full navigation**: Keyboard shortcuts, mouse clicks, touch gestures
- ✅ **Progressive disclosure**: Smooth slide transitions and content reveals
- ✅ **Responsive design**: Works on desktop, tablet, and mobile
- ✅ **Fullscreen mode**: F5 for presentation delivery
- ✅ **URL routing**: Direct links to specific slides
- ✅ **Content tabs**: Analysis, speech notes, design, sources

### Content Loading System

The presentation follows a **file-first approach**:

1. **Primary**: Loads content from `presentation/[slideId]/` folders
2. **Fallback**: Shows helpful placeholder content when files are missing
3. **Guidance**: Provides clear instructions on where to add your content

### Expected Content Structure
```
presentation/
├── 1/
│   ├── extended_analysis.md    # Detailed slide analysis
│   ├── speech_notes.md         # Speaker notes with [СЛАЙД] markers
│   ├── slide_design.md         # Visual design specifications
│   └── sources_reference.md    # Research sources and citations
├── 2/
│   └── ... (same structure)
└── assets/
    ├── 1/index.html           # Optional visual slide content
    └── 2/index.html           # Optional visual slide content
```

### Content Loading Behavior
- **With Files**: Loads your markdown content from the folders above
- **Without Files**: Shows placeholder content with instructions for adding your own
- **Mixed**: Loads available files, shows placeholders for missing ones

## 🔧 Customization Options

### Adding Custom Content
To add your own content files:

1. Create folders: `presentation/1/`, `presentation/2/`, etc.
2. Add markdown files:
   - `extended_analysis.md`
   - `speech_notes.md` (use `[СЛАЙД]` markers for actions)
   - `slide_design.md`
   - `sources_reference.md`

### Adding Visual Slides
1. Create folders: `presentation/assets/1/`, `presentation/assets/2/`, etc.
2. Add `index.html` files with slide content:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Slide Title</title>
</head>
<body class="slide-content">
    <div class="slide-section" data-action="0">
        <h1 class="slide-title">Your Title</h1>
    </div>
    <div class="slide-section" data-action="1">
        <p>Content revealed on first action</p>
    </div>
</body>
</html>
```

### Modifying Slide Configuration
Edit `script.js` and update the `slideConfig` object:
```javascript
this.slideConfig = {
    1: { title: "Your Slide Title", section: "Your Section" },
    // Add more slides...
};
```

## 📱 Testing on Different Devices

### Desktop Testing
- Chrome, Firefox, Safari, Edge (latest versions)
- Test keyboard shortcuts: Space, arrows, F5, numbers
- Test fullscreen mode and navigation

### Mobile Testing
- iOS Safari, Android Chrome
- Test touch gestures: swipe left/right, up/down
- Test responsive layout and touch controls

### GitHub Pages Testing
- Test direct slide links: `yoururl.com/#slide-3`
- Test content loading and fallbacks
- Test across different browsers

## 🔍 Troubleshooting

### Content Not Loading
- **Check file paths**: Ensure markdown files are in correct folders
- **GitHub Pages delay**: Allow 5-10 minutes for deployment
- **Browser cache**: Hard refresh (Ctrl+F5) to clear cache

### Styling Issues
- **Mobile layout**: Test responsive breakpoints
- **Font loading**: Ensure system fonts are working
- **Colors/contrast**: Test on different displays

### Performance Issues
- **Large files**: Optimize images and content
- **Network loading**: Test on slower connections
- **Browser compatibility**: Check developer console for errors

## 🎯 Best Practices

### Repository Setup
- Use descriptive repository name (e.g., `ai-presentation-paradox`)
- Add meaningful README with presentation description
- Include MIT license if sharing publicly

### Content Organization
- Keep markdown files under 50KB for fast loading
- Use relative links for internal references
- Optimize images for web (WebP, optimized PNG/JPG)

### Presentation Delivery
- Test fullscreen mode before presenting
- Bookmark direct slide links for quick navigation
- Have backup plan (PDF export) for technical issues

---

**Your presentation is now ready for the world! 🌍**