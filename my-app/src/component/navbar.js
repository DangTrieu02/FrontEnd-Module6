/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Modal from './Modal';



export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  return (

    <div>
        <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
    <div className="container">
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <a className="navbar-brand text-brand" href="index.html">Estate<span className="color-b">Agency</span></a>

      <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
        <ul className="navbar-nav">

          <li className="nav-item">
            <a className="nav-link active" href="index.html">Home</a>
          </li>

          <li className="nav-item">
            <a className="nav-link " href="about.html">About</a>
          </li>

          <li className="nav-item">
            <a className="nav-link " href="property-grid.html">Property</a>
          </li>

          <li className="nav-item">
            <a className="nav-link " href="blog-grid.html">Blog</a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
            <div className="dropdown-menu">
              <a className="dropdown-item " href="property-single.html">Property Single</a>
              <a className="dropdown-item " href="blog-single.html">Blog Single</a>
              <a className="dropdown-item " href="agents-grid.html">Agents Grid</a>
              <a className="dropdown-item " href="agent-single.html">Agent Single</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="contact.html">Contact</a>
          </li>
          
        </ul>
      </div>

      <button type="button" className="btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
        <i className="bi bi-search"></i>
      </button>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
          role="button" data-mdb-toggle="dropdown" aria-expanded="false">
          <div><img src=" https://cdn.diemnhangroup.com/seoulcenter/2022/11/gai-xinh-1.jpg " class="rounded-circle"
            height="40" width="38" alt="Avatar"/></div>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            {/* <a class="dropdown-item" href="#">My profile</a> */}
            <div>
      <a  class="dropdown-item" href="#"
      onClick={() => setOpenModal(true)} 
      className='modalButton'>
        My profile
      </a>
      <Modal 
      open={openModal} 
      onClose={() => setOpenModal(false)} />
      </div>
          </li>
          <li>
            <a class="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Logout</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>  
  </nav>
    </div>
  )
}
