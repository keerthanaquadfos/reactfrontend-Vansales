import React from 'react'

const Filter = ({ filterText, onFilter, onClear }) => ( 
    <>
        <div class="input-group">
            <input
                id="search"
                type="text"
                class="form-control"
                placeholder="Search here...." 
                value={filterText}
                onChange={onFilter}
            />
            <button className="btn btn-outline-primary" type="button" id="button-addon2"  onClick={onClear}>x</button>
        </div> 
    </> 
)

export default Filter