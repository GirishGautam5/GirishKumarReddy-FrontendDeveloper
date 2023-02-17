import React from "react";
import { Link } from "react-router-dom";
import { SiSpacex } from "react-icons/si";
import "./HeaderStyles.css";

export default function Header() {
  return (
    <>
      <header className="header top-0 left-0 p-5 flex items-center justify-between w-full lg:py-0">
        <Link to="/">
          <SiSpacex className="text-8xl text-white" />
        </Link>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/" className="text-white text-sm lg:text-base">
                Capsules
              </Link>
            </li>
            <li>
              <Link to="/rockets" className="text-white text-sm lg:text-base">
                Rockets
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
