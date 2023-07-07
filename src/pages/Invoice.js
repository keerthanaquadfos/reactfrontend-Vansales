import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button' 
const Invoice = () => {
  const [show, setShow] = useState(false);    
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [selectedOrder, setSelectedOrder] = useState(false);  
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { 
    setSelectedOrder(item);
    setShow(true); 
  }

  const getOrders = async ()=> {
    try{
        setLoading(true);     
        const compId = localStorage.getItem("companyId");
        const {data} = await API.get(`/order/order-list/${compId}/5`, null)  
        if(data.status){  
            setOrders(data.value); 
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
    getOrders();
  },[])
 

  return( 
    <>
    {
      loading ? <Spinner/> : (
     <Layout>
     <div className="card">
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}}></i>Orders</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Order No</td>   
                  <td>Order Date</td>    
                  <td>Shop</td>    
                  <td>Tax</td>  
                  <td>Amount</td>   
                  <td>Status</td>  
                  <td>Actions</td>   
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { orders ?
                orders.map((data,index) => {
                        return(<tr key={data.id}> 
                           <td><Link  to={{ pathname: `/invoice/${data.id}` }}>{data.orderNo}</Link> </td>
                           <td>{new Date(data.orderDate).toLocaleDateString()}</td>
                           <td>{data.shop.name}</td>
                           <td>{data.tax}</td>
                           <td>{data.amount}</td>
                           <td title='Status will be requested, released , confirmed and deliverd'>
                               <span className='badge badge bg-success'> {data.status === 1 
                                    ? 'PROCESSING' : data.status ===2 
                                    ? 'RELEASED' : data.status ===3 
                                    ? 'CONFIRMED' : 'DELIVERD'}</span>
                            </td>
                           <td>
                                <div className="">
                                    <Link onClick={()=>modalShow(data)} style={{width:100}}><i className="bx bx-book-open me-2" title="Edit"></i></Link> 
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
           { selectedOrder == null ? 'Order' : 'ORDER :#'+selectedOrder.orderNo} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {
             selectedOrder ? selectedOrder.orderDetails.map(o=> {return (
                <>
                    
                    <div key={o.productId.toString()+o.id} className='flex flex-column'> 
                        <div key={o.id-o.productId} className='flex justify-content-between align-items-center'>
                            <span className='badge bg-primary w-100'>
                                {o.product.name} 
                                <span className='badge bg-dark' style={{marginLeft:10}}>Orderd : {o.orderdQty} | Deliverable : {o.deliverableQty}</span>
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

export default Invoice