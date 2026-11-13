import React, { useReducer, useEffect } from 'react';
import { notificationReducer, initialNotifState, NOTIF_ACTIONS } from '../reducers/notificationReducer';

function Toast({ notif, dispatch }) {
  useEffect(() => {
    const timer = setTimeout(() => dispatch({ type: NOTIF_ACTIONS.REMOVE, payload: notif.id }), notif.duration || 3000);
    return () => clearTimeout(timer);
  }, [notif, dispatch]);

  const colors = { success: 'var(--color-success)', error: 'var(--color-danger)', warning: 'var(--color-warning)', info: 'var(--color-white)' };

  return (
    <div className="toast" style={{ borderColor: colors[notif.type], color: colors[notif.type] }}>
      <span>{notif.message}</span>
      <button onClick={() => dispatch({ type: NOTIF_ACTIONS.REMOVE, payload: notif.id })}>×</button>
    </div>
  );
}

export function NotificationApp() {
  const [state, dispatch] = useReducer(notificationReducer, initialNotifState);

  const addNotif = (type) => {
    dispatch({ type: NOTIF_ACTIONS.ADD, payload: { type, message: `Це ${type} повідомлення!`, duration: 4000 } });
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">04 / Система нотифікацій (Авто-видалення)</h2>
      <div className="lab-controls">
        <button className="btn" onClick={() => addNotif('success')}>Success</button>
        <button className="btn btn--danger" onClick={() => addNotif('error')}>Error</button>
        <button className="btn" onClick={() => addNotif('warning')}>Warning</button>
        <button className="btn" onClick={() => addNotif('info')}>Info</button>
      </div>
      <p className="demo-text">Максимум 5 повідомлень. Зникають через 4 секунди.</p>
      
      <div className="toast-container">
        {state.notifications.map(n => <Toast key={n.id} notif={n} dispatch={dispatch} />)}
      </div>
    </div>
  );
}
