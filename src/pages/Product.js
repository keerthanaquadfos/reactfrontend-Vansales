import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType';
const Product = () => {
     
  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);  
  const [code, setCode] = useState(null);
  const [name, setName] = useState(null);
  const [tax, setTax] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [itemId, setitemId] = useState(0);
  const [catId, setCatId] = useState(0);
  const [subCatId, setSubCatId] = useState(0);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }
  const getProducts = async ()=> {
    try{
        setLoading(true);    
        const id  = localStorage.getItem('companyId');
        const {data} = await API.get(`/product/company/${id}`, null)  
        if(data.status){  
           setProducts(data.value);   
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
  const getCategories = async ()=> {
    try{
        setLoading(true);
        const id  = localStorage.getItem('companyId');
        const {data} = await API.get(`/category/company/${id}`, null)  
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
        const id  = localStorage.getItem('companyId');
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
      if(!code){
        toast.warning("Product code required");
        return;
      }else  if(!name){
        toast.warning("Category name required");
        return; 
      }else if(!price){
        toast.warning("Product price required");
        return; 
      }else if(!tax){
        setTax(0);
      }else if(catId===0 || catId==='undefined'){
        toast.warning("Category name required");
        return;
      }
      else if(subCatId===0 || subCatId==='undefined'){
        toast.warning("Sub Category name required");
        return;
      }
      setLoading(true);     
      
      var json ={id:itemId, code:code, name:name, categoryId:catId,subCategoryId:subCatId, 
        price:price,taxPercentage:tax,description:description??"", companyId:localStorage.getItem('companyId')}
      const {data} = itemId>0 ?  await API.put('/product/'+itemId, json)   : await API.post('/product', json)       
      if(data.status){           
         toast.success(data.msg);  
         getProducts() ;
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
     if(itemd.id<=0){
        setitemId(0)
        setCode(0); 
        setName("");  
        setCatId(categories[0].id);
        setSubCatId(subCategories[0].id);
        setPrice(0); 
        setDescription(""); 
        setTax(0);
     }else{
      setitemId(itemd.id)
      setCode(itemd.code); 
      setName(itemd.name); 
      setitemId(itemd.id); 
      setCatId(itemd.categoryId);
      setSubCatId(itemd.subCategoryId);
      setDescription(itemd.description);
      setPrice(itemd.price); 
      setTax(itemd.taxPercentage);
     } 
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/product/'+itemId)  
      if(data.status){  
        toast.success(data.msg); 
        getProducts() ;
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
    getProducts();
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
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} onClick={()=>modalShow({id:0})}></i>Products</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Code</td>   
                  <td>Category</td>   
                  <td>Sub Category</td>   
                  <td>Product Name</td>   
                  <td>Tax %</td>   
                  <td>Rate</td>   
                  <td>Deescription</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { products &&
                products.map((data,index) => {
                        return(<tr key={data.id}> 
                           <td>{data.code}</td>
                           <td>{data.category.name}</td>
                           <td>{data.subcategory.name}</td>
                           <td>{data.name}</td>
                           <td>{data.taxPercentage}</td>
                           <td>{data.price}</td> 
                           <td>{data.description}</td>
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
           Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
            <label htmlFor='category' className="form-label"> Category</label>
        <select value={catId} className='form-control mb-3' onChange={(e)=>setCatId(e.target.value)}>
        {categories ? categories.map((data,index) => (<><option value={data.id} selected={data.id === catId}>{data.name}</option></>)) : <><option value={0}>No data available</option></>}
        </select>
        </div>
        <div className="mb-3">
            <label htmlFor='subcategory' className="form-label"> Sub Category</label>
        <select value={subCatId} className='form-control mb-3' onChange={(e)=>setSubCatId(e.target.value)}>
        {subCategories ? subCategories.map((data,index) => (<><option value={data.id} selected={data.id === setCatId}>{data.name}</option></>)) : <><option value={0}>No data available</option></>}
        </select>
        </div>
          <InputType className={'form-control'} inputType={'text'} labelFor={'code'} 
          onChange={(e)=>setCode(e.target.value)}
          labelText={'Product Code'} name={code} placeholder={'Product Code'} value={code}/>

           <InputType className={'form-control'} inputType={'text'} labelFor={'name'} 
          onChange={(e)=>setName(e.target.value)}
          labelText={'Product Name'} name={name} placeholder={'Product Name'} value={name}/>

            <InputType className={'form-control'} inputType={'number'} labelFor={'tax'} 
          onChange={(e)=>setTax(e.target.value)}
          labelText={'Tax Percentage'} name={tax} placeholder={'Tax Percentage'} value={tax}/>

            <InputType className={'form-control'} inputType={'number'} labelFor={'price'} 
          onChange={(e)=>setPrice(e.target.value)}
          labelText={'Price'} name={price} placeholder={'Price'} value={price}/>

           <InputType className={'form-control'} inputType={'text'} labelFor={'desc'} 
          onChange={(e)=>setDescription(e.target.value)}
          labelText={'Description'} name={description} placeholder={'Description'} value={description}/>

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

export default Product