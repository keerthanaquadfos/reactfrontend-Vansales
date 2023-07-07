
import React, {useEffect, useState}from 'react'
import InputType from '../components/shared/form/InputType'
import Button from '../components/shared/form/Button'; 
import { userLogin } from '../redux/features/auth/authActions';
import { useDispatch,useSelector  } from 'react-redux' 
import {useNavigate} from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
const Login = () => {
 
const dispatch = useDispatch()  
const navigate = useNavigate();

const [ email, setEmail] = useState("");
const [ password, setPassword] = useState("");
const [ rememberMe, setRememberMe] = useState(false);  

const  handleSubmit = ()=>{
  var data = {email:email,password:password};
  dispatch(userLogin(data));
}

const { user,loading } = useSelector(
  (state) => state.auth
) 

console.log(user);
useEffect(()=>{
  if (user) 
  {
    if(localStorage.getItem('roleId')==='1')
      navigate('/');
    else
      navigate('/admin');
  }
    
})
 
  return (
    <> 
    {loading ? <Spinner/> : (
      <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner"> 
          <div className="card">
            <div className="card-body"> 
              <div className="app-brand justify-content-center">
                <a href="/" className="app-brand-link gap-2"> 
                  <span className="app-brand-text demo text-body fw-bolder">
                    <img src="../assets/img/logo.png" alt="Logo"/>
                  </span>
                </a>
              </div> 
              <h4 className="mb-2">Welcome to Van Sales! 👋</h4>
              <p className="mb-4">Please sign-in to your account and start the adventure</p>
 
                 <InputType inputType={'email'} 
                    labelFor={'email'}
                    labelText={'Email Address'}
                   name={'email'} 
                   value={email}
                   placeholder={'you@domain.com'} 
                   onChange={(e)=>setEmail(e.target.value)}
                   className={'form-control'}/> 
                 <InputType inputType={'passsword'} labelFor={'passsword'}
                  value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                 labelText={'Password'} name={'password'} placeholder={'mysecretpassword'} className={'form-control'}/>
                  
                <div className="mb-3">
                  <div className="form-check">
                  <InputType inputType={'checkbox'}
                    value={rememberMe}
                    onChange={(e)=>setRememberMe(e.target.value)}
                  labelFor={'remember-me'} labelText={'Remember Me'} name={'rememberMe'} placeholder={'you@domain.com'} className={'form-check-input'}/>                      
                  </div>
                </div>
                <div className="mb-3">
                  <Button className={'btn btn-primary d-grid w-10'} buttonText={'Login'} handleClick={handleSubmit}/>
                </div> 
            </div>
          </div> 
        </div>
      </div>
    </div>  
    )}
    
    </>
  )
}

export default Login