import React from 'react'
import Navbar from '../component/navbar'
import {Outlet} from 'react-router-dom'
import Intro from './intro'
import Search from './search'


export default function HomePage() {
    return (
        <>
            <Navbar/>
            <Search/>
            <Intro/>
            <Outlet/>
        </>
    )
}
