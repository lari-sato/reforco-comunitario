import logo from "../assets/logo/logo.png";
import { NavLink, Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export function Header() {
  return (
    <header className="header">
      {/* Logo à esquerda */}
      <Link to="/topics" className="header__logoLink">
        <img src={logo} alt="Reforço Comunitário" className="header__logo" />
      </Link>

      {/* Busca */}
      <div className="header__searchGroup">
        <SearchBar />
      </div>

      {/* Ícones à direita */}
      <nav className="header__nav">
        <NavLink to="/inbox" className="nav__icon">
          <img src="/icons/inbox.svg" alt="Inbox" className="header__icon" />
        </NavLink>
        <NavLink to="/profile" className="nav__icon">
          <img src="/icons/profile.svg" alt="Profile" className="header__icon" />
        </NavLink>
      </nav>
    </header>
  );
}
