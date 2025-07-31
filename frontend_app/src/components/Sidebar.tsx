"use client";
import React from "react";
import { Note } from "../utils/localNotes";

type SidebarProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onSearch: (v: string) => void;
  search: string;
};

export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onCreate,
  onSearch,
  search,
}: SidebarProps) {
  return (
    <aside className="bg-[#f8fafc] border-r border-[#e5e7eb] w-full sm:w-72 min-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
        <input
          type="text"
          value={search}
          placeholder="Search notes..."
          className="rounded px-2 py-1 w-40 text-sm border border-[#e5e7eb] outline-none focus:ring-2 focus:ring-[#22d3ee] transition"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button
          aria-label="Add new note"
          title="Add new note"
          className="bg-[#22d3ee] hover:bg-[#2563eb] transition text-white rounded-full h-8 w-8 flex items-center justify-center ml-2 shadow-sm"
          onClick={onCreate}
        >
          <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12m6-6H4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <div className="overflow-auto flex-1">
        <ul className="my-2">
          {notes.length === 0 && (
            <li className="text-sm text-[#64748b] px-6 py-4 text-center select-none">No notes found.</li>
          )}
          {notes.map((n) => (
            <li
              key={n.id}
              tabIndex={0}
              onClick={() => onSelect(n.id)}
              className={`cursor-pointer px-5 py-3 truncate border-b border-[#f1f5f9] focus:outline-accent
               ${selectedId === n.id
                  ? "bg-[#e0f2fe] text-[#2563eb] font-semibold"
                  : "hover:bg-[#f1f5f9] text-[#334155]"}`}
            >
              <span>{n.title || <span className="italic text-[#64748b]">Untitled</span>}</span>
              <span className="block text-xs text-[#94a3b8]">{new Date(n.updated).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
