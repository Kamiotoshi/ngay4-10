import React from 'react';
import logo from '../assets/img/logo.png'; // Cập nhật đường dẫn đến logo



function Header() {
  return (
    <header className="header_area sticky-header">
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light main_box">
          <div className="container">
            <a className="navbar-brand logo_h" href="/">
              <img src={logo} alt="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
              <ul className="nav navbar-nav menu_nav ml-auto">
                <li className="nav-item active"><a className="nav-link" href="/">Home</a></li>
                <li className="nav-item submenu dropdown">
                  <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown">Shop</a>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><a className="nav-link" href="/category">Shop Category</a></li>
                    <li className="nav-item"><a className="nav-link" href="/single-product">Product Details</a></li>
                    <li className="nav-item"><a className="nav-link" href="/checkout">Product Checkout</a></li>
                    <li className="nav-item"><a className="nav-link" href="/cart">Shopping Cart</a></li>
                    <li className="nav-item"><a className="nav-link" href="/confirmation">Confirmation</a></li>
                  </ul>
                </li>
                <li className="nav-item submenu dropdown">
                  <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown">Blog</a>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><a className="nav-link" href="/blog">Blog</a></li>
                    <li className="nav-item"><a className="nav-link" href="/single-blog">Blog Details</a></li>
                  </ul>
                </li>
                <li className="nav-item submenu dropdown">
                  <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="/tracking">Tracking</a></li>
                    <li className="nav-item"><a className="nav-link" href="/elements">Elements</a></li>
                  </ul>
                </li>
                <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item"><a href="/" className="cart"><span className="ti-bag"></span></a></li>
                <li className="nav-item"><button className="search"><span className="lnr lnr-magnifier"></span></button></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
