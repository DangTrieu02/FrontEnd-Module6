// import React,{useEffect} from 'react'
// import {useNavigate} from "react-router-dom";
//
//
// export default function checkRole(){
//     const navigate = useNavigate();
//     useEffect(()=>{
//         const role = localStorage.getItem('role');
//         if (role === "user"){
//             navigate("/home")
//         }else if (role === "owner"){
//             navigate("/owner")
//         }
//     },[])
//     return null
// }