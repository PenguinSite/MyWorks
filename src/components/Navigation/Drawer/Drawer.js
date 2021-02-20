import React, { Component } from "react";
import "./Drawer.css";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Список", exact: true },
  { to: "/auth", label: "Авторизация", exact: false },
  { to: "/quiz-creator", label: "Создать тест", exact: false },
];

const Drawer = (props) => {
  function clickHandler() {
    props.onClose();
  }

  function renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={"page-active"}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  const cls = ["Drawer"];
  if (!props.isOpen) {
    cls.push("close");
  }
  return (
    <React.Fragment>
      <nav className={cls.join(" ")}>
        <ul>{renderLinks()}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </React.Fragment>
  );
};

export default Drawer;
