import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import AdminSideBar from './AdminSideBar'

const Layout = ({children}) => {
  return (
    <> 
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                {localStorage.getItem('roleId') === '2' ? <AdminSideBar/> :  <Sidebar/>}
                <div className="layout-page">
                    <Navbar/> 
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            {children}
                        </div>
                        <Footer/>
                    </div>
                </div>               
            </div> 
        </div>       
    </>
  )
}

export default Layout