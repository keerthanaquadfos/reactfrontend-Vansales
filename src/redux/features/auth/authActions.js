import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../../services/API'
import {  toast } from 'react-toastify';
export const userLogin = createAsyncThunk(
    'user/login',
    async (request,{rejectWithValue})=>{
        try{
            
            const {data} = await API.post('/user/authenticate', request)
            debugger;
            if(data.status){
                localStorage.setItem('userId',data.value.user.id);
                localStorage.setItem('token',data.value.token);
                localStorage.setItem('companyId',data.value.user.companyId);
                localStorage.setItem('roleId',data.value.user.roleId);
                localStorage.setItem('shopId',data.value.user.shopId);
                localStorage.setItem('email',data.value.user.email);
                localStorage.setItem('userrole',data.value.user.userrole.name);
                toast.success(data.msg);
            } else{
                toast.error(data.msg);
                return rejectWithValue(data.msg)
            }
            return data;
        }catch(error){
            console.log(error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)
