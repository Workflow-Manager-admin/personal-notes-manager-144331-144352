"use client";

import React, { useRef, useEffect } from "react";
import { Note } from "../utils/localNotes";

type NoteEditorProps = {
  note: Note | null;
  onSave: (note: Note) => void;
  onDelete: (id: string) => void;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
};

export default function NoteEditor({
  note,
  onSave,
  onDelete,
  editMode,
  setEditMode,
}: NoteEditorProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editMode && note && titleRef.current) {
      titleRef.current.select();
    }
  }, [editMode, note]);

  if (!note) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-[#64748b]">
        <p className="mb-2">No note selected.</p>
        <span className="text-xs">Pick or create a note to get started.</span>
      </div>
    );
  }

  const handleSave = () => {
    if (!titleRef.current || !contentRef.current) return;
    onSave({
      ...note,
      title: titleRef.current.value,
      content: contentRef.current.value,
      updated: Date.now(),
    });
    setEditMode(false);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto px-3 py-6">
      <div className="flex items-center gap-2 mb-2">
        {editMode ? (
          <input
            ref={titleRef}
            defaultValue={note.title}
            className="text-xl bg-white border border-[#e5e7eb] rounded px-2 py-1 flex-1 outline-none focus:ring-2 focus:ring-primary"
            placeholder="Note title"
            maxLength={100}
            autoFocus
          />
        ) : (
          <h2 className="text-2xl font-bold flex-1 truncate">{note.title || <span className="italic text-[#64748b]">Untitled</span>}</h2>
        )}
        <button
          className="text-[#64748b] p-1 hover:text-[#ef4444] focus:outline-none"
          title="Delete note"
          aria-label="Delete note"
          onClick={() => onDelete(note.id)}
        >
          <svg width={22} height={22} viewBox="0 0 20 20" fill="none">
            <path d="M6 6l8 8m0-8l-8 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
          </svg>
        </button>
        {!editMode ? (
          <button
            className="ml-1 px-3 py-1 rounded text-sm bg-secondary text-white hover:bg-primary transition"
            style={{ background: "#64748b" }}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="ml-1 px-3 py-1 rounded text-sm bg-primary text-white hover:bg-accent transition"
            style={{ background: "#2563eb" }}
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
      <div className="mb-2 text-xs text-[#94a3b8]">
        Last updated: {new Date(note.updated).toLocaleString()}
      </div>
      {editMode ? (
        <textarea
          ref={contentRef}
          defaultValue={note.content}
          className="flex-1 bg-white border border-[#e5e7eb] rounded px-2 py-2 w-full min-h-[300px] outline-none font-mono focus:ring-2 focus:ring-accent"
          spellCheck={false}
        />
      ) : (
        <pre className="flex-1 whitespace-pre-wrap font-mono bg-[#f9fafb] border border-[#e5e7eb] rounded px-3 py-3">{note.content}</pre>
      )}
    </div>
  );
}
