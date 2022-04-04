import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './Header';

function Layout() {
  return (
    <div>
      <Header/>
      <main>
        <Outlet />
      </main>
      {/* <footer></footer> */}
    </div>
  );
}

export default Layout