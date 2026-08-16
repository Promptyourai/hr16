import React, { useState } from 'react';
import policies from '../data/policies.json';
import styles from '../styles/Page.module.css';

export default function Policies() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <h2>Policies</h2>
      <div className={styles.accordion}>
        {policies.map((p, i) => (
          <div key={i}>
            <button className={styles.accordionBtn} onClick={() => setOpenIdx(openIdx === i ? null : i)}>{p.title}</button>
            {openIdx === i && <div className={styles.accordionContent}>{p.body}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
