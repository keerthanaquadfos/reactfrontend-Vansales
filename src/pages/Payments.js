import React, {useState, useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import {Link} from 'react-router-dom'; 
const Payments = () => {   
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(false);  
  const getPayments = async ()=> {
    try{
        setLoading(true);     
        const compId = 20;// localStorage.getItem("companyId");
        const {data} = await API.get(`/payment/company/${compId}`, null)  
        if(data.status){  
            setPayments(data.value); 
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
    getPayments();
  },[])
 

  return( 
    <>
    {
      loading ? <Spinner/> : (
     <Layout>
     <div className="card">
                <h5 className="card-header">Payments</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Voucher No</td>   
                  <td>Voucher Date</td>    
                  <td>Shop</td>    
                  <td>Payed</td>  
                  <td>Balance</td>   
                  <td>Total</td>     
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { payments ?
                payments.map((data,index) => {
                        return(<tr key={data.id}>                            
                           <td>#{data.voucherNo.toString().padStart(6,'0')}</td>
                           <td>{new Date(data.voucherDate).toLocaleDateString()}</td>
                           <td>{data.order.shop.name}</td>
                           <td>{data.payed}</td>
                           <td>{data.balance}</td>
                           <td>{(parseFloat(data.payed)+parseFloat(data.balance)).toFixed(2)}</td>

                        </tr>) 
                    })  : null
                }
            </tbody>
            </table>
        </div>
      </div> 
     </Layout>)}
    </>
  );
} 

export default Payments