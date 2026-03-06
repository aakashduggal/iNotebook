import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
  
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

const fetchNotes = async ()=>{
  const response = await fetch(`${host}/api/notes/getAllnotes`,{
    method: 'GET',
    headers:{
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5ZWY1YWQxYTVjZDUyYjFjNGI4ZDMzIn0sImlhdCI6MTc3MjA5ODU3Mn0.D4gaJtCLckLP7T3thRZ7XrMPfeFnafPJX0tU012CTfc',
    }
  })
  const json = await response.json()
  console.log(json)
  setNotes(json)
}


// Add a note
const addNote = async (title, description, tag)=>{
  const response = await fetch(`${host}/api/notes/addNote`,{
    method: 'POST',
    headers:{
      'content-type' : 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5ZWY1YWQxYTVjZDUyYjFjNGI4ZDMzIn0sImlhdCI6MTc3MjA5ODU3Mn0.D4gaJtCLckLP7T3thRZ7XrMPfeFnafPJX0tU012CTfc'
    },
    body: JSON.stringify({title, description, tag})
  })

    const json = await response.json()
  setNotes(notes.concat(json))

}

// delete a note
const deleteNote = async (id)=>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5ZWY1YWQxYTVjZDUyYjFjNGI4ZDMzIn0sImlhdCI6MTc3MjA5ODU3Mn0.D4gaJtCLckLP7T3thRZ7XrMPfeFnafPJX0tU012CTfc'
    }
  })
  const json = response.json()
  console.log(json)
   const newNotes = notes.filter((note)=>(note._id !== id))
  setNotes(newNotes)
}

// update a note
const updateNote = async (id, title, description, tag)=>{
   const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
    method: 'PUT',
    headers:{
      'content-type' : 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5ZWY1YWQxYTVjZDUyYjFjNGI4ZDMzIn0sImlhdCI6MTc3MjA5ODU3Mn0.D4gaJtCLckLP7T3thRZ7XrMPfeFnafPJX0tU012CTfc'
    },
    
    body: JSON.stringify({title, description, tag})
  })
  const json = response.json()
  console.log(json)
for(let i = 0; i<notes.length; i++){
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