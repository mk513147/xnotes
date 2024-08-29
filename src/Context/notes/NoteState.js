import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=>{
    const s1  = {
        "name": "Mohit",
        "class": "2A",
    }

    const [state, setState] = useState(s1);

    const update = ()=>{
        setTimeout(()=>{
            setState({
                "name": "Ada Pada",
                "class": "3c"
            })
        }, 2000);
    }
    return(
    <NoteContext.Provider value = {{state, update}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;