import React from 'react';
import { CartApp } from '../components/CartApp';
import { DataTable } from '../components/DataTable';
import { WizardForm } from '../components/WizardForm';
import { NotificationApp } from '../components/NotificationApp';
import { CalendarApp } from '../components/CalendarApp';
import { MusicPlayer } from '../components/MusicPlayer';
import './Lab11Page.css';

export default function Lab11Page() {
  return (
    <div className="lab-page">
      <header className="lab-header">
        <h1 className="lab-title">useReducer</h1>
        <p className="lab-subtitle">Управління складним станом</p>
      </header>
      <main className="lab-main">
        <CartApp />
        <DataTable />
        <WizardForm />
        <NotificationApp />
        <CalendarApp />
        <MusicPlayer />
      </main>
    </div>
  );
}
