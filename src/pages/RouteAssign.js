import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import SelectDropDown from '../components/shared/form/SelectDropDown';
const RouteAssign = () => {

  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);   
  const [itemId, setitemId] = useState(0);
  const [shopId, setShopId] = useState(0);
  const [vanId, setVanId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [routeId, setRouteId] = useState(0);
  const [compantyId, setCompanyId] = useState(0);
  const [users, setUSer] = useState([]);
  const [assigns, setAssings] = useState([]);
  const [shops, setShops] = useState([]);
  const [van, setVan] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  }

  const getAssigns = async ()=> {
    try{
        setLoading(true);     
        var id =localStorage.getItem("companyId");
        const {data} = await API.get(`/route-info/company/${id}`, null)  
        if(data.status){  
            setAssings(data.value); 
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

  const getUsers = async ()=> {
    try{
        setLoading(true);     
        var id =localStorage.getItem("companyId");
        const {data} = await API.get(`/user/company/${id}`, null)  
        if(data.status){  
            setUSer(data.value); 
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

  const getVans = async ()=> {
    try{
        setLoading(true);     
        var id =localStorage.getItem("companyId");
        const {data} = await API.get(`/van/company/${id}`, null)  
        if(data.status){  
            setVan(data.value); 
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

  const getShops = async ()=> {
    try{
        setLoading(true);     
        var id =localStorage.getItem("companyId");
        const {data} = await API.get(`/shop/company/${id}`, null)  
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


  const setItemToEdit = (itemd)=>{
    if(itemd.id>0){
     setVanId(itemd.vanId); 
     setitemId(itemd.id); 
     setShopId(itemd.shopId);
     setUserId(localStorage.getItem('userId'));
     setCompanyId(localStorage.getItem('companyId'));
     var rid = shops.find(x=>x.id===itemd.shopId).routeId;
     setRouteId(rid);
    }else{
      setVanId(van[0].id);  
      setShopId(shops[0].id);
      setUserId(localStorage.getItem('userId'));
      setCompanyId(localStorage.getItem('companyId'));
      var rteId = shops[0].routeId;
      setRouteId(rteId);
    }
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/department/'+itemId)  
      if(data.status){  
        toast.success(data.msg); 
        setitemId(0);
        getAssigns();
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
      if(vanId<0){
        toast.warning("Select Van");
        return;
      }else if(shopId<0){
        toast.warning("Select Shop");
        return;
      }else if(userId<0){
        toast.warning("Select User");
        return;
      }
      setLoading(true);      
      var req ={vanId:vanId, shopId:shopId,companyId:compantyId, routeId: routeId, userId: userId};
      const {data} = itemId>0 ?  await API.put('/route-info/'+itemId, req)   : await API.post('/route-info', req) 
      console.log(data);
      if(data.status){  
        getAssigns();
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

  useEffect(()=>{ 
    getAssigns();
    getUsers();
   getVans();
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
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} onClick={()=>modalShow({id:0})}></i>Route Assigns</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>    
                  <td>Shop</td>   
                  <td>Route</td>
                  <td>van</td>   
                  <td>User</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { assigns ?
                assigns.map((data,index) => {
                        return(<tr key={data.id}>  
                           <td>{data.shop.name}</td>
                           <td>{data.shop.route.name}</td>
                           <td>{data.van.name}</td>
                           <td>{data.useraccount.name}</td>
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
           Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
           <SelectDropDown  defautlValue={shopId} options={shops} value={shopId} onChange={(e)=>setShopId(e.target.value)} hintText={'Select Shop'}/>
           <SelectDropDown  defautlValue={vanId} options={van} value={vanId} onChange={(e)=>setVanId(e.target.value)} hintText={'Select Van'}/> 
           <SelectDropDown  defautlValue={userId} options={users} value={userId} onChange={(e)=>setUserId(e.target.value)} hintText={'Select User'}/> 
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
          Department
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

export default RouteAssign