import React from 'react'

function Alert(props){
    const capitalised = (text)=>{
        if(text === 'danger'){
            text = 'error'
        }
      return text.charAt(0).toUpperCase() + text.slice(1)
    }

  return(  
   props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
     <strong>{capitalised(props.alert.type)}</strong> : {props.alert.msg}
    </div>
    
  )
}

export default Alert