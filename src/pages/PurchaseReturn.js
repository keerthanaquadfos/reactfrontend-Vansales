import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner'; 
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button' 
const PurchaseReturn = () => {

  const [show, setShow] = useState(false);    
  const [selectedReturn, setSelectedReturn] = useState(null); 
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) } 

  const getReturns = async ()=> {
    try{
        setLoading(true);   
        const id =localStorage.getItem('companyId')  ;
        const {data} = await API.get(`/purchase-return/company/${id}`, null) 
        console.log(data);
        if(data.status){  
            setReturns(data.value); 
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

  const acceptReturn = async (id) =>{
    try{
      setLoading(true);   
      const id =localStorage.getItem('companyId');
      const uid =localStorage.getItem('userId');
      const {data} = await API.patch(`/purchase-return/company/${id}`,   {status: id === 1 ? 2 : 3,orderdBy:uid }) ; 
      if(data.status){  
          setReturns(data.value); 
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
    setSelectedReturn(itemd); 
  }
 
  
  useEffect(()=>{ 
    getReturns();
  },[])
 

  return( 
    <>
    {
      loading ? <Spinner/> : (
     <Layout>
     <div className="card">
                <h5 className="card-header">Purchase Returns</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>    
                  <td>Return No</td>   
                  <td>Date</td>   
                  <td>Shop</td>   
                  <td>Amount</td>   
                  <td>Status</td>
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { returns &&
                returns.map((data,index) => {
                  if(data.id>1){
                        return(<tr key={data.id}>  
                           <td>#{data.id.toString().padStart(6,'0')}</td>
                           <td>{data.returnDate}</td>
                           <td>{data.shop.name}</td>
                           <td>{data.amount}</td>
                           <td><span className={data.status===1 ? 'badge badge bg-warning': data.status===2 ? 'badge badge bg-success': 'badge badge bg-danger'}>
                           {data.status ===1 ? 'PENDING' : data.status === 2 ? 'ACCEPTED' : 'REJECTED'}
                            </span></td>
                            <td>
                                <div className="">
                                    <Button buttonText={'Show Items'} className={'btn btn-sm btn-primary'} buttonType={'button'} handleClick={()=>modalShow(data)} />
                                   &nbsp; <Button buttonText={'Accept Return'} className={'btn btn-sm btn-success'} buttonType={'button'} handleClick={()=>acceptReturn(1)} />
                                   &nbsp; <Button buttonText={'Reject Return'} className={'btn btn-sm btn-danger'} buttonType={'button'} handleClick={()=>acceptReturn(2)} />
                                </div>         
                            </td>
                        </tr>);
                    }else{
                      return null;
                    }
                  })                  
                }
            </tbody>
            </table>
        </div>
      </div>
      <Modal show={show} onHide={modalClose}> 
        <Modal.Header closeButton>
          <Modal.Title>
           { selectedReturn == null ? 'Return No' : 'RETURN NO :#'+selectedReturn.id.toString().padStart(6,'0')} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {
             selectedReturn ? selectedReturn.returnItems.map(o=> {return (
                <>
                    
                    <div key={o.productId.toString()+o.id} className='flex flex-column'> 
                        <div key={o.id-o.productId} className='flex justify-content-between align-items-center'>
                            <span className='badge bg-primary w-100'>
                                {o.product.name} 
                                <span className='badge bg-dark' style={{marginLeft:10}}>Orderd : {o.qty} | Amount : {o.price}</span>
                            </span>                            
                        </div>
                    </div>
                </>
             )}):null
           }
        </Modal.Body>
        <Modal.Footer> 
          <Button className="btn btn-sm btn-dark"  buttonText={'Close'} handleClick={()=>modalClose()}>
           Close
          </Button>
        </Modal.Footer> 
      </Modal> 
     </Layout>)}
    </>
  );
} 

export default PurchaseReturn