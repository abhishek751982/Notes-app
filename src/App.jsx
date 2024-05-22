import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NotesCrud from "./components/NotesCrud";
import { backendLink } from "./constants";
import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await NotesCrud.getNotes(
          `${backendLink}/api/notes`
        );
        if (Array.isArray(fetchedNotes)) {
          setNotes(fetchedNotes);
        } else {
          console.error("Fetched notes is not an array:", fetchedNotes);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route path="/create-note" element={<CreateNote setNotes={setNotes} />} />
          <Route path="/edit-note/:id" element={<EditNote notes={notes} setNotes={setNotes} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
