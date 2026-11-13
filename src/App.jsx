import React from 'react';
import Lab11Page from './pages/Lab11Page';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark">✱</span>
          CRAFTMARKET
          <span className="app__brand-tag">LAB 11</span>
        </div>
      </header>
      <main className="app__main">
        <Lab11Page />
      </main>
      <footer className="app__footer">
        <p>© 2026 CRAFTMARKET · Лабораторна робота 11 · useReducer</p>
      </footer>
    </div>
  );
}

export default App;
