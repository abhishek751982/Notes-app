import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosSave } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";
import useCreateDate from "../components/useCreateDate";
import { backendLink } from "../constants";

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const date = useCreateDate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !notes) return;
    const foundNote = notes.find((item) => item._id === id);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setDetails(foundNote.details);
    } else {
      console.log(`Note with ID ${id} not found.`);
    }
  }, [id, notes]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title && details) {
      const updatedNote = { ...note, title, details, date };

      // Update note in local state
      const newNotes = notes.map((item) => (item._id === id ? updatedNote : item));
      setNotes(newNotes);

      // Send PUT request to update note in backend
      try {
        const response = await fetch(`${backendLink}/api/notes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });

        if (!response.ok) {
          throw new Error('Failed to update note');
        }

        navigate('/');
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete?")) {
      // Update local state
      const newNotes = notes.filter((item) => item._id !== id);
      setNotes(newNotes);

      // Send DELETE request to delete note from backend
      try {
        const response = await fetch(`${backendLink}/api/notes/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete note');
        }

        navigate('/');
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  return (
    <>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
        <button className="btn" onClick={onSubmit}>
          <IoIosSave />
        </button>
      </header>

      <div className="create-note__form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Type Something..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default EditNote;
