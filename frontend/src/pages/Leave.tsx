import React, { useState } from 'react';
import leaves from '../data/leaves.json';
import styles from '../styles/Page.module.css';

export default function Leave() {
  const [requests, setRequests] = useState(leaves);
  const [form, setForm] = useState({ type: 'Vacation', from: '', to: '', reason: '' });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setRequests(prev => [{ id: String(prev.length + 1), ...form, status: 'Pending' }, ...prev]);
    setForm({ type: 'Vacation', from: '', to: '', reason: '' });
  }

  return (
    <div className={styles.page}>
      <h2>Leave Requests</h2>
      <form className={styles.form} onSubmit={submit}>
        <label>Type
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option>Vacation</option>
            <option>Sick</option>
            <option>Other</option>
          </select>
        </label>
        <label>From <input type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} /></label>
        <label>To <input type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} /></label>
        <label>Reason <input value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} /></label>
        <button type="submit">Request Leave</button>
      </form>

      <table className={styles.table}>
        <thead><tr><th>ID</th><th>Type</th><th>From</th><th>To</th><th>Status</th></tr></thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id}><td>{r.id}</td><td>{r.type}</td><td>{r.from}</td><td>{r.to}</td><td>{r.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
