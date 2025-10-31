import logo from "../assets/logo/logo.png";
import { NavLink, Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export function Header() {
  return (
    <header className="header">
      <div className="home__topbar">
        <div className="header__inner container">
          <div className="header__left">
            <Link to="/" className="header__logoLink">
              <img
                src={logo}
                alt="Reforço Comunitário"
                className="header__logo"
              />
            </Link>

            <SearchBar />
          </div>

          <nav className="header__nav">
            <NavLink to="/inbox" className="nav__link">
              Inbox
            </NavLink>
            <NavLink to="/profile" className="nav__link">
              Profile
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
