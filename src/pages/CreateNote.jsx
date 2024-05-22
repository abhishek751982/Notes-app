import { useState } from "react";
import { IoIosArrowBack, IoIosSave } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useCreateDate from "../components/useCreateDate";
import { backendLink } from "../constants";
import NotesCrud from "../components/NotesCrud.js";

const CreateNote = ({ setNotes }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const date = useCreateDate();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title && details) {
      const note = { id: uuid(), title, details, date };
      console.log("Creating note:", note); 

      setNotes(prevNotes => [note, ...prevNotes]);
      
      try {
        await NotesCrud.createNotes(e, { data: note, setNotes });
        console.log("Note created successfully.");
        
        navigate('/');  
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }
  };

  return (
    <form 
      onSubmit={onSubmit} 
      noValidate 
      method="POST" 
      action={`${backendLink}/api/notes`}
    >
      <header className="create-note__header">
        <Link 
          to="/" 
          className="btn"
        >
          <IoIosArrowBack />
        </Link>
        <button 
          className="btn" 
          type="submit"
        >
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
        >
        </textarea>
      </div>
    </form>
  );
};

export default CreateNote;
