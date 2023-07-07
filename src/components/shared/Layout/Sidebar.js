import React from 'react'

function Sidebar() {
  return <>  
  <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
  <div className="app-brand demo">
    <a href="index.html" className="app-brand-link"> 
      <img src="../assets/img/logo.png" alt="Logo" className="van-logo" /> 
    </a>
  </div>
  <div className="menu-inner-shadow" />
  <ul className="menu-inner py-1"> 
    <li className="menu-item active">
      <a href="index.html" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Dashboard</div>
      </a> 
      </li>
    <li className="menu-header small text-uppercase">
      <span className="menu-header-text">Masters</span>
    </li> <li className="menu-item">
      <a href="/company" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Company</div>
      </a>
    </li>  
   
    <li className="menu-item">
      <a href="/bill-type" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Bill Types</div>
      </a>
    </li>  
    <li className="menu-item">
      <a href="/complaint-type" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Complaint Types</div>
      </a>
    </li> 
    <li className="menu-item">
      <a href="/country" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Countries</div>
      </a>
    </li> 
    <li className="menu-item">
      <a href="/province" className="menu-link">
        <i className="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Provinces</div>
      </a>
    </li> 
  </ul>
</aside>
 </>
}

export default Sidebar