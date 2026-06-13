# machine-learning

Учебный репозиторий для освоения машинного обучения с нуля.

Траектория построена на основе программы курса «ML-инженер» Яндекс Практикума
(полная карта — [`ML-инженер_программа.md`](./ML-инженер_программа.md)), но
учимся на бесплатных материалах с прикладным подходом: быстрая петля
гипотеза → дешёвый тест → урок, теория приходит из проб.

## Структура

| Каталог | Назначение |
|---|---|
| `tasks/` | задания по блокам программы (см. `tasks/README.md`) |
| `src/mlbase/` | переиспользуемый код |
| `notebooks/` | черновики и эксперименты (Jupyter) |
| `data/` | датасеты (`raw/` — не коммитится) |
| `docs/` | syllabus, скриншоты, конспекты |
| `scripts/` | вспомогательные скрипты |

## Окружение

```bash
python -m venv .venv
source .venv/Scripts/activate          # Windows (Git Bash); Linux/Mac: .venv/bin/activate
pip install -r requirements.txt
```

Стек: Python, numpy, pandas, scikit-learn, matplotlib, seaborn, jupyter
(далее — PyTorch и MLOps). Точные версии — в `requirements.lock.txt`.
