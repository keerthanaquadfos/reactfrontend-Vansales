import React from 'react'

const SelectDropDown = ({hintText , options, defautlValue, value, onChange}) => {
  return (
    <>
     <div className="mb-3">
            <label className="form-label">{hintText}</label>
        <select defaultValue={defautlValue} value={value} className='form-control mb-3' onChange={onChange}>
                {
                  options ?  options.map((data,index) => (<><option value={data.id}>{data.name}</option></>)) 
                  : <options value={0}>Not Available</options>
                }
        </select>
        </div> 
    </>
  )
}

export default SelectDropDown