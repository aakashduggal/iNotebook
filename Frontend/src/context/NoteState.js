import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"

    const initialNotes = []

const fetchNotes = async ()=>{
  const response = await fetch(`${host}/api/notes/getAllnotes`,{
    method: 'GET',
    headers:{
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5ZWY1YWQxYTVjZDUyYjFjNGI4ZDMzIn0sImlhdCI6MTc3MjA5ODU3Mn0.D4gaJtCLckLP7T3thRZ7XrMPfeFnafPJX0tU012CTfc',
    }
  })
  const json = response.json()
  console.log(json)
}

const [notes, setNotes] = useState(initialNotes)

// Add a note
const addNote = async (title, description, tag)=>{
  const response = await fetch(`${host}/api/notes/addNote`,{
    method: 'POST',
    headers:{
      'content-type' : 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5ZWY1YWQxYTVjZDUyYjFjNGI4ZDMzIn0sImlhdCI6MTc3MjA5ODU3Mn0.D4gaJtCLckLP7T3thRZ7XrMPfeFnafPJX0tU012CTfc'
    },
    body: json.stringify({title, description, tag})
  })
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
    element.title = title
    element.description = description
    element.tag = tag
  }
}
}

    return(
        <>
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
        </>
    )
}
export default NoteState