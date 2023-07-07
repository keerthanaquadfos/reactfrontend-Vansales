import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner'; 
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType'; 
const VanStock = () => {

  const [show, setShow] = useState(false);   
  const [qty, setQty] = useState(0);  
  const [itemId, setitemId] = useState(0);
  const [vanStocks, setVanStocks] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { 
    setShow(true);
    setitemId(item.id);
    setQty(item.requestedQty);
   } 
  const getVanStocks = async ()=> {
    try{
        setLoading(true);     
        var compId =localStorage.getItem('companyId');
        const {data} = await API.get(`/van-stock/company/${compId}`, null) 
        console.log(data);
        if(data.status){             
            setVanStocks(data.value); 
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
      if(qty<=0){
        toast.warning("Alotted qty should not be less than or equal to zerro!");
        return;
      } 
      setLoading(true);     
      const {data} =  await API.patch('/van-stock/'+itemId, {qty:qty}); 
      if(data.status){  
        getVanStocks();
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

  /* const setItemToEdit = (itemd)=>{
      setCode(itemd.code); setName(itemd.name); setitemId(itemd.id);
  } */
 

  useEffect(()=>{ 
    getVanStocks();
  },[])

  const handleSave = ()=>{
    postCategory();
    modalClose();
  } 
  return( 
    <>
    {
      loading ? <Spinner/> : (
     <Layout>
     <div className="card">
                <h5 className="card-header" >Van Stocks</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Code</td>   
                  <td>Van Name</td>   
                  <td>Product</td>    
                  <td>User</td>   
                  <td>Requested</td>   
                  <td>Qty</td>   
                  <td>Allotted</td>   
                  <td>Actions</td> 
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { vanStocks ?
                vanStocks.map((data,index) => {
                        return(<tr key={data.id}> 
                           <td>{data.van.code}</td>
                           <td>{data.van.name}</td>
                           <td>{data.product.name}</td>
                           <td>{data.useraccount.name}</td>
                           <td>{data.requestedQty}</td>
                           <td>{data.qty}</td>
                           <td><span className={data.allotted===true ? 'badge badge bg-success':'badge badge bg-warning'}>{data.allotted === true ? "Yes" :"In Request"}</span></td>
                           {data.allotted ===false &&  <td>
                                <div className=""> 
                                    <Button  style={{width:100}} className={'btn btn-sm btn-primary'} handleClick={()=>modalShow(data)} buttonType={'button'} buttonText={'Allotte Qty'}/>
                                </div>     

                            </td>
                          } 
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
           Van Stock
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputType className={'form-control'} inputType={'number'} labelFor={'qty'} 
          onChange={(e)=>setQty(e.target.value)}
          labelText={'Allotted Qty'} name={qty} placeholder={'Allotted Qty'} value={qty}/>
           
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
     </Layout>)}
    </>
  );
} 

export default VanStock