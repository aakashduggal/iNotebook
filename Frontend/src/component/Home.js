import React from 'react'
import Notes from './Notes'
import Addnote from './Addnote'

const Home = (props) => {
const {showAlert} = props
    return (
        <>
            <div className='container my-3'>
            <h3>Add a Note</h3>
            
            <Addnote showAlert={showAlert}/>
            
            <div className='container my-3'>

            <Notes showAlert={showAlert}/>

            </div>
            </div>
        </>
    )
}

export default Home