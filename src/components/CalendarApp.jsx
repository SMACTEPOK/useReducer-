import React, { useReducer, useState } from 'react';
import { calendarReducer, initialCalendarState, CALENDAR_ACTIONS } from '../reducers/calendarReducer';

export function CalendarApp() {
  const [state, dispatch] = useReducer(calendarReducer, initialCalendarState);
  const [form, setForm] = useState({ title: '', date: '', time: '' });

  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) return;
    dispatch({ type: CALENDAR_ACTIONS.ADD_EVENT, payload: form });
    setForm({ title: '', date: '', time: '' });
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">05 / Календар подій</h2>
      
      <div className="lab-controls">
        <button className="btn" onClick={() => dispatch({ type: CALENDAR_ACTIONS.PREV_MONTH })}>←</button>
        <h3 style={{ margin: 0, minWidth: '150px', textAlign: 'center', color: 'var(--color-white)' }}>{monthNames[month]} {year}</h3>
        <button className="btn" onClick={() => dispatch({ type: CALENDAR_ACTIONS.NEXT_MONTH })}>→</button>
      </div>

      <div className="calendar-grid">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map(d => <div key={d} className="cal-header">{d}</div>)}
        {Array.from({ length: firstDayIndex === 0 ? 6 : firstDayIndex - 1 }).map((_, i) => <div key={`empty-${i}`} className="cal-cell empty"></div>)}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEvents = state.events.filter(e => e.date === dateStr);
          
          return (
            <div key={day} className="cal-cell">
              <span className="cal-date">{day}</span>
              {dayEvents.map(e => (
                <div key={e.id} className="cal-event" onClick={() => dispatch({ type: CALENDAR_ACTIONS.DELETE_EVENT, payload: e.id })} title="Клік для видалення">
                  {e.time} {e.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleAdd} className="lab-controls" style={{ marginTop: '20px' }}>
        <input className="lab-input" placeholder="Назва події" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="lab-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input className="lab-input" type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
        <button className="btn" type="submit">Додати</button>
      </form>
    </div>
  );
}
