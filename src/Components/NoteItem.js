import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card border-info mb-3 my-3">
                <h4 className="card-header">{note.title}</h4>
                <div className="card-body">
                    <p className="card-text">{note.description}
                    </p>
                    <i className="fa-solid fa-trash-can mx-2" style={{ color: "#e13751" }} onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "danger") }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" style={{ color: "#63E6BE" }} onClick={() => { updateNote(note); props.showAlert("Updated Successfully", "success")  }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
