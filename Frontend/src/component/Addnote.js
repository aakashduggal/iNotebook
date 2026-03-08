import React, {useContext,useState} from "react";
import NoteContext from '../context/NoteContext'

const Addnote = (props) => {
const {addNote} = useContext(NoteContext)

const [note, setNote] = useState({title: "", description: "", tag: ""})

const handleSubmit = (e)=>{
    e.preventDefault()
   addNote(note.title, note.description, note.tag)
  setNote({title: "", description: "", tag: ""})
  props.showAlert("Note added Successfully", "success")
}

const onChange = (e)=>{

    setNote({...note, [e.target.name] : e.target.value})

}

    return (
    <div className='container my-3'>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} minLength={5} required  aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={5} required />
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
    )   
}

export default Addnote