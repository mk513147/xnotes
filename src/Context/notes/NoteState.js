import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // SET note
  const getNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNmZlOWVhMGFhNWViZDY0NjY0NDhiIn0sImlhdCI6MTcyNDMyOTU3MX0._5Sip3OeCKJW7cznjZziLIw0WB1AvMmwLsVmldEZ7Kk"
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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNmZlOWVhMGFhNWViZDY0NjY0NDhiIn0sImlhdCI6MTcyNDMyOTU3MX0._5Sip3OeCKJW7cznjZziLIw0WB1AvMmwLsVmldEZ7Kk"
        }, body: JSON.stringify({ title, description, tag })
      });

      const note = {
        "_id": "66c74d19639db954ae501b8393",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }

    // Delete note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNmZlOWVhMGFhNWViZDY0NjY0NDhiIn0sImlhdCI6MTcyNDMyOTU3MX0._5Sip3OeCKJW7cznjZziLIw0WB1AvMmwLsVmldEZ7Kk"
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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNmZlOWVhMGFhNWViZDY0NjY0NDhiIn0sImlhdCI6MTcyNDMyOTU3MX0._5Sip3OeCKJW7cznjZziLIw0WB1AvMmwLsVmldEZ7Kk"
        }, body: JSON.stringify({ title, description, tag })
      });

      // Edit note
      for (let index = 0; index < notes.length; index++) {
        const element = element[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    }
    return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
        {props.children}
      </NoteContext.Provider>
    )
  }

  export default NoteState;