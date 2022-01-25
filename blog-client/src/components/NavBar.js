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
      <Link className="nav__link" to={navItem.link}>{navItem.text}</Link>
    </li>
  ));
  return (
    <nav className="nav">
      <ul className="nav__container">{navItems}</ul>
    </nav>
  );
}

export default NavBar;
