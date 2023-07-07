import React from 'react'

const Button = ({buttonText , handleClick, className, buttonType}) => {
  return (
    <> 
        <button className={className} type={buttonType} onClick={handleClick}>{buttonText}</button> 
    </>
  )
}

export default Button