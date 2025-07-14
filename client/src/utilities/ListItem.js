import { NavLink } from "react-router-dom";

import "../style/sidebar.css";

function ListItem({ children, icon, collapsed, url }) {

  return (
    <li>
      <NavLink className={`${collapsed ? "collapsed-a" : ""}`} to={url}>
        {icon}
        <span className={`${collapsed ? "collapsed-span" : ""}`}>{children}</span>
      </NavLink>
    </li>
  );
}

export default ListItem;
