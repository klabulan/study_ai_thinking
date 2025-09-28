# Example Content Structure

This file shows how to add your own content to the presentation.

## File Structure

Create folders and files like this:

```
presentation/
├── 1/                              # Slide 1 content
│   ├── extended_analysis.md        # Detailed analysis (loads in Analysis tab)
│   ├── speech_notes.md             # Speaker notes (loads in Speech Notes tab)
│   ├── slide_design.md             # Design specs (loads in Design tab)
│   └── sources_reference.md        # Sources (loads in Sources tab)
├── 2/                              # Slide 2 content
│   └── ... (same structure)
└── assets/                         # Optional visual slides
    ├── 1/index.html               # Visual content for slide 1
    └── 2/index.html               # Visual content for slide 2
```

## Example: presentation/1/extended_analysis.md

```markdown
# Парадокс Умного Незнакомца

## Ключевая Идея
Создать интригу через контраст между впечатляющими возможностями ИИ и непониманием его внутренней логики.

## Бизнес-Реальность ИИ Сегодня
- **Tinkoff**: 95% кредитных решений за 2 минуты
- **Sber**: 50M клиентских взаимодействий в год
- **Яндекс**: 1B переводов ежедневно

## Центральный Парадокс
Мы используем ИИ как "чёрный ящик" - получаем результаты, не понимая процесса.
```

## Example: presentation/1/speech_notes.md

```markdown
# Speaker Notes: Парадокс умного незнакомца

[СЛАЙД] Добро пожаловать! Сегодня мы поговорим о парадоксе умного незнакомца.

[СЛАЙД] Мы живём в мире, где ИИ принимает миллионы решений каждый день.

[СЛАЙД] Но вот парадокс: мы доверяем этому "умному незнакомцу" важные решения, не понимая, как он думает.
```

**Important**: Use `[СЛАЙД]` markers to create progressive disclosure actions.

## Example: presentation/assets/1/index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Slide 1: Парадокс умного незнакомца</title>
</head>
<body class="slide-content">
    <!-- Action 0: Always visible -->
    <div class="slide-section" data-action="0">
        <h1 class="slide-title">Парадокс Умного Незнакомца</h1>
        <p class="slide-subtitle">Как ИИ понимает, думает и отвечает</p>
    </div>

    <!-- Action 1: Revealed on first click -->
    <div class="slide-section" data-action="1">
        <div class="business-metric">
            <h3>ИИ сегодня</h3>
            <ul>
                <li><strong>Tinkoff</strong>: 95% решений за 2 минуты</li>
                <li><strong>Sber</strong>: 50M взаимодействий в год</li>
            </ul>
        </div>
    </div>

    <!-- Action 2: Revealed on second click -->
    <div class="slide-section" data-action="2">
        <div class="tech-concept">
            <h3>Парадокс</h3>
            <p>Мы доверяем "умному незнакомцу", не понимая, как он думает</p>
        </div>
    </div>
</body>
</html>
```

## How It Works

1. **Content Loading**: The presentation automatically tries to load files from `presentation/[slideId]/`
2. **Progressive Disclosure**: Uses `[СЛАЙД]` markers from speech notes and `data-action` attributes from visual content
3. **Fallbacks**: Shows helpful placeholder content when files are missing
4. **GitHub Pages**: All content loads automatically when deployed

## Getting Started

1. Create the folder structure above
2. Add your markdown files
3. Refresh the presentation
4. Your content will load automatically!

The presentation will guide you with helpful messages if any files are missing.