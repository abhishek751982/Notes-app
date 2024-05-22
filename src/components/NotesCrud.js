export default class NotesCrud {
  static getNotes = async (finalFormEndpoint, params = {}) => {
    const { id, setNotes } = params;
    console.log(finalFormEndpoint);
    if (id) {
      finalFormEndpoint = `${finalFormEndpoint}/${id}`;
    }
    try {
      const response = await fetch(finalFormEndpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("success", data);

      if (setNotes) {
        setNotes(data);
      }

      return data;
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  static createNotes = async (e, { data, setNotes }) => {
    e.preventDefault();
    const finalFormEndpoint = e.target.action;
    console.log(finalFormEndpoint, data);
    try {
      const response = await fetch(finalFormEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const createdNote = await response.json();
      console.log("success", createdNote);

      setNotes(prevNotes => [createdNote, ...prevNotes]);
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  static editNotes = async (e, { data, setNote }) => {
    e.preventDefault();
    const finalFormEndpoint = e.target.action;
    console.log(finalFormEndpoint, data);
    try {
      const response = await fetch(finalFormEndpoint, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();
      console.log("success", responseData);

      setNote(responseData);
    } catch (err) {
      console.error("Error editing note:", err);
    }
  };

  static deleteNotes = async (e, { setNotes }) => {
    e.preventDefault();
    const finalFormEndpoint = e.target.action;
    try {
      const response = await fetch(finalFormEndpoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();
      console.log("success", responseData);

      setNotes(responseData);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };
}
