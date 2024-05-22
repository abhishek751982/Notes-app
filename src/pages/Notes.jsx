import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { BsPlusLg } from "react-icons/bs";
import { useEffect, useState } from "react";

const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleSearch = () => {
    if (!Array.isArray(notes)) {
      return;
    }
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  useEffect(() => {
    handleSearch();
  }, [text]);

  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>Notes</h2>}
        {showSearch && (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Search by the keyword..."
          />
        )}
        <button
          className="btn"
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {showSearch ? <MdClose /> : <CiSearch />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length === 0 && (
          <p className="empty__notes">No notes found.</p>
        )}
        {Array.isArray(filteredNotes) &&
          filteredNotes.map((note) => <NoteItem key={note._id} note={note} />)}
      </div>
      <Link to="/create-note" className="btn add__btn">
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Notes;
