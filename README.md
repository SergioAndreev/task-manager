# Task Manager App (React Native + Expo)

Simple task manager with login, task list, add, complete, and delete. Built with Expo and TypeScript.

## Tech stack
- Expo (React Native)
- React Navigation (native-stack)
- AsyncStorage (persistence)
- Fetch to JSONPlaceholder (initial mock API)

## Project structure
- `src/screens` — Login and Task list screens
- `src/components` — UI components (TaskItem)
- `src/services` — API/persistence logic (taskService)
- `src/models` — Types (Task)
- `src/context` — Auth context
- `src/navigation` — Navigation setup

## Run
1) Install dependencies (already installed by scaffolding). If needed:
   - `npm install`
2) Start dev server:
   - `npm start`
3) Open on device/emulator via Expo Go (Android/iOS) or web.

## Login
- Login: `admin`
- Password: `1234`

## Notes
- Initial tasks are fetched from JSONPlaceholder (`/todos?_limit=10`), then stored in AsyncStorage.
- Add/toggle/delete update local storage.

## Screenshots
Place your screenshots in `screenshots/` and link them here.


## Форма отчёта кандидата
- ФИО:Андреев Сергей Владимирович
- Используемая технология:  ☐ React Native
- Время выполнения (в часах): 1
- Ссылка на GitHub / Google Drive / ZIP: 
- Краткое описание проекта: Simple task manager with login, task list, add, complete, and delete. Built with Expo and TypeScript.
- Что удалось реализовать: 100% поставленной задачи
- Что добавил бы при дополнительном времени: api todoist.com, сортировка задач, проекты задач, время начала время окончания задачи, пометка к задачи, валидацию
- Дополнительная информация: _____________________________________
