import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType';
const ComplaintType = () => {

  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);   
  const [name, setName] = useState(null);
  const [itemId, setitemId] = useState(0);
  const [complaintTypes, setComplaintTypes] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item); }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }
  const getCompaintTypes = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/complaint-type', null)  
        if(data.status){  
            setComplaintTypes(data.value); 
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
        if(!name){
        toast.warning("Name required");
        return;
      }
      setLoading(true);     
      const {data} = itemId>0 ?  await API.put('/complaint-type/'+itemId, { name:name})   : await API.post('/complaint-type', {name:name}) 
      console.log(data);
      if(data.status){
        setName(null);
        getCompaintTypes();
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

  const setItemToEdit = (itemd)=>{
      setName(itemd.name); setitemId(itemd.id);
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/complaint-type/'+itemId) 
      console.log(data);
      if(data.status){  
        toast.success(data.msg); 
        setitemId(0);
        getCompaintTypes();
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
    getCompaintTypes();
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
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} ></i>Complaint Type</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>     
                  <td>Name</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { complaintTypes ?
                complaintTypes.map((data,index) => {
                        return(<tr key={data.id}>  
                           <td>{data.name}</td>
                            <td>
                                <div className="">
                                    <Link onClick={()=>modalShow(data)} style={{width:100}}><i className="bx bx-edit-alt me-2" title="Edit"></i></Link>
                                    <Link onClick={()=>modelDeleteShow(data.id)} style={{width:100}}><i className="bx bx-trash me-2" title="Delete"></i></Link> 
                                </div>         
                            </td>
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
           Complaint Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
           <InputType className={'form-control'} inputType={'text'} labelFor={'name'} 
          onChange={(e)=>setName(e.target.value)}
          labelText={'Complaint Type Name'} name={name} placeholder={'Complaint Type Name'} value={name}/>
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
          Complaint Type
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

export default ComplaintType