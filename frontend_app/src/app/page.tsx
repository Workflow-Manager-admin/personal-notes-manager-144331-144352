"use client";

import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";
import {
  Note,
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../utils/localNotes";

// Utility for generating random IDs
function uuid() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

// Page component
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");

  // Load notes from storage
  useEffect(() => {
    setNotes(getNotes());
  }, []);

  // Select latest note if none is selected & notes change
  useEffect(() => {
    if (!selectedId && notes.length > 0) {
      setSelectedId(notes[0].id);
    } else if (selectedId && !notes.find((n) => n.id === selectedId)) {
      setSelectedId(notes[0]?.id ?? null);
    }
  }, [notes, selectedId]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setEditMode(false);
  }, []);

  const handleCreate = useCallback(() => {
    const note: Note = {
      id: uuid(),
      title: "",
      content: "",
      updated: Date.now(),
    };
    addNote(note);
    setNotes(getNotes());
    setSelectedId(note.id);
    setEditMode(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Delete this note? This cannot be undone.")) {
        deleteNote(id);
        const newNotes = getNotes();
        setNotes(newNotes);
        if (selectedId === id) {
          setSelectedId(newNotes[0]?.id ?? null);
        }
        setEditMode(false);
      }
    },
    [selectedId]
  );

  const handleSave = useCallback(
    (note: Note) => {
      updateNote(note);
      const newNotes = getNotes();
      setNotes(newNotes);
      setSelectedId(note.id);
    },
    []
  );

  // Removed unused handleEdit function.

  const handleSearch = useCallback((term: string) => {
    setSearch(term);
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const selectedNote = selectedId
    ? notes.find((n) => n.id === selectedId) || null
    : null;

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-72 flex-shrink-0">
        <Sidebar
          notes={filteredNotes}
          selectedId={selectedId}
          onSelect={handleSelect}
          onCreate={handleCreate}
          onSearch={handleSearch}
          search={search}
        />
      </div>
      {/* Main panel */}
      <main className="flex-1 min-h-screen flex flex-col px-1">
        <header className="text-2xl font-semibold px-6 pt-4 pb-2 text-[#2563eb]">
          Personal Notes
        </header>
        <div className="border-t border-[#e5e7eb] flex-1 flex items-stretch">
          <NoteEditor
            note={selectedNote}
            onSave={handleSave}
            onDelete={handleDelete}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </div>
        <footer className="text-xs p-4 text-center text-[#64748b]">Personal Notes App – Your notes are saved privately in your browser.</footer>
      </main>
    </div>
  );
}
