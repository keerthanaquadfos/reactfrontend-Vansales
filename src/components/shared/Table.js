import React from 'react'
import { Link } from 'react-router-dom';
const Table = ({columns,rows, onDelete}) => {
  return (
    <>
        <table className="table">
            <thead>
                <tr>
                { 
                    columns.map((item) => {
                        return [   
                           <td>{item}</td>  
                        ];
                    })
                } 
                <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                {rows.map((data,index) => {
                        return(<tr>
                            {columns.map((_,index) => {
                                return (
                                  <><td>{data[index]}</td></> 
                                )
                            })}
                            <td>
                                <div className="">
                                    <Link to={`/category/${ data[0] }`} style={{width:100}}><i className="bx bx-edit-alt me-2" title="Edit"></i></Link>
                                    <Link to={`/category/delete/${ data[0] }`} style={{width:100}}><i className="bx bx-trash me-2" title="Delete"></i></Link> 
                                </div>         
                            </td>
                        </tr>) 
                    }) 
                }
            </tbody>
        </table>
    </>
  )
}

export default Table