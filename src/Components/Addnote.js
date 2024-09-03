import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';

const Addnote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    let n1 = {
        title: "",
        description: "",
        tag: ""
    }
    const [note, setNote] = useState(n1);


    const handleAddNote = (e)=>{
        e.preventDefault();// Prevents page from loading
        addNote(note.title, note.description, note.tag);
        setNote(n1);
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container my-3">
            <h1 className='my-2'>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<4 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
