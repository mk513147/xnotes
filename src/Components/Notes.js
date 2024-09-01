import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';


const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, getNote} = context;
    useEffect(()=>{
        getNote();
        // eslint-disable-next-line
    }, [])
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
