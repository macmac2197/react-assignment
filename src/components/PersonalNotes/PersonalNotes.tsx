import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  closeNoteDetails,
  deleteNote,
  setNotes,
  toogleAddNote,
  viewNoteDetails,
} from "../../redux/slices/noteSlice";
import Details from "../Details/Details";
import Notes from "../Notes/Notes";
import { isEmpty } from "../../utils/isEmpty";

import Form from "../Form/Form";

import "./PersonalNotes.css";

const PersonalNotes: React.FC = () => {
  const dispatch = useDispatch();
  const { notes, isAddNote, selectedNote } = useSelector(
    (state: RootState) => state.notes
  );
  const userName = useSelector((state: RootState) => state.auth.username);

  const addNoteToggle = (): void => {
    dispatch(toogleAddNote(!isAddNote));
  };

  const handleDeleteNote = (id: string | number): void => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      dispatch(deleteNote({ id, createdBy: userName }));
    }
  };

  const handleNoteViewDetails = (id: string | number): void => {
    dispatch(viewNoteDetails(id));
  };

  const handleCloseViewDetails = () => {
    dispatch(closeNoteDetails());
  };

  useEffect(() => {
    dispatch(setNotes(userName));
  }, [dispatch, userName]);

  return (
    <React.Fragment>
      {!isEmpty(selectedNote) ? (
        <Details note={selectedNote} onCloseDetails={handleCloseViewDetails} />
      ) : isAddNote ? (
        <Form />
      ) : (
        <div className="note">
          <button className="add-note" onClick={addNoteToggle}>
            Add Note
          </button>
          {isEmpty(notes) ? (
            <div>Notes Unavailable!</div>
          ) : (
            <>
              {notes.map((note) => (
                <Notes
                  note={note}
                  handleDeleteNote={handleDeleteNote}
                  handleNoteViewDetails={handleNoteViewDetails}
                />
              ))}
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default PersonalNotes;
