import React from 'react'
import Notes from './Notes'
import Addnote from './Addnote'

const Home = () => {

    return (
        <>
            <div className='container my-3'>
            <h3>Add a Note</h3>
            
            <Addnote/>
            
            <div className='container my-3'>

            <Notes/>

            </div>
            </div>
        </>
    )
}

export default Home