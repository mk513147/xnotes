import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';


const Notes = () => {
    const context = useContext(NoteContext);
    const {notes} = context;
    return (
        <>
            <Addnote />
            <div className="row my-5">
                <h2>Your Notes</h2>
                {notes.map((element) => {
                    return <NoteItem key={element._id} note={element} />
                })}
            </div>
        </>
    )
}

export default Notes
