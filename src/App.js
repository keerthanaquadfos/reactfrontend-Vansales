import './App.css'; 
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import {  Routes, Route } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import Product from './pages/Product';
import ShopRoute from './pages/ShopRoute';
import Shop from './pages/Shop';
import Complaint from './pages/Complaint';
import Attendance from './pages/Attendance';
import ComplaintType from './pages/ComplaintType';
import Van from './pages/Van';
import VanStock from './pages/VanStock';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Department from './pages/Department';
import Designation from './pages/Designation';
import AdminRoute from './components/Routes/AdminRoute'; 
import BillType from './pages/BillType';
import Company from './pages/Company';
import Invoice from './pages/Invoice';
import Country from './pages/Country';
import Province from './pages/Province';
import RouteAssign from './pages/RouteAssign';
import PurchaseReturn from './pages/PurchaseReturn';
import Payments from './pages/Payments';
function App() {
 
  return (
    <> 
    <ToastContainer/>
        <Routes>  
          <Route path="/"  element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/admin"  element={<AdminRoute><Dashboard/></AdminRoute>} />
          <Route path="/company"  element={<ProtectedRoute><Company/></ProtectedRoute>} />
          <Route path="/category"  element={<AdminRoute><Category/></AdminRoute>} />
          <Route path="/sub-category"  element={<AdminRoute><SubCategory/></AdminRoute>} />
          <Route path="/product"  element={<AdminRoute><Product/></AdminRoute>} />
          <Route path="/shop-route"  element={<AdminRoute><ShopRoute/></AdminRoute>} />
          <Route path="/shop"  element={<AdminRoute><Shop/></AdminRoute>} />
          <Route path="/route-assign"  element={<AdminRoute><RouteAssign/></AdminRoute>} />
          <Route path="/country"  element={<ProtectedRoute><Country/></ProtectedRoute>} />
          <Route path="/province"  element={<ProtectedRoute><Province/></ProtectedRoute>} />
          <Route path="/complaint-type"  element={<ProtectedRoute><ComplaintType/></ProtectedRoute>} />
          <Route path="/complaint"  element={<AdminRoute><Complaint/></AdminRoute>} />
          <Route path="/attendance"  element={<AdminRoute><Attendance/></AdminRoute>} />
          <Route path="/van"  element={<AdminRoute><Van/></AdminRoute>} />
          <Route path="/van-stock"  element={<AdminRoute><VanStock/></AdminRoute>} /> 
          <Route path="/orders"  element={<AdminRoute><Orders/></AdminRoute>} />
          <Route path="/invoice"  element={<AdminRoute><Invoice/></AdminRoute>} />
          <Route path="/purchase-return"  element={<AdminRoute><PurchaseReturn/></AdminRoute>} />
          <Route path="/users"  element={<AdminRoute><Users/></AdminRoute>} />
          <Route path="/department"  element={<AdminRoute><Department/></AdminRoute>} />
          <Route path="/designation"  element={<AdminRoute><Designation/></AdminRoute>} />
          <Route path="/payments"  element={<AdminRoute><Payments/></AdminRoute>} />
          <Route path="/bill-type"  element={<ProtectedRoute><BillType/></ProtectedRoute>} />
          <Route path="/login" element={<Login/>}  /> 
        </Routes> 
    </>
  );
}

export default App;
 