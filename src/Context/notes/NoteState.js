import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=>{

    const notesInitial = [{
        "_id": "66c74d19639db954ae501b83",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": "mera titul",
        "description": "subha jaldi utha karo",
        "tag": "health care",
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      },
      {
        "_id": "66c74d19639db954ae501b803",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": "mera titul",
        "description": "subha jaldi utha karo",
        "tag": "health care",
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      },
      {
        "_id": "66c74d19639db954ae501b843",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": "mera titul",
        "description": "subha jaldi utha karo",
        "tag": "health care",
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      },
      {
        "_id": "66c74d19639db954ae501b893",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": "mera titul",
        "description": "subha jaldi utha karo",
        "tag": "health care",
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      }];

      const [notes, setNotes] = useState(notesInitial)

      // Add note
      const addNote = (title, description, tag)=>{
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
      const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }
      
      // Edit note
      const editNote = (id, title, description, tag )=>{
        
      }
    return(
    <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;