import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{

    const initialNotes = [
  {
    "_id": "69a03296e0b6af3510e3e534",
    "user": "699ef5ad1a5cd52b1c4b8d33",
    "title": "My title1 ",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-02-26T11:46:30.819Z",
    "__v": 0
  },
  {
    "_id": "69a03296e0b6af3510e3e536",
    "user": "699ef5ad1a5cd52b1c4b8d33",
    "title": "My title2 ",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-02-26T11:46:30.930Z",
    "__v": 0
  },
  {
    "_id": "69a03297e0b6af3510e3e538",
    "user": "699ef5ad1a5cd52b1c4b8d33",
    "title": "My title3 ",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-02-26T11:46:31.206Z",
    "__v": 0
  },
  {
    "_id": "69a43f10149ad73f8cb70k1af",
    "user": "699ef5ad1a5cd52b1c4b8d33",
    "title": "My title4 ",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-03-01T13:28:48.470Z",
    "__v": 0
  }
]

const [notes, setNotes] = useState(initialNotes)

// Add a note
const addNote = (title, description, tag)=>{
  const note = {
    "_id": "69a43f10149ad73f8cb701af",
    "user": "699ef5ad1a5cd52b1c4b8d33",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2026-03-01T13:28:48.470Z",
    "__v": 0
  }
  setNotes(notes.concat(note))
}

// delete a note
const deleteNote = (id)=>{
  const newNotes = notes.filter((note)=>(note._id !== id))
  setNotes(newNotes)
}

// update a note
const updateNote = (id, title, description, tag)=>{
for(let i = 0; i<notes.length(); i++){
  const element = notes[i]
  if(element._id === id){
    element.title = title,
    element.description = description,
    element.tag = tag
  }
}
}

    return(
        <>
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
        </>
    )
}
export default NoteState