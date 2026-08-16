import React from 'react';
import announcements from '../data/announcements.json';
import styles from '../styles/Page.module.css';

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h2>Welcome back</h2>
        <p>Here are your HR overview and latest announcements.</p>
      </section>

      <section className={styles.tiles}>
        <div className={styles.tile}>
          <h3>Leave Balance</h3>
          <p>12 days</p>
        </div>
        <div className={styles.tile}>
          <h3>Pending Requests</h3>
          <p>2</p>
        </div>
        <div className={styles.tile}>
          <h3>Next Payday</h3>
          <p>2026-09-30</p>
        </div>
      </section>

      <section className={styles.announcements}>
        <h3>Recent Announcements</h3>
        <ul>
          {announcements.slice(0,5).map((a, i) => (
            <li key={i}><strong>{a.title}</strong> — {a.body}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
