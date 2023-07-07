import React from 'react'
import {useNavigate} from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.clear(); 
    navigate('/admin');
  }
  return <>
    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
  <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
    <a className="nav-item nav-link px-0 me-xl-4" href="/">
      <i className="bx bx-menu bx-sm" />
    </a>
  </div>
  <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse"> 
    <div className="navbar-nav align-items-center">
      <div className="nav-item d-flex align-items-center">
        <i className="bx bx-search fs-4 lh-0" />
        <input type="text" className="form-control border-0 shadow-none" placeholder="Search..." aria-label="Search..." />
      </div>
    </div> 
    <ul className="navbar-nav flex-row align-items-center ms-auto"> 
    
      <li className="nav-item navbar-dropdown dropdown-user dropdown">
        <a className="nav-link dropdown-toggle hide-arrow" href="/;" data-bs-toggle="dropdown">
          <div className="avatar avatar-online">
            <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
          </div>
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="/">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar avatar-online">
                    <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <span className="fw-semibold d-block">{localStorage.getItem('email')}</span>
                  <small className="text-muted">{localStorage.getItem('userrole')}</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            <div className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="/#">
              <i className="bx bx-user me-2" />
              <span className="align-middle">My Profile</span>
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/#">
              <i className="bx bx-cog me-2" />
              <span className="align-middle">Settings</span>
            </a>
          </li>
          
          <li>
            <div className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="/#" onClick={()=>handleLogOut()}>
              <i className="bx bx-power-off me-2" />
              <span className="align-middle" >Log Out</span>
            </a>
          </li>
        </ul>
      </li> 
    </ul>
  </div>
</nav>
 </>
}

export default Navbar