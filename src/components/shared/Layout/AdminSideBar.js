import React from 'react' 
function AdminSidebar() {
  return <>  
  <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
  <div className="app-brand demo">
    <a href="/admin" className="app-brand-link"> 
      <img src="../assets/img/logo.png" alt="Logo" className="van-logo" /> 
    </a>
  </div>
  <div className="menu-inner-shadow" />
  <ul className="menu-inner py-1"> 
    <li className="menu-item active">
      <a href="/admin" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Dashboard</div>
      </a>
    </li> 
    <li className="menu-header small text-uppercase">
      <span className="menu-header-text">Masters</span>
    </li>  
    <li className="menu-item">
      <a href="/category" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Category</div>
      </a>
    </li> 
    <li className="menu-item">
      <a href="/sub-category" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Subcategory</div>
      </a>
    </li> 
    <li className="menu-item">
      <a href="/product" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Products</div>
      </a>
    </li>  
    <li className="menu-item">
      <a href="/shop-route" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Routes</div>
      </a>
    </li>  
    <li className="menu-item">
      <a href="/route-assign" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Route Assign</div>
      </a>
    </li>  
    <li className="menu-item">
      <a href="/shop" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Shops</div>
      </a>
    </li>  
    <li className="menu-item">
      <a href="/van" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Van</div>
      </a>
    </li> 

    <li className="menu-header small text-uppercase">
      <span className="menu-header-text">Sales</span>
    </li>
    <li className="menu-item">
      <a href="/orders" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Orders</div>
      </a>
    </li>
    <li className="menu-item">
      <a href="/invoice" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Sales</div>
      </a>
    </li> 
     
    <li className="menu-item">
      <a href="/van-stock" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Van Stock</div>
      </a>
    </li>  
    <li className="menu-header small text-uppercase">
      <span className="menu-header-text">HRMS</span>
    </li>

    <li className="menu-item">
      <a href="/attendance" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Attendance</div>
      </a>
    </li>   
    <li className="menu-item">
      <a href="/users" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Users</div>
      </a>
    </li>
    <li className="menu-item">
      <a href="/department" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Departments</div>
      </a>
    </li>
    <li className="menu-item">
      <a href="/designation" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Designations</div>
      </a>
    </li>
    <li className="menu-header small text-uppercase">
      <span className="menu-header-text">Support</span>
    </li>
    
    <li className="menu-item">
      <a href="/complaint" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Complaints</div>
      </a>
    </li>  
   
  </ul>
</aside>
 </>
}

export default AdminSidebar