import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
//import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType';
const Attendance = () => {

  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);  
  const [code, setCode] = useState(null);
  const [name, setName] = useState(null);
  const [itemId, setitemId] = useState(0);
  const [attendances, setAttendances] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  //const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  //const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }
  const getAttendances = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/attendance', null) 
        console.log(data);
        if(data.status){  
            setAttendances(data.value); 
        } else{
            toast.error(data.msg); 
        }
        return data;
    }catch(error){
          console.log(error);
           
    }finally{
      setLoading(false);   
    }
  }

  const postCategory = async () =>{
    try{
      if(!code){
        toast.warning("Category code required");
        return;
      }else  if(!name){
        toast.warning("Category name required");
        return;
      }
      setLoading(true);     
      const {data} = itemId>0 ?  await API.put('/category/'+itemId, {code:code, name:name})   : await API.post('/category', {code:code, name:name}) 
      console.log(data);
      if(data.status){  
        getAttendances();
         toast.success(data.msg);  
         setitemId(0);
      } else{
          toast.error(data.msg); 
      }
      return data;
    }catch(error){
          console.log(error);
          
    }finally{
      setLoading(false);   
    }
  }

 /*  const setItemToEdit = (itemd)=>{
      setCode(itemd.code); setName(itemd.name); setitemId(itemd.id);
  } */

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/category/'+itemId) 
      console.log(data);
      if(data.status){  
        toast.success(data.msg); 
        setitemId(0);
        getAttendances();
      } else{
          toast.error(data.msg); 
      }
      return data;
    }catch(error){
          console.log(error);
          
    }finally{
      setLoading(false);   
    }
  }


  useEffect(()=>{ 
    getAttendances();
  },[])

  const handleSave = ()=>{
    postCategory();
    modalClose();
  }
 const handleDelete = ()=>{
  deleteCategory()
  modalDelClose();
 }

  return( 
    <>
    {
      loading ? <Spinner/> : (
     <Layout>
     <div className="card">
                <h5 className="card-header">Attendance</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Employee</td>   
                  <td>Check In</td>   
                  <td>Check Out</td>    
                  <td>In Location</td>   
                  <td>Out Location</td>   
                  <td>Starting Meter</td>   
                  <td>Ending Meter</td>  
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { attendances ?
                attendances.map((data,index) => {
                        return(<tr key={data.id}> 
                           <td>{data.useraccount.email}</td>
                           <td>{new Date(data.checkIn).toLocaleDateString()}</td>
                           <td>{ data.checkOut!=null ? new Date(data.checkIn).toLocaleDateString() : "Not available"}</td>
                           <td>{data.checkinLat}, {data.checkinLong}</td> 
                           <td>{ data.checkOut!=null ? (data.checkOutLat , data.checkOutLong) : 'Not available' }</td> 
                           <td>{data.odmeter !=null ? data.odmeter : 'Not Available'}</td>
                           <td>{data.odmeterEnd  !=null ? data.odmeterEnd : 'Not Available'}</td>
                        </tr>) 
                    })  : null
                }
            </tbody>
            </table>
        </div>
      </div>
      <Modal show={show} onHide={modalClose}> 
        <Modal.Header closeButton>
          <Modal.Title>
           Sample Modal Heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputType className={'form-control'} inputType={'text'} labelFor={'code'} 
          onChange={(e)=>setCode(e.target.value)}
          labelText={'Category Code'} name={code} placeholder={'Category Code'} value={code}/>
           <InputType className={'form-control'} inputType={'text'} labelFor={'name'} 
          onChange={(e)=>setName(e.target.value)}
          labelText={'Category Name'} name={name} placeholder={'Category Name'} value={name}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-sm btn-primary" buttonText={'Save'} handleClick={()=>handleSave()}>
           Save changes
          </Button>
          <Button className="btn btn-sm btn-dark"  buttonText={'Close'} handleClick={()=>modalClose()}>
           Close
          </Button>
        </Modal.Footer> 
      </Modal>
      <Modal show={delShow} onHide={modalDelClose}> 
        <Modal.Header closeButton>
          <Modal.Title>
           Sample Modal Heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          Are you sure, do you want to delete?
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-sm btn-primary" buttonText={'Delete'} handleClick={()=>handleDelete()}>
           Save changes
          </Button>
          <Button className="btn btn-sm btn-dark"  buttonText={'Close'} handleClick={modalDelClose}>
           Close
          </Button>
        </Modal.Footer> 
      </Modal>
     </Layout>)}
    </>
  );
} 

export default Attendance