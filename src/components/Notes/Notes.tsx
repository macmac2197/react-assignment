import React from "react";
import { Note } from "../../types/noteInterface";

import "./Notes.css";

interface NotesInteface {
  note: Note;
  handleNoteViewDetails: (id: string | number) => void;
  handleDeleteNote: (id: string | number) => void;
}

const Notes: React.FC<NotesInteface> = (props: NotesInteface) => {
  const { note, handleNoteViewDetails, handleDeleteNote } = props;
  return (
    <div key={note.id} className="note-item">
      <div className="note-content">{note.title}</div>
      <div className="note-buttons">
        <button
          className="button view-button"
          onClick={() => handleNoteViewDetails(note.id)}
        >
          View Details
        </button>
        <button
          className="button delete-button"
          onClick={() => handleDeleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Notes;
