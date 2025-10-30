import logo from "../assets/logo/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export const Header = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (term: string) => {
    setQuery(term);
    console.log("Buscar:", term);
    // Aqui você pode integrar navegação, filtro, etc.
  };

  return (
    <header className="header">
      <div className="home__topbar">
        <div className="header__inner container">
          <div className="header__left">
            <Link to="/topics" className="header__logoLink">
              <img
                src={logo}
                alt="Reforço Comunitário"
                className="header__logo"
              />
            </Link>

            {/* Componente de busca */}
            <SearchBar value={query} onChange={handleSearch} />
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
};
