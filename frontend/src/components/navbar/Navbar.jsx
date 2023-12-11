import { useState } from "react";
import { SearchIcon } from "../../assets/SearchIcon";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const LOGO_URL =
  "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.4.1/mercadolibre/logo__large_plus.png";

export function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = async (event) => {
    event.preventDefault();
    if (!search) return;
    navigate({ pathname: "/items", search: `?search=${search}` });
  };

  return (
    <nav className="navbar-container">
      <Link to={"/"}>
        <img src={LOGO_URL} alt="Logo de Mercado Libre" className="navbar-logo" onClick={() => setSearch("")}/>
      </Link>

      <form className="search-form">
        <input type="text" placeholder="Nunca dejes de buscar" onChange={handleChange} value={search} />
        <button className="search-button" onClick={handleSearchClick}>
          <SearchIcon />
        </button>
      </form>
    </nav>
  );
}
