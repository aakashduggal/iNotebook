import React, {useContext} from "react";
import NoteContext from '../context/NoteContext'

const Noteitem = (props) => {
    const {deleteNote} = useContext(NoteContext)
    const { note, updateNote } = props
    return (
    
            <div className="col-md-3 my-3" >
             <div className="card">
                <div className="card-body">
                        <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-1" onClick={()=> {deleteNote(note._id); props.showAlert("Note Deleted Successfully", "danger")}}></i>
                    <i className="fa-regular fa-pen-to-square mx-1" onClick={()=>updateNote(note)}></i>

                        </div>
                
                    <p className="card-text">{note.description}</p>
                   </div>
                </div>
            </div>
        
    )
}
export default Noteitem