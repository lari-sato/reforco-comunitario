import logo from '../assets/logo/logo.png';
import { NavLink, Link } from "react-router-dom";
import { useState } from 'react';

export const Header = () => {
  const [query, setQuery] = useState('');

  return (
    <header className="header">
      <div className="home__topbar">
        <div className="header__inner container">
          <div className="header__left">
            <Link to="/topics" className="header__logoLink">
              <img src={logo} alt="Reforço Comunitário" className="header__logo" />
            </Link>

            {/* Barra de Busca */}
            <div className="nav__search">
              <input
                type="search"
                placeholder="Pesquise aqui..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <nav className="header__nav">
            <NavLink to="/inbox" className="nav__link">Inbox</NavLink>
            <NavLink to="/profile" className="nav__link">Profile</NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
