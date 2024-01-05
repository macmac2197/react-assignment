import React, { FormEvent, useMemo, useState } from "react";
import { isEmpty } from "../../utils/isEmpty";
import { useDispatch } from "react-redux";
import { Note } from "../../types/noteInterface";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { addNote, toogleAddNote } from "../../redux/slices/noteSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./Form.css";

interface NoteForm {
  title: string;
  description: string;
}

interface NoteFormError {
  [key: string]: string;
}

const noteInitialState: NoteForm = {
  title: "",
  description: "",
};

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const { isAddNote } = useSelector((state: RootState) => state.notes);
  const userName = useSelector((state: RootState) => state.auth.username);
  const [personalNote, setPersonalNote] = useState<NoteForm>(noteInitialState);
  const [formError, setFormError] = useState<NoteFormError>({
    title: "",
    description: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const isSaveButtonEnabled = useMemo(() => {
    const { title, description } = personalNote;
    return !isEmpty(title) && !isEmpty(description);
  }, [personalNote]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setPersonalNote({ ...personalNote, [name]: value });
  };

  const noteValidation = (name: string, value: string | null): void => {
    if (isEmpty(value)) {
      setFormError({
        ...formError,
        [name]: `${name} field is required.`,
      });
    } else {
      setFormError({
        ...formError,
        [name]: "",
      });
    }
  };

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    noteValidation(name, value);
    setIsSuccess(false);
  };

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault();

    const newNote = {
      id: generateUniqueId(),
      title: personalNote.title,
      description: personalNote.description,
      createdBy: userName,
      createdAt: new Date(),
    } as Note;

    dispatch(addNote(newNote));
    setPersonalNote(noteInitialState);
    setIsSuccess(true);
  };

  const addNoteToggle = (): void => {
    dispatch(toogleAddNote(!isAddNote));
  };

  return (
    <div className="note-form">
      <h2>Add Note</h2>
      {isSuccess && (
        <div className="success-message">New note successfully added!</div>
      )}
      <form onSubmit={handleSaveNote}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={personalNote.title}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            type="text"
            name="title"
          />
          {formError.title && (
            <div className="text-error">{formError.title}</div>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={personalNote.description}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            name="description"
            rows={4}
          />
          {formError.description && (
            <div className="text-error">{formError.description}</div>
          )}
        </div>

        <button
          className="save-btn"
          type="submit"
          disabled={!isSaveButtonEnabled}
        >
          Save Note
        </button>
        <button className="cancel-btn" type="button" onClick={addNoteToggle}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Form;
