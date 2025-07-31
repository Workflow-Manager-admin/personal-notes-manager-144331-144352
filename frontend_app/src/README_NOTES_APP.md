# Personal Notes App – Next.js

This is a minimalistic personal notes application built with Next.js, storing all data locally in your browser. No backend or account is required.

## Features

- Create, edit, delete, and view personal notes
- Search notes by title or content
- Light minimal UI with primary (#2563eb), secondary (#64748b), and accent (#22d3ee) color palette
- Sidebar with notes list, editable/view panel on right
- All notes stored **locally** in your browser (LocalStorage)

## Usage

```bash
npm install
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000)

## Notes

- All your notes are private and never leave your device.
- Delete your browser's local storage to remove all notes.

## Folder structure

- `src/components/Sidebar.tsx`: Sidebar note list & search
- `src/components/NoteEditor.tsx`: Main note editor/view panel
- `src/utils/localNotes.ts`: LocalStorage CRUD helpers
- `src/app/page.tsx`: Main UI and state logic

## Customization

- Change color variables in `src/app/globals.css` for further theming.
