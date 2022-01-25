import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const nav = [
    { id: 0, text: "Home", link: "/" },
    { id: 1, text: "Reviews", link: "/" },
    { id: 2, text: "About", link: "/" },
    { id: 3, text: "Contact", link: "/" },
  ];
  const navItems = nav.map((navItem) => (
    <li className="nav__item" key={navItem.id}>
      <a className="nav__link">
        <Link to={navItem.link}>{navItem.text}</Link>
      </a>
    </li>
  ));
  return (
    <nav className="nav">
      <ul className="nav__container">{navItems}</ul>
    </nav>
  );
}

export default NavBar;
