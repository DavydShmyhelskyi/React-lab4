# React Todo List – Lab 5-6: React Design Patterns

## Опис проєкту
Це розширена версія Todo List на React, яка демонструє використання сучасних React design patterns та принципів побудови компонентів.  
У проєкті застосовані **Custom Hooks**, **Container–Presentational pattern**, а також реалізовано **пошук, пагінацію та редагування завдань**.

---

## Що було додано

### 1. Custom Hook `useTodos.js`
- Логіка **CRUD**: додавання, видалення, перемикання completed.
- **Пошук (client-side)**: `searchTerm` + фільтрація todos.
- **Пагінація**: `currentPage`, `limitPerPage`, `totalTodos`.
- **Редагування назви todo**: `editTodoTitle(id, newTitle)` через PUT-запит.
- Всі методи та стани повертаються з хуку для централізованого керування даними.

### 2. TodoList.jsx
- Контейнерний компонент, який отримує дані та методи з `useTodos`.
- Реалізовано **пошук** по всіх todos.
- Реалізовано **пагінацію**: Previous / Next, select "items per page".
- Реалізовано **редагування todo**: поле для введення + кнопки Save / Cancel.
- Використовується **Container–Presentational pattern**.

### 3. TodoItem.jsx
- Презентаційний компонент для відображення одного todo.
- Підтримує `children`, щоб вставляти кастомний UI (input для редагування).
- Checkbox та кнопка Delete передаються через props.

### 4. AddTodoForm.jsx
- Контролюваний компонент для додавання нового todo.
- Логіка додавання делегована в `useTodos`.

### 5. App.jsx
- Composition root: рендерить тільки `TodoList`.

---

## UI Функціональність
- **Пошук:** фільтрує todos динамічно при введенні тексту.
- **Пагінація:** керування сторінками та кількістю елементів на сторінку.
- **Редагування:** кнопка Edit → input → Save / Cancel або Enter.
- **CRUD:** додавання, видалення, toggle completed.

---

## Архітектурні патерни
- **Custom Hook:** централізоване управління даними та логікою.
- **Container–Presentational:** відділення логіки від UI.
- **Controlled Components:** для форми додавання та редагування.
- **Lifting State Up:** події йдуть вгору через callback-и.
- **Composition Root:** App.jsx не містить бізнес-логіки.

---

## Component Tree & Data Flow


https://github.com/DavydShmyhelskyi/React-lab4/blob/main/ReactLab4.drawio%20(1).png

---
## Посилання на сайт
https://react-lab4-mu.vercel.app/
