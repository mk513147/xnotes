import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';

const Addnote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    let n1 = {
        title: "",
        description: "",
        tag: "default"
    }
    const [note, setNote] = useState(n1);


    const handleAddNote = (e)=>{
        e.preventDefault();// Prevents page from loading
        addNote(note.title, note.description, note.tag);
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
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
