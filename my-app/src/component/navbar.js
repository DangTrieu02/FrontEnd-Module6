/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getUserList } from '../service/listUserService';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Navbar() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const userList = useSelector(({userList}) => {
      return userList.userList;
  })

  useEffect(() => {
      dispatch(getUserList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  

  // const handleProfile = () => {
  //   setModal(!modal)
  // }
  // eslint-disable-next-line no-unused-vars
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('user');
    // eslint-disable-next-line no-undef
    navigate('/');
  }


  return (
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
            {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a> */}
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
      <li class="nav-item dropdown">
        <p class="nav-link dropdown-toggle d-flex align-items-center"  id="navbarDropdownMenuLink"
          role="button" aria-expanded="false">
          <img src=" https://cdn.diemnhangroup.com/seoulcenter/2022/11/gai-xinh-1.jpg " class="rounded-circle"
            height="38" width="28" alt="Avatar"/>
        </p>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            {/* <button class="dropdown-item" onClick={handleProfile}>My profile</button>  */}
            <div>
              <Button onClick={handleOpen} class="dropdown-item">My profile</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <table border={1}>
                <thead>
                <tr>
                    <td>idUser</td>
                    <td>userName</td>
                    <td>fullName</td>
                    <td>phoneNumber</td>
                    
                </tr>
                </thead>
                <tbody>
                {
                    userList.map(item => (
                            <tr key={item.idUser}>
                                <td>{item.idUser}</td>
                                <td>{item.userName}</td>
                                <td>{item.fullName}</td>
                                <td>{item.phoneNumber}</td>                               
                            </tr>
                        )
                    )
                }
                </tbody>

            </table>
        </Box>
      </Modal>
            </div>
          </li>
          
          <li>
            
            <button class="dropdown-item" onClick={handleLogout}>Logout</button>
            
          </li>
        </ul>
      </li>
  </div>
  </nav>
  )
  }
