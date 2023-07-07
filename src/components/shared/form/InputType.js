import React from 'react'

const InputType = ({inputType,value,onChange,name,labelFor,labelText,placeholder, className}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={labelFor} className="form-label">{labelText}</label>
        <input
          type={inputType}
          className={className}
          name={name} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default InputType