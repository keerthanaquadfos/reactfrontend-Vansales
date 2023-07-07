import React from 'react'

const SubmitButton = ({buttonText,className}) => {
  return (
    <> 
        <button className={className}>{buttonText}</button> 
    </>
  )
}

export default SubmitButton