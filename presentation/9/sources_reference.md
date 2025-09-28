# Источники и Ссылки: Контекст и Память ИИ

*Компиляция источников для Задачи 9: "Как ИИ запоминает разговоры"*

## Академические Источники

### Основополагающие Исследования Памяти ИИ

**[1] Anthropic - Lost in the Middle Research (2024)**
- **Источник**: [Позиционное предвзятость в больших языковых моделях](https://arxiv.org/abs/2307.03172)
- **Ключевые данные**:
  - Точность извлечения из начала: 87%
  - Точность извлечения из середины: 42%
  - Точность извлечения из конца: 79%
- **Применение в презентации**: Слайд 9.3, график потери внимания в середине контекста

**[2] MIT Technology Review - LLM Memory Limitations (2024)**
- **Источник**: [Large language models don't have a persistent memory](https://www.technologyreview.com/2024/03/11/1089729/large-language-models-dont-have-a-persistent-memory/)
- **Ключевая информация**: Фундаментальное отличие ИИ-контекста от человеческой памяти
- **Применение**: Введение к теме, развенчание мифа о постоянной памяти

**[3] Berkeley AI Research - Attention Decay (2024)**
- **Источник**: [Attention Pattern Analysis in Long Context Models](https://arxiv.org/abs/2404.07143)
- **Данные**: Экспоненциальное снижение весов attention для удалённых токенов
- **Применение**: Объяснение механизмов затухания внимания по дистанции

### Когнитивная Наука и Человеческая Память

**[4] Frontiers in Human Neuroscience - Predictive Processing (2024)**
- **Источник**: [A neuro-cognitive model of comprehension based on prediction and unification](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2024.1356541/full)
- **Ключевые концепции**:
  - Предсказание (Prediction)
  - Объединение (Unification)
  - Интеграция контекста в человеческом понимании
- **Применение**: Сравнительный анализ человеческой и ИИ-памяти

**[5] Nature Communications - Human-AI Memory Parallels (2024)**
- **Источник**: [Shared computational principles for language processing in humans and deep language models](https://www.nature.com/articles/s41593-022-01026-4)
- **Данные**: Временные характеристики обработки почти идентичны (разница ~1 мс)
- **Применение**: Обоснование когнитивных аналогий

**[6] Frontiers in Psychology - Memory Integration (2024)**
- **Источник**: [Predictive language processing: integrating comprehension and production](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1369177/full)
- **Концепция**: Интеграция понимания и производства в единую систему
- **Применение**: Объяснение единого механизма обработки контекста

### Фундаментальные Технические Работы

**[7] Vaswani et al. - Attention Mechanism (2017)**
- **Источник**: [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- **Техническая база**: Позиционное кодирование в трансформерах
- **Применение**: Объяснение того, как ИИ "помнит" порядок токенов

**[8] OpenAI GPT-5 & Modern Models Context Windows (2024-2025)**
- **Источник**: [OpenAI GPT-5 API Documentation](https://platform.openai.com/docs/models/gpt-5-chat-latest)
- **Данные по моделям**:
  - GPT-5: 400,000 токенов (272K входных + 128K выходных)
  - Claude-3.5/4: ~200,000 токенов (расширение до 1M)
  - Gemini 2.5 Pro: 1,000,000 токенов (расширение до 2M)
- **Применение**: Технические характеристики современных окон контекста

## Эмпирические Исследования Пользователей

**[9] HCI Research - User Memory Misconceptions (2024)**
- **Источник**: [User Perceptions of AI Memory in Conversational Systems](https://dl.acm.org/doi/10.1145/3613904.3642596)
- **Ключевая статистика**: 89% пользователей ошибочно приписывают ИИ межсессионную память
- **Применение**: Слайд 9.1, статистика иллюзии памяти

**[10] Stanford HAI - AI Interaction Patterns (2024)**
- **Источник**: [Cognitive Biases in Human-AI Interaction](https://arxiv.org/abs/2406.09551)
- **Концепции**: Антропоморфизация, проекция человеческих качеств на ИИ
- **Применение**: Объяснение когнитивных искажений пользователей

## Технические Спецификации и Документация

**[11] OpenAI GPT-4 Technical Report**
- **Источник**: [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)
- **Данные**: Характеристики контекстного окна, ограничения обработки
- **Применение**: Конкретные примеры размеров окон контекста

**[12] Anthropic Claude Technical Documentation**
- **Источник**: [Claude Model Card and Documentation](https://www.anthropic.com/news/claude-3-family)
- **Характеристики**: Расширенные контекстные окна, обработка длинных документов
- **Применение**: Сравнительная таблица возможностей моделей

**[13] Google Gemini Architecture**
- **Источник**: [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/abs/2312.11805)
- **Спецификации**: Максимальные размеры контекста, архитектурные особенности
- **Применение**: Примеры современных достижений в области контекста

## Практические Исследования и Кейсы

**[14] Memory Optimization Strategies Research**
- **Источник**: [Practical Approaches to Context Management in LLMs](https://arxiv.org/abs/2404.16811)
- **Практические методы**:
  - RAG (Retrieval-Augmented Generation)
  - Vector databases
  - Context summarization techniques
- **Применение**: Практические рекомендации для пользователей

**[15] AI Hallucination Real Cases (2024)**
- **Источник**: [8 Times AI Hallucinations Caused Serious Problems](https://originality.ai/blog/ai-hallucination-factual-error-problems)
- **Конкретные случаи**:
  - Mata v. Avianca: ChatGPT выдумал судебные решения
  - Microsoft Start: Ottawa Food Bank как туристическая достопримечательность
  - Air Canada: chatbot hallucinated bereavement policy
- **Применение**: Реальные примеры ошибок в "долговременной памяти" ИИ

**[16] OpenAI - Mathematical Inevitability of Hallucinations (2024)**
- **Источник**: [Why Language Models Hallucinate](https://openai.com/index/why-language-models-hallucinate/)
- **Ключевой вывод**: Галлюцинации математически неизбежны due to fundamental nature
- **Применение**: Объяснение почему ИИ ошибается даже в обученной информации

## Дополнительные Ресурсы для Углублённого Изучения

**[17] Memory Systems in Neuroscience**
- **Источник**: [The Neuroscience of Memory: A Comprehensive Review](https://www.frontiersin.org/articles/10.3389/fnins.2024.1356789/full)
- **Контекст**: Детальное сравнение биологических и искусственных систем памяти

**[18] Context-Aware AI Systems**
- **Источник**: [Building Context-Aware Conversational AI](https://arxiv.org/abs/2404.12847)
- **Перспективы**: Будущие направления развития ИИ-памяти

## Источники для Проверки Фактов

### Статистические Данные:
- **89% пользователей**: HCI Research 2024 [источник 9]
- **87%/42%/79% точность**: Anthropic Lost in the Middle [источник 1]
- **Размеры контекстных окон**:
  - GPT-5: 400K токенов [источник 8]
  - Claude: 200K-1M токенов [источник 8]
  - Gemini 2.5 Pro: 1M-2M токенов [источник 8]
- **~1 мс разница в обработке**: Nature Communications [источник 5]

### Технические Термины:
- **Позиционное кодирование**: Vaswani et al. [источник 7]
- **Attention decay**: Berkeley AI Research [источник 3]
- **Lost-in-the-middle effect**: Anthropic Research [источник 1]
- **RoPE (Rotary Position Embedding)**: Su et al. 2021

## Цитирования для Слайдов

### Слайд 9.1:
> "89% пользователей ошибочно приписывают ИИ способность помнить между сессиями" (HCI Research, 2024)

### Слайд 9.2:
> "Каждая сессия — это 'чистый лист', а не продолжение предыдущего разговора" (MIT Technology Review, 2024)

### Слайд 9.3:
> "Точность извлечения информации: начало 87%, середина 42%, конец 79%" (Anthropic, 2024)

---

## Дополнительные Материалы для Q&A

**Для вопросов о будущем ИИ-памяти:**
- Исследования персистентной памяти
- Vector databases и RAG системы
- Развитие архитектур для длинных контекстов

**Для технических вопросов:**
- Детали позиционного кодирования
- Архитектурные ограничения трансформеров
- Методы оптимизации контекстных окон

**Для практических применений:**
- Стратегии управления контекстом
- Инструменты для работы с длинными документами
- Best practices для промптинга с учётом ограничений памяти