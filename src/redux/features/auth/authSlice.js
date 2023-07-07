import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from './authActions';
/* const token = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null */
const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        user:null,
        token:null,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(userLogin.fulfilled,(state, payload)=>{
            state.loading = false;
            state.error = null
            state.user = payload.payload.value
            state.token = payload.payload.value.token
        })
        builder.addCase(userLogin.rejected,(state, payload)=>{
            state.loading = false;
            state.error = payload.payload
        })
    }
})

export default authSlice;