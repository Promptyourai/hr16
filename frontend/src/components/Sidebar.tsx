import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.brand}>PeopleHub — HR Portal</h2>
      <nav>
        <ul>
          <li><NavLink to="/">Dashboard</NavLink></li>
          <li><NavLink to="/leave">Leave</NavLink></li>
          <li><NavLink to="/employees">Employees</NavLink></li>
          <li><NavLink to="/policies">Policies</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}
