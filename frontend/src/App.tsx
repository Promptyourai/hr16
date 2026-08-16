import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import Dashboard from './pages/Dashboard';
import Leave from './pages/Leave';
import Employees from './pages/Employees';
import Policies from './pages/Policies';
import styles from './styles/App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.content}>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/policies" element={<Policies />} />
            </Routes>
          </main>
        </div>
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}
