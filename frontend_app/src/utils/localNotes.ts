//
// Notes local storage utility for Next.js app.
// Provides CRUD operations for personal notes stored in browser localStorage.
//

// PUBLIC_INTERFACE
export interface Note {
  id: string;
  title: string;
  content: string;
  updated: number; // epoch ms
}

const STORAGE_KEY = "personal_notes";

// PUBLIC_INTERFACE
export function getNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const notes = JSON.parse(raw);
    return Array.isArray(notes) ? notes : [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes: Note[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// PUBLIC_INTERFACE
export function addNote(note: Note) {
  const notes = getNotes();
  notes.unshift(note);
  saveNotes(notes);
}

// PUBLIC_INTERFACE
export function updateNote(updated: Note) {
  let notes = getNotes();
  notes = notes.map((n) => (n.id === updated.id ? updated : n));
  saveNotes(notes);
}

// PUBLIC_INTERFACE
export function deleteNote(id: string) {
  let notes = getNotes();
  notes = notes.filter((n) => n.id !== id);
  saveNotes(notes);
}

// PUBLIC_INTERFACE
export function getNoteById(id: string): Note | undefined {
  const notes = getNotes();
  return notes.find((n) => n.id === id);
}
