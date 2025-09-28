# Детальный справочник источников: Новые архитектуры и генерация

## Категория 1: Пост-трансформерные архитектуры

### Mamba и State Space Models
1. **"Mamba: Linear-Time Sequence Modeling with Selective State Spaces"** (2023)
   - Авторы: Gu, Dao et al.
   - Значимость: Прорывная архитектура с линейной сложностью
   - Практическая ценность: Обработка неограниченного контекста

2. **"The Annotated S4"** (2022)
   - Авторы: Rush, Karamcheti
   - Значимость: Объяснение основ State Space Models
   - Практическая ценность: Понимание математических основ

3. **"Efficiently Modeling Long Sequences with Structured State Spaces"** (2022)
   - Авторы: Gu et al., Stanford
   - Значимость: Теоретическое обоснование эффективности
   - Практическая ценность: Сравнение с трансформерами

### RetNet и альтернативные механизмы
4. **"Retentive Network: A Successor to Transformer for Large Language Models"** (2023)
   - Авторы: Sun et al., Microsoft Research
   - Значимость: Альтернатива механизму внимания
   - Практическая ценность: Сохранение качества при ускорении

5. **"RoPE: Rotary Position Embedding"** (2021)
   - Авторы: Su et al.
   - Значимость: Улучшенное кодирование позиций
   - Практическая ценность: Лучшая обработка длинных последовательностей

### Mixture of Experts (MoE)
6. **"Switch Transformer: Scaling to Trillion Parameter Models"** (2021)
   - Авторы: Fedus et al., Google
   - Значимость: Эффективное масштабирование без пропорционального роста вычислений
   - Практическая ценность: Большие модели при доступных затратах

## Категория 2: Эволюция RAG систем

### Продвинутый поиск и интеграция
7. **"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"** (2020)
   - Авторы: Lewis et al., Facebook AI
   - Значимость: Основополагающая работа по RAG
   - Практическая ценность: Преодоление ограничений статических знаний

8. **"REALM: Retrieval-Augmented Language Model Pre-Training"** (2020)
   - Авторы: Guu et al., Google Research
   - Значимость: Интеграция поиска в обучение
   - Практическая ценность: Более точные и актуальные ответы

9. **"Dense Passage Retrieval for Open-Domain Question Answering"** (2020)
   - Авторы: Karpukhin et al., Facebook AI
   - Значимость: Семантический поиск вместо ключевых слов
   - Практическая ценность: Понимание смысла запросов

### Векторные базы данных
10. **"Faiss: A Library for Efficient Similarity Search"** (2017-2023)
    - Авторы: Johnson et al., Facebook AI
    - Значимость: Эффективный поиск в больших векторных пространствах
    - Практическая ценность: Масштабируемые RAG системы

## Категория 3: Новые парадигмы обучения

### Constitutional AI и RLHF
11. **"Constitutional AI: Harmlessness from AI Feedback"** (2022)
    - Авторы: Bai et al., Anthropic
    - Значимость: Обучение моделей следовать принципам
    - Практическая ценность: Более безопасный и предсказуемый ИИ

12. **"Training language models to follow instructions with human feedback"** (2022)
    - Авторы: Ouyang et al., OpenAI
    - Значимость: Основа для ChatGPT и подобных моделей
    - Практическая ценность: ИИ, лучше понимающий человеческие намерения

### Эффективное дообучение
13. **"LoRA: Low-Rank Adaptation of Large Language Models"** (2021)
    - Авторы: Hu et al., Microsoft
    - Значимость: Эффективная персонализация больших моделей
    - Практическая ценность: Дообучение на потребительском оборудовании

14. **"QLoRA: Efficient Finetuning of Quantized LLMs"** (2023)
    - Авторы: Dettmers et al.
    - Значимость: Дальнейшее снижение требований к ресурсам
    - Практическая ценность: Дообучение 65B моделей на одной GPU

### In-Context Learning
15. **"What learning algorithm is in-context learning? Investigations with linear models"** (2022)
    - Авторы: Akyürek et al., MIT
    - Значимость: Понимание механизмов обучения в контексте
    - Практическая ценность: Более эффективные промпты

## Категория 4: Вычислительная эффективность

### Квантизация и сжатие
16. **"GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"** (2022)
    - Авторы: Frantar et al.
    - Значимость: Сжатие без потери качества
    - Практическая ценность: Мощные модели на слабом железе

17. **"LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"** (2022)
    - Авторы: Dettmers et al.
    - Значимость: Эффективная работа с ограниченной памятью
    - Практическая ценность: Запуск больших моделей локально

### Edge AI и мобильные развертывания
18. **"EdgeBERT: Sentence-Level Energy Optimizations for Latency-Aware Multi-Task NLP"** (2021)
    - Авторы: Wan et al.
    - Значимость: Оптимизация для мобильных устройств
    - Практическая ценность: ИИ без зависимости от интернета

19. **"MobileBERT: a Compact Task-Agnostic BERT for Resource-Limited Devices"** (2020)
    - Авторы: Sun et al., Google
    - Значимость: Архитектурные решения для мобильных устройств
    - Практическая ценность: Качественный NLP на смартфонах

## Категория 5: Мультимодальная генерация

### Текст в изображение
20. **"DALL-E 2: Hierarchical Text-Conditional Image Generation with CLIP Latents"** (2022)
    - Авторы: Ramesh et al., OpenAI
    - Значимость: Революция в генерации изображений
    - Практическая ценность: Творческие инструменты для всех

21. **"Stable Diffusion: High-Resolution Image Synthesis with Latent Diffusion Models"** (2022)
    - Авторы: Rombach et al.
    - Значимость: Открытая альтернатива проприетарным решениям
    - Практическая ценность: Доступная генерация изображений

### Аудио и речевой синтез
22. **"Tortoise TTS: A multi-voice TTS system trained with an emphasis on quality"** (2023)
    - Авторы: Betker et al.
    - Значимость: Высококачественный синтез речи
    - Практическая ценность: Персонализированные голосовые ассистенты

23. **"MusicLM: Generating Music From Text"** (2023)
    - Авторы: Agostinelli et al., Google
    - Значимость: Создание музыки из текстовых описаний
    - Практическая ценность: Новые инструменты для музыкантов

### Видеогенерация
24. **"Sora: Creating video from text"** (2024)
    - Авторы: OpenAI Team
    - Значимость: Революция в видеогенерации
    - Практическая ценность: Демократизация видеопроизводства

25. **"Make-A-Video: Text-to-Video Generation without Text-Video Data"** (2022)
    - Авторы: Singer et al., Meta
    - Значимость: Генерация видео без парных данных
    - Практическая ценность: Расширение возможностей контент-создания

## Дополнительные источники

### Обзорные статьи и аналитика
26. **"State of AI Report 2023"** - Nathan Benaich & Ian Hogarth
27. **"The Transformer Family Version 2.0"** - Lilian Weng, OpenAI
28. **"Large Language Models: A Survey"** - Zhao et al. (2023)

### Корпоративные исследования
29. **Anthropic Constitutional AI Papers** (2022-2023)
30. **OpenAI GPT-4 Technical Report** (2023)
31. **Google PaLM-2 Technical Report** (2023)
32. **Meta LLaMA Technical Report** (2023)

### Практические руководства
33. **"The Illustrated Transformer"** - Jay Alammar
34. **"Transformer Circuits Thread"** - Anthropic Research
35. **"Distill.pub Attention Mechanisms"** - Various Authors

## Применение источников для презентации

**Для слайда 10 (Эволюция генерации)**:
- Источники 20-25: Примеры мультимодальной генерации
- Источники 1-6: Технические прорывы в архитектуре
- Источники 7-10: Эволюция от статичных к динамическим знаниям

**Для слайда 15 (Будущие направления)**:
- Источники 11-15: Новые парадигмы обучения
- Источники 16-19: Демократизация через эффективность
- Источники 26-28: Обзорная аналитика трендов

**Общие принципы отбора**:
- Приоритет работам с практическими применениями
- Фокус на результатах, понятных неспециалистам
- Источники из ведущих организаций и конференций
- Акцент на социальных и экономических последствиях

*Полные ссылки и дополнительные материалы доступны по запросу.*