import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>          
            <div class="card border-info mb-3 my-3">
                <h4 class="card-header">{note.title}</h4>
                <div class="card-body">
                    <p class="card-text">{note.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus corporis explicabo perspiciatis? Fuga ut fugit rem nobis nulla esse quas corrupti enim ratione? Quis explicabo soluta pariatur eius, maxime dolore?
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
