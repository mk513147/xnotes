import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // GET note
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      }
    })
    const json = await response.json();
    setNotes(json);
  }

    // Add note
    const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }, body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      setNotes(notes.concat(json))
    }

    // Delete note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          }
        })

      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes);
    }



    // API call
    const editNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }, body: JSON.stringify({ title, description, tag })
      });


      let newNotes = JSON.parse(JSON.stringify(notes));
      // Edit note
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
    }
    return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
        {props.children}
      </NoteContext.Provider>
    )
  }

  export default NoteState;