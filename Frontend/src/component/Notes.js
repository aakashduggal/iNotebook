import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from '../context/NoteContext'
import Noteitem from './Noteitem'

const Notes = (props) => {

  const { notes, fetchNotes, editNote } = useContext(NoteContext)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "default" })

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [])
  
  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (newNote) => {
    ref.current.click()
    setNote({id: newNote._id, etitle: newNote.title, edescription: newNote.description, etag: newNote.tag})
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    refClose.current.click()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("Note Updated Successfully", "success")
  }

  const onChange = (e) => {

    setNote({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <div className="row my-3">

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} minLength={5} required onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleSubmit} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>        
      
      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container">
          {notes.length === 0 && 'No notes to display'}
        </div>
      {notes.map((note) => {
        return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
      })}
      </div>
    </div>
  )
}

export default Notes