import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType';
const ShopRoute = () => {

  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);  
  const [code, setCode] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [itemId, setitemId] = useState(0);
  const [routes, setRoutes] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }
  const getRoutes = async ()=> {
    try{
        setLoading(true);     
        var compId = localStorage.getItem("companyId");
        const {data} = await API.get('/route/company/'+compId, null) 
        console.log(data);
        if(data.status){  
          setRoutes(data.value); 
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
        toast.warning("Code required");
        return;
      }else  if(!name){
        toast.warning("Name required");
        return;
      }
      setLoading(true);     
      var compId = localStorage.getItem("companyId");
      const {data} = itemId>0 ?  await API.put('/route/'+itemId, {companyId:compId, code:code, name:name, description:description})  
       : await API.post('/route', {companyId:compId, code:code, name:name,description:description}) 
      console.log(data);
      if(data.status){  
         getRoutes();
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
      setCode(itemd.code); setName(itemd.name); setitemId(itemd.id); setDescription(itemd.description);
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/route/'+itemId) 
      console.log(data);
      if(data.status){  
        setCode(null);
        setDescription(null);
        setName(null);
        toast.success(data.msg); 
        setitemId(0);
        getRoutes();
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
    getRoutes();
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
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} onClick={()=>modalShow({id:0,name:"",code:""})}></i>Route</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Code</td>   
                  <td>Name</td>   
                  <td>Description</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { routes ?
                routes.map((data,index) => {
                        return(<tr key={data.id}> 
                           <td>{data.code}</td>
                           <td>{data.name}</td>
                           <td>{data.description}</td>
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
           Route
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputType className={'form-control'} inputType={'text'} labelFor={'code'} 
          onChange={(e)=>setCode(e.target.value)}
          labelText={'Route Code'} placeholder={'Route Code'} value={code}/>
           <InputType className={'form-control'} inputType={'text'} labelFor={'name'} 
          onChange={(e)=>setName(e.target.value)}
          labelText={'Route Name'} placeholder={'Route Name'} value={name}/>

          <InputType className={'form-control'} inputType={'text'} labelFor={'desc'} 
          onChange={(e)=>setDescription(e.target.value)}
          labelText={'Description'} placeholder={'Description'} value={description}/>

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
         Route
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

export default ShopRoute