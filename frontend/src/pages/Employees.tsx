import React, { useState } from 'react';
import employees from '../data/employees.json';
import styles from '../styles/Page.module.css';

export default function Employees() {
  const [query, setQuery] = useState('');
  const filtered = employees.filter(e => (e.name + e.role + e.department + e.email).toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={styles.page}>
      <h2>Employees</h2>
      <input placeholder="Search by name, role, department, email" value={query} onChange={e => setQuery(e.target.value)} className={styles.search} />

      <table className={styles.table}>
        <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Email</th></tr></thead>
        <tbody>
          {filtered.map(emp => (
            <tr key={emp.email}><td>{emp.name}</td><td>{emp.role}</td><td>{emp.department}</td><td>{emp.email}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
