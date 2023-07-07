import React from 'react'

function Footer() {
  return <>
        <div>
  <footer className="content-footer footer bg-footer-theme">
    <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
      <div className="mb-2 mb-md-0">
        ©, VAN SALES LLC
        <a href="/#" target="_blank" className="footer-link fw-bolder">VAN SALES LLC</a>
      </div>
      <div>
      {/*   <a href="/" className="footer-link me-4" target="_blank">License</a>
        <a href="/" target="_blank" className="footer-link me-4">More Themes</a> 
        <a href="/" target="_blank" className="footer-link me-4">Documentation</a> 
        <a href="/" target="_blank" className="footer-link me-4">Support</a> */}
      </div>
    </div>
  </footer>
  <div className="content-backdrop fade" />
</div>

    </>
}

export default Footer