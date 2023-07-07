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
import {useNavigate} from 'react-router-dom';
const Users = () => {

  const [show, setShow] = useState(false);  
  const [delShow, setDelShow] = useState(false);  
  const [roleId, setRoleId] = useState(null);
  const [name, setName] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [companyId, setCompanyId] = useState(0);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [itemId, setitemId] = useState(0);
  const [departmentId, setDepartmentId] = useState(0);
  const [designationId, setDesignationId] = useState(0);
  const [roles, setRoles] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);  
  const modalShow = (item) => { setShow(true); setItemToEdit(item) }
  const modalDelClose = () => setDelShow(false);  
  const modelDeleteShow = (id) =>{ setDelShow(true); setitemId(id)  } 
  const navigate = useNavigate();
  const getDepartments = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/general/departments', null)  
        if(data.status){  
          if( data.value.length<=0){
            toast.warning('Please add department first!');
            navigate('/department');
            return;
          }
            else{         
              setDepartments(data.value); 
              setDepartmentId(data.value[0].id);
            }
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
  const getDesignations = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/general/designations', null)  
        if(data.status){  
          if( data.value.length<=0){
            toast.warning('Please add designation first!');
            navigate('/designation');
            return;
          }
          else{         
              setDesignationId(data.value[0].id); 
            setDesignationList(data.value); 
            }         
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
  const getRoles = async ()=> {
    try{
        setLoading(true);     
        const {data} = await API.get('/general/roles', null)  
        if(data.status){  
            setRoleId(data.value[0].id);
            setRoles(data.value); 
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
            setUsers(data.value); 
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
      if(!name){
        toast.warning("Name required");
        return;
      }
      if(!email){
        toast.warning("Email required");
        return;
      }
      else if(!validateEmail(email)){
        toast.warning("Email is not valid");
        return;
      }
      else  if(!password){
        toast.warning("Password required");
        return;
      }else  if(!roleId){
        toast.warning("Role required");
        return;
      }
      else  if(!departmentId){
        toast.warning("Department required");
        return;
      }else  if(!designationId){
        toast.warning("Designation required");
        return;
      }
      setLoading(true);     
      var reqData ={active:true,name:name, email:email,roleId:roleId, password:password,departmentId:departmentId,designationId:designationId,shopId:shopId, companyId:companyId};
      const {data} = itemId>0 ?  await API.put('/user/'+itemId, reqData)  
       : await API.post('/user', reqData)  
      if(data.status){  
        getUsers();
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
    if(itemd.id>0){
        setitemId(itemd.id);
        setEmail(itemd.email); 
        setRoleId(itemd.userrole.id); 
        setPassword(itemd.password);
        setDepartmentId(itemd.department.id) 
        setDesignationId(itemd.designation.id);
        setShopId(localStorage.getItem('shopId'));
        setCompanyId(localStorage.getItem('companyId'));
    }else{
        setEmail(""); 
        setRoleId(roles[0].id); 
        setPassword("");
        setDepartmentId(departments[0].id)
        setDesignationId(designationList[0].id);
        setShopId(localStorage.getItem('shopId'));
        setCompanyId(localStorage.getItem('companyId'));
    } 
  }

  const deleteCategory = async () =>{
    try{
      setLoading(true);     
      const {data} = await API.delete('/user/'+itemId) 
      console.log(data);
      if(data.status){  
        toast.success(data.msg); 
        setitemId(0);
        getUsers();
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
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(()=>{ 
    getDepartments();
    getDesignations();
    getRoles();
    getUsers();
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
                <h5 className="card-header"><i className="bx bx-plus-circle me-2" style={{cursor:'pointer'}} onClick={()=>modalShow({id:0})}></i>User</h5>
                <div className="table-responsive text-nowrap">
                <table className="table">
            <thead>
                <tr>  
                  <td>Role</td>   
                  <td>Department</td>   
                  <td>Designation</td>   
                  <td>Email</td>   
                  <td>Active</td>   
                  <td>Actions</td>
                </tr> 
            </thead>
            <tbody className="table-border-bottom-0"> 
                { users ?
                users.map((data,index) => {
                        return(<tr key={data.email}> 
                           <td>{data.userrole.name}</td>
                           <td>{data.department.name}</td>
                           <td>{data.designation.name}</td> 
                           <td>{data.email}</td>
                           <td>{data.active === true ? <span className='badge bg-success'>Yes</span>:<span className='badge bg-success'>Yes</span>}</td>
                            <td>
                               { data.userrole.id>2 ? <div className="">
                                    <Link onClick={()=>modalShow(data)} style={{width:100}}><i className="bx bx-edit-alt me-2" title="Edit"></i></Link>
                                    <Link onClick={()=>modelDeleteShow(data.id)} style={{width:100}}><i className="bx bx-trash me-2" title="Delete"></i></Link> 
                                </div> : null        
                                }
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
           User 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
         <InputType className={'form-control'} inputType={'name'} labelFor={'name'} 
        onChange={(e)=>setName(e.target.value)}
        labelText={'Display Name'} name={name} placeholder={'Display Name'} value={name}/>
        <InputType className={'form-control'} inputType={'email'} labelFor={'email'} 
        onChange={(e)=>setEmail(e.target.value)}
        labelText={'Email'} name={email} placeholder={'Email'} value={email}/>
        <InputType className={'form-control'} inputType={'text'} labelFor={'name'} 
        onChange={(e)=>setPassword(e.target.value)}
        labelText={'Password'} name={password} placeholder={'Password'} value={password}/>  
          <SelectDropDown hintText={'User Role'} options={roles} defautlValue={roleId} value={roleId} onChange={(e)=>setRoleId(e.target.value)}/>
          <SelectDropDown hintText={'User Department'} options={departments} defautlValue={departmentId} value={departmentId} onChange={(e)=>setRoleId(e.target.value)}/>
         <SelectDropDown hintText={'User Designation'} options={designationList} defautlValue={designationId} value={designationId} onChange={(e)=>setRoleId(e.target.value)}/>
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
          User
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

export default Users