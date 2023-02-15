import React from "react";
import { Link } from "react-router-dom";
import { SiSpacex } from "react-icons/si";
import "./HeaderStyles.css";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/">
          <SiSpacex className="text-8xl text-white" />
          {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYwFlI5-jL_3zz96EqPweVttCQyseVVD0dcw&usqp=CAU' alt='spacex' /> */}
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/capsules" className="text-white text-sm lg:text-base">
                Capsules
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
