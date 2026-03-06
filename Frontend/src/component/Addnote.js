import React, {useContext,useState} from "react";
import NoteContext from '../context/NoteContext'

const Addnote = () => {
const {addNote} = useContext(NoteContext)

const [note, setNote] = useState({title: "", description: "", tag: "default"})

const handleSubmit = (e)=>{
    e.preventDefault()
   addNote(note.title, note.description, note.tag)
}

const onChange = (e)=>{

    setNote({...note, [e.target.name] : e.target.value})

}

    return (
    <div className='container my-3'>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
    )   
}

export default Addnote