import React from 'react'
import NoteContext from '../context/NoteContext'
import { useContext } from 'react'

const About = ()=>{
    const a = useContext(NoteContext)
    return(
        <>
        This is About {a.name}
        </>
    )
}

export default About