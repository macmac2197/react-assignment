import React from "react";
import { Note } from "../../types/noteInterface";

import "./Details.css";

interface DetailsInterface {
  note: Note | null;
  onCloseDetails: () => void;
}

const Details: React.FC<DetailsInterface> = (props: DetailsInterface) => {
  const { note, onCloseDetails } = props;
  return (
    <div className="note-details">
      <h2>{note?.title}</h2>
      <p>November 1, 2023</p>
      <p>{note?.description}</p>
      <button className="close-btn" onClick={() => onCloseDetails()}>
        Close
      </button>
    </div>
  );
};

export default Details;
