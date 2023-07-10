import React, {useState,  useEffect } from 'react' 
import Layout from '../components/shared/Layout/Layout'; 
import API from '../services/API'; 
import {  toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';  
import DataTable from 'react-data-table-component'; 
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button'
import InputType from '../components/shared/form/InputType'; 
const VanStock = () => { 

  const [show, setShow] = useState(false);  
  const [masterData, setMasterData] = useState([]); 
  const [request, setRequest] = useState(0);  
  const [loading, setLoading] = useState(false); 
  const modalClose = () => setShow(false);  
  const modalShow = (item) =>   setShow(true);
  const [qty, setQty] = useState([]); 
  const ExpandedComponent = ({ data }) =>{  
  let items = data.items.map((i)=> { return {name:i.productName, requestedQty:i.requestedQty ,qty:i.qty, id:i.id, vanStockRequestId:i.vanStockRequestId}});
  
  const cols =[{
    name:'Product Name',
    selector : row =>row.name.toUpperCase()
  },
  {
    name:'Requested Qty',
    selector : row => row.requestedQty
  },
  {
    name:'Allotted Qty',
    selector : row => row.qty 
  },
  {
    name: "Actions",
    button: true,
    cell: (row) => (
        row.allotted === 1 && <button
            className="btn btn-sm btn-info"
            onClick={(e) => handleButtonClick(e, row)}
        >
            ALLOT
        </button>
    ),
  }]; 
 
  const handleButtonClick = (e, row) => {
    setRequest(row);
    modalShow();        
  };

  
    return <DataTable columns={cols} data={items} /> ;
  };
 
   const columns = [ 
    {
      name: 'Request No.',
      selector: row => row.requestNo.toString().padStart(6,'0'),
    },
    {
        name: 'Van Name',
        selector: row => row.vanName.toUpperCase(),
    },
    {
      name: 'Sales Staff',
      selector: row => row.user.toUpperCase(),
    },
    {
      name: 'Allotted',
      cell: (row) =>  row.allotted ===1 ? <span className='badge bg-warning'>PENDING</span> : row.allotted === 2 ?  <span className='badge bg-primary'>PARTIAL</span> : <span className='badge bg-success'>ALLOTTED</span>
      
    },
    {
      name: "Actions",
      button: true,
      cell: (row) =>  row.allotted <3 ? <button className="btn btn-sm btn-primary" onClick={(e) => handleAccept(e,row)}> ACCEPT ALL</button> : ''
      
    }
  ]; 
 
  const handleAccept =async (e,row)=>{
    try{
      setLoading(true); 
      const {data} = await API.put(`/stock-request/accept-all/${row.id}`, null);
      if(data.status){
        toast.success(data.msg); 
        getVanStocks();
      }else{
        toast.error(data.msg); 
      }
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);   
    }
  }

  const getVanStocks = async ()=> {
    try{
        setLoading(true);     
        var compId =localStorage.getItem('companyId');
        var userId =localStorage.getItem('userId');
        const {data} = await API.get(`/stock-request/company/${compId}/${userId}`, null)  
        if(data.status){             
            var md = data.value.map((e)=> {
                return {vanName:e.van.name,user:e.useraccount.name,requestNo:e.requestNo,items:e.vanStockItems, allotted:e.allotted,id:e.id}
            }); 
            setMasterData(md); 
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

  const handleSave =async ()=>{
    try{
      setLoading(true);  
      if(qty<=0){
        toast.warning('Please provide qty to allot!');
        return;
      }
      var json ={id:request.vanStockRequestId,stockItems:[{ id:request.id,sold:false,allotted:true, qty:qty,vanStockRequestId: request.vanStockRequestId}]};
      const {data} = await API.put(`/stock-request`, json);
      if(data.status){
        toast.success(data.msg); 
        getVanStocks();
      }else{
        toast.error(data.msg); 
      }
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);   
    }
  }


  useEffect(()=>{ 
    getVanStocks();
  },[])
 
  return( 
    <>
    {
      loading ? <Spinner/> : (
     <Layout>
      {masterData && <DataTable
           title="Van Stock Requests"
           striped={true}
            pagination  
            columns={columns}
            data={masterData} 
            expandableRows
            expandableRowsComponent={ExpandedComponent}
        />    }
     </Layout>)}

     <Modal show={show} onHide={modalClose}> 
        <Modal.Header closeButton>
          <Modal.Title>
           ALLOT QTY
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
           <InputType className={'form-control'} inputType={'number'}  
                  labelFor={'qty'} onChange={(e)=>setQty(e.target.value)} labelText={'Allotted QTY'}  
                          placeholder={'Allotted QTY'} value={qty}/>
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

    </>
  );
} 

export default VanStock