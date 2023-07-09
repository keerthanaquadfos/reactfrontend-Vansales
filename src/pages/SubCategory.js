import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType';
import SelectDropDown from '../components/shared/form/SelectDropDown';
const SubCategory = () => {
     
  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);  
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [itemId, setitemId] = useState(0);
  const [catId, setCatId] = useState(0);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }
  const getCategories = async ()=> {
    try{
        setLoading(true);     
        const id =localStorage.getItem('companyId');
        const {data} = await API.get(`/category/company/${id}`, null);
        if(data.status){  
           setCategories(data.value);  
           setCatId(data.value[0].id)
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
  const getSubCategories = async ()=> {
    try{
        setLoading(true);     
        const id =localStorage.getItem('companyId');
        const {data} = await API.get(`/subcategory/company/${id}`, null)  
        if(data.status){  
            setSubCategories(data.value); 
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
      if(code.length<=0){
        toast.warning("Sub Category code required");
        return;
      }else  if(name.length<=0){
        toast.warning("Sub Category name required");
        return;
       
    }else if(catId<=0 || catId==='undefined'){
        toast.warning("Category name required");
        return;
      }
      setLoading(true);
      const id =localStorage.getItem('companyId');  
      const {data} = itemId>0 ?  await API.put('/subcategory/'+itemId, {code:code, name:name, categoryId:catId,companyId:id})   : await API.post('/subcategory', {companyId:id,code:code, name:name,categoryId:catId})       
      if(data.status){           
         toast.success(data.msg); 
         setCode("");
         setName(""); 
         getSubCategories() ;
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
      setCode(itemd.code);
      setName(itemd.name); 
      setitemId(itemd.id);  
      if(itemd.id>0) 
        setCatId(itemd.category.id);
     
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/subcategory/'+itemId)  
      if(data.status){  
        toast.success(data.msg); 
        getSubCategories() ;
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


  useEffect(()=>{   
    getCategories()
    getSubCategories() 
  },[])

  const handleSave = ()=>{
    postCategory();
    modalClose();
  }
 const handleDelete = ()=>{
  deleteCategory()
  modalDelClose();
 }

  return (
    <>
    {
      loading ? <Spinner/> : (
     <Layout>
     <div className="card">
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} onClick={()=>modalShow({id:0})}></i>Sub Category</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Code</td>   
                  <td>Category</td>   
                  <td>Sub Category</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { subCategories &&
                subCategories.map((data,index) => {
                        return(<tr key={data.id}> 
                           <td>{data.code}</td>
                           <td>{data.category.name}</td>
                           <td>{data.name}</td>
                            <td>
                                <div className="">
                                    <Link onClick={()=>modalShow(data)} style={{width:100}}><i className="bx bx-edit-alt me-2" title="Edit"></i></Link>
                                    <Link onClick={()=>modelDeleteShow(data.id)} style={{width:100}}><i className="bx bx-trash me-2" title="Delete"></i></Link> 
                                </div>         
                            </td>
                        </tr>) 
                    })  
                }
            </tbody>
            </table>
        </div>
      </div>
      <Modal show={show} onHide={modalClose}> 
        <Modal.Header closeButton>
          <Modal.Title>
           Sub Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <SelectDropDown defautlValue={catId} hintText={'Select Category'} options={categories} value={catId} onChange={(e)=>setCatId(e.target.value)}/>
          <InputType className={'form-control'} inputType={'text'} labelFor={'code'} 
          onChange={(e)=>setCode(e.target.value)}
          labelText={'Sub Category Code'} name={code} placeholder={'Sub Category Code'} value={code}/>
           <InputType className={'form-control'} inputType={'text'} labelFor={'name'} 
          onChange={(e)=>setName(e.target.value)}
          labelText={'Sub Category Name'} name={name} placeholder={'Sub Category Name'} value={name}/>
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
          Sub Category
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
  ) 
}

export default SubCategory