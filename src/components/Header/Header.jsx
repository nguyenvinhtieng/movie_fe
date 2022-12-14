import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="headerUser" data-header>
      <nav className="navbarUser" data-navbar>
        <ul className="navbar-list">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/movies" className="navbar-link">Movies</Link></li>
          <li><Link to="/chat" className="navbar-link">Chat</Link></li>
          <li><Link to="/buy-vip" className="navbar-link">Buy VIP</Link></li>
        </ul>
        <ul className="navbar-list">
          <li><span className="name">Hello VinhTieng</span></li>
          <li><Link to="/" className="navbar-link">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
}
