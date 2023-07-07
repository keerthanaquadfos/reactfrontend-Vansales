import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType';
const Shop = () => {

  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);  
  const [code, setCode] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [address, setAddress] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [companyId, setCompanyId] = useState(0);
  const [routeId, setRoute] = useState(0);
  const [bilTypeId, setBilTypeId] = useState(0);
  const [itemId, setitemId] = useState(0);
  const [shops, setShops] = useState([]);
  const [billTypes, setBilTypes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [trn, setTrn] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }
  
  const getShops = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/shop', null) 
        console.log(data);
        if(data.status){  
            setShops(data.value); 
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
  const getBillTypes = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/billtype', null) 
        console.log(data);
        if(data.status){  
            setBilTypes(data.value); 
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

  const getProvinces = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/general/province', null)  
        if(data.status){  
            setProvinces(data.value); 
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


  const getRoutes = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/route', null)  
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
        toast.warning("Category code required");
        return;
      }else  if(!name){
        toast.warning("Category name required");
        return;
      }
      setLoading(true);     
      const reqData = {code:code, name:name, contact:contact,email:email,address:address, companyId:companyId,trn:trn, provinceId:provinceId,billTypeId:bilTypeId, routeId:routeId};
      const {data} = itemId>0 ?  await API.put('/shop/'+itemId, reqData) : await API.post('/shop', reqData) 
      console.log(data);
      if(data.status){  
         getShops();
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
    var companyId = localStorage.getItem("companyId");
    if(itemd.id<=0){
        setCode("");
        setName(""); 
        setitemId(0);
        setAddress("")
        setTrn("")
        setContact("");
        setEmail("")
        setProvinceId(provinces[0].id)
        setBilTypeId(billTypes[0].id)
        setRoute(routes[0].id)
        setCompanyId(companyId);
    }else{
        setTrn(itemd.trn);
        setCode(itemd.code);
        setCompanyId(companyId);
        setName(itemd.name); 
        setitemId(itemd.id);
        setAddress(itemd.address)
        setContact(itemd.contact);
        setEmail(itemd.email);
        setProvinceId(itemd.provinceId);
        setRoute(itemd.routeId);
        setBilTypeId(itemd.billTypeId)
    }
      
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/shop/'+itemId) 
      console.log(data);
      if(data.status){  
        toast.success(data.msg); 
        setitemId(0);
        getShops();
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
    getProvinces(); 
    getBillTypes();
    getRoutes();
    getShops();
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
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} onClick={()=>modalShow({id:0})}></i>Shop</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>BillType</td>   
                  <td>Code</td> 
                  <td>TRN</td> 
                  <td>Company</td>     
                  <td>Name</td>   
                  <td>Email</td>   
                  <td>Contact</td>   
                  <td>Address</td>   
                  <td>Province</td>   
                  <td>Route</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { shops ?
                shops.map((data,index) => {
                  console.log(data.name);
                  console.log(data.route.name)
                        return(<tr key={data.id}> 
                           <td>{data.billtype.name}</td>
                           <td>{data.code}</td>
                           <td>{data.trn}</td>
                           <td>{data.company.name}</td>
                           <td>{data.name}</td>
                           <td>{data.email}</td>
                           <td>{data.contact}</td>
                           <td>{data.address}</td>
                           <td>{data.province.name}</td>
                           <td>{data.route.name}</td>
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
      <Modal show={show} onHide={modalClose} dialogClassName="modal-lg"> 
        <Modal.Header closeButton>
          <Modal.Title>
           Shop
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='row'>
          <div className="col-6">
            <InputType className={'form-control'} inputType={'text'} labelFor={'code'} 
              onChange={(e)=>setCode(e.target.value)}
              labelText={'Shop Code'} name={code} placeholder={'Shop Code'} value={code}/>
           </div>  
          <div className="col-6"> 
            <InputType className={'form-control'} inputType={'text'} labelFor={'name'} 
              onChange={(e)=>setName(e.target.value)}
              labelText={'Shop Name'} name={name} placeholder={'Shop Name'} value={name}/>
          </div>
        </div>

        <div className='row'>
          <div className="col-6">
          <InputType className={'form-control'} inputType={'text'} labelFor={'email'} 
          onChange={(e)=>setEmail(e.target.value)}
          labelText={'Email'}  placeholder={'Email'} value={email}/>
          </div>
          <div className="col-6">
            
        <InputType className={'form-control'} inputType={'text'} labelFor={'contact'} 
          onChange={(e)=>setContact(e.target.value)}
          labelText={'Contact'}   placeholder={'Contact'} value={contact}/> 

            </div> 
        </div>
      

        <InputType className={'form-control'} inputType={'text'} labelFor={'address'} 
          onChange={(e)=>setAddress(e.target.value)}
          labelText={'Address'}   placeholder={'Address'} value={address}/> 
          <div className='row'>
          <div className="col-6">
            <InputType className={'form-control'} inputType={'text'} labelFor={'trn'} 
              onChange={(e)=>setTrn(e.target.value)}
              labelText={'TRN'} name={trn} placeholder={'TRN'} value={trn}/>
           </div> 
           <div className="col-6 mb-3">
            <label htmlFor='billTypeId' className="form-label"> Bill Type</label>
        <select defaultValue={bilTypeId} value={bilTypeId} className='form-control mb-3' onChange={(e)=>setBilTypeId(e.target.value)}>
        {billTypes ? billTypes.map((data,index) => (<><option value={data.id}>{data.name}</option></>)) : <><option value={0}>No data available</option></>}
        </select>
        </div>
          </div>
        <div className='row'>
       
        <div className="col-6 mb-3">
                <label htmlFor='routeId' className="form-label"> Route</label>
            <select defaultValue={routeId} value={routeId} className='form-control mb-3' onChange={(e)=>setRoute(e.target.value)}>
            {routes ? routes.map((data,index) => (<><option value={data.id}>{data.name}</option></>)) : <><option value={0}>No data available</option></>}
            </select>
            </div> 
            <div className="col-6 mb-3">
            <label htmlFor='provinceId' className="form-label"> Province</label>
        <select defaultValue={provinceId} value={provinceId} className='form-control mb-3' onChange={(e)=>setProvinceId(e.target.value)}>
        {provinces ? provinces.map((data,index) => (<><option value={data.id}>{data.name}</option></>)) : <><option value={0}>No data available</option></>}
        </select>
        </div>

        </div> 

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
           Shop
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

export default Shop 