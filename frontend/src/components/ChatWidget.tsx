import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chat.module.css';

type Msg = { role: string; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: "Hi, I'm your HR assistant. Ask me about leave, payroll, or policies." }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: newMessages })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not reach the assistant.' }]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div>
      <button className={styles.launcher} onClick={() => setOpen(true)}>Ask HR</button>

      {open && (
        <div className={styles.window}>
          <div className={styles.header}>
            <strong>HR Assistant</strong>
            <button className={styles.close} onClick={() => setOpen(false)}>×</button>
          </div>
          <div className={styles.messages} ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? styles.userMsg : styles.assistantMsg}>
                {m.content}
              </div>
            ))}
            {loading && <div className={styles.typing}>HR assistant is typing...</div>}
          </div>
          <div className={styles.inputRow}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder="Type your question..." />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
