import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType';
const Category = () => {

  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);  
  const [code, setCode] = useState(null);
  const [name, setName] = useState(null);
  const [itemId, setitemId] = useState(0);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }
  const getCategories = async ()=> {
    try{
        setLoading(true);
        const id = localStorage.getItem('companyId');
        const {data} = await API.get(`/category/company/${id}`, null) 
        console.log(data);
        if(data.status){  
           setCategories(data.value); 
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
      const id = localStorage.getItem('companyId');
      const req = {code:code, name:name , companyId:id};
      const {data} = itemId>0 ?  await API.put('/category/'+itemId,req)   : await API.post('/category', req)  
      if(data.status){  
        setCode(null); 
        setName(null);
         getCategories();
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
      setCode(itemd.code); setName(itemd.name); setitemId(itemd.id);
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/category/'+itemId) 
      console.log(data);
      if(data.status){  
        toast.success(data.msg); 
        setitemId(0);
        getCategories();
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
     getCategories();
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
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} onClick={()=>modalShow({id:0,name:"",code:""})}></i>Category</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Code</td>   
                  <td>Name</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { categories ?
                categories.map((data,index) => {
                        return(<tr key={data.id}> 
                           <td>{data.code}</td>
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

export default Category