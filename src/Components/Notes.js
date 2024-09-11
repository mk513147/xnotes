import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(NoteContext);
    const history = useNavigate();
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote();
        }
        else {
            history("/login");
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    });

    const ref = useRef(null)// Refers to a single element. Use when want to toggle something.
    const refClose = useRef(null)// Refers to a single element. Use when want to toggle something.

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        e.preventDefault();// Prevents page from loading
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />  </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 4 || note.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'Add notes to view..'}
                </div>
                {notes.map((element) => {
                    return <NoteItem key={element._id} updateNote={updateNote} showAlert={props.showAlert} note={element} />
                })}
            </div>
        </>
    )
}

export default Notes
