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
        "_id": "66c74d19639db954ae501b83",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": "mera titul",
        "description": "subha jaldi utha karo",
        "tag": "health care",
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      },
      {
        "_id": "66c74d19639db954ae501b83",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": "mera titul",
        "description": "subha jaldi utha karo",
        "tag": "health care",
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      },
      {
        "_id": "66c74d19639db954ae501b83",
        "user": "66c6fe9ea0aa5ebd6466448b",
        "title": "mera titul",
        "description": "subha jaldi utha karo",
        "tag": "health care",
        "date": "2024-08-22T14:37:13.741Z",
        "__v": 0
      }];

      const [notes, setNotes] = useState(notesInitial)
    return(
    <NoteContext.Provider value = {{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;