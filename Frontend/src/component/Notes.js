import React, {useContext, useEffect} from "react";
import NoteContext from '../context/NoteContext'
import Noteitem from './Noteitem'

const Notes = ()=>{

    const {notes, fetchNotes} = useContext(NoteContext)
    useEffect(()=>{
      fetchNotes()
    },[])

    return(
     <div className="row my-3">
      {notes.map((note)=>{
        return <Noteitem key = {note._id} note = {note}/>
      })}
     </div>
    )
}

export default Notes