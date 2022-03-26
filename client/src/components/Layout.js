import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './Header';

function Layout() {
  return (
    <div className='max-h-screen overflow-auto'>
      <Header/>
      <main>
        <Outlet />
      </main>
      {/* <footer></footer> */}
    </div>
  );
}

export default Layout