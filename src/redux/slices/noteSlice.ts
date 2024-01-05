import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/noteInterface";

interface NotesState {
  notes: Note[];
  isAddNote: boolean;
  selectedNote: Note | null;
}

// Load notes from local storage if available
const loadNotesState = (createdBy: string | null): Note[] => {
  try {
    const serializedNotesState = localStorage.getItem(`notes-${createdBy}`);

    if (serializedNotesState !== null) {
      return JSON.parse(serializedNotesState);
    }
    return [];
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return [];
  }
};

// Save notes to local storage
const saveNotes = (state: any, createdBy: string | null) => {
  try {
    const serializedNotesState = JSON.stringify(state);
    localStorage.setItem(`notes-${createdBy}`, serializedNotesState);
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};

const notesInitialState: NotesState = {
  notes: [],
  isAddNote: false,
  selectedNote: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState: notesInitialState,
  reducers: {
    toogleAddNote: (state, action: PayloadAction<boolean>) => {
      state.isAddNote = action.payload;
    },
    setNotes: (state, action: PayloadAction<string | null>) => {
      state.notes = loadNotesState(action.payload);
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      saveNotes(state.notes, action.payload.createdBy);
    },
    deleteNote: (
      state,
      action: PayloadAction<{ id: string | number; createdBy: string | null }>
    ) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      state.selectedNote = null;
      saveNotes(state.notes, action.payload.createdBy);
    },
    viewNoteDetails: (state, action: PayloadAction<string | number>) => {
      state.selectedNote =
        state.notes.find((note) => note.id === action.payload) || null;
    },
    closeNoteDetails: (state) => {
      state.selectedNote = null;
    },
  },
});

export const {
  toogleAddNote,
  setNotes,
  addNote,
  deleteNote,
  viewNoteDetails,
  closeNoteDetails,
} = notesSlice.actions;
export default notesSlice.reducer;
