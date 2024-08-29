import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
    return (
        <div className="row my-5">
            <h2>Your Notes</h2>
            {notes.map((element) => {
                return <NoteItem note = {element}/>
            })}
        </div>
    )
}

export default Notes
