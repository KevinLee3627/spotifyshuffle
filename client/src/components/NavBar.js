import React from 'react';
import '../App.sass';

function NavBar(props) {
  return (
    <nav className={'navbar is-primary is-fixed-top'} role='navigation' aria-label='main navigation'>
      <div className={'navbar-brand'}>
        <a role='button' className={'navbar-burger'} aria-label='menu' aria-expanded='false'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>
      <div className={'navbar-menu'}>
        <div className={'navbar-start'}>
          <a className={'navbar-item'}>Home</a>
          <a className={'navbar-item'}>About</a>
          <a className={'navbar-item'}>Items</a>
        </div>
        <div className={'navbar-end'}>
          <a className={'navbar-item'}>Log out</a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
