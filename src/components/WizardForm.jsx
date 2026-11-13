import React, { useReducer, useEffect } from 'react';
import { wizardReducer, initialWizardState, WIZARD_ACTIONS } from '../reducers/wizardReducer';

export function WizardForm() {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState, (init) => {
    const saved = localStorage.getItem('wizard-progress');
    return saved ? JSON.parse(saved) : init;
  });

  useEffect(() => {
    localStorage.setItem('wizard-progress', JSON.stringify(state));
  }, [state]);

  const handleNext = () => {
    const errors = {};
    if (state.step === 1) {
      if (!state.data.firstName) errors.firstName = 'Обов’язково';
      if (!state.data.lastName) errors.lastName = 'Обов’язково';
    }
    if (state.step === 2) {
      if (!state.data.email.includes('@')) errors.email = 'Невірний email';
      if (!state.data.phone) errors.phone = 'Обов’язково';
    }
    dispatch({ type: WIZARD_ACTIONS.SET_ERRORS, payload: errors });
    if (Object.keys(errors).length === 0) dispatch({ type: WIZARD_ACTIONS.NEXT });
  };

  const handleChange = (e) => dispatch({ type: WIZARD_ACTIONS.UPDATE_FIELD, payload: { name: e.target.name, value: e.target.value } });

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">03 / Wizard Форма (localStorage)</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[1,2,3].map(s => <div key={s} style={{ flex: 1, height: '4px', background: state.step >= s ? 'var(--color-success)' : 'var(--color-border)' }}></div>)}
      </div>
      
      {state.step === 1 && (
        <div className="form-group">
          <label>Ім'я</label>
          <input name="firstName" value={state.data.firstName} onChange={handleChange} className={`lab-input ${state.errors.firstName ? 'input-error' : ''}`} />
          {state.errors.firstName && <span className="error-text">{state.errors.firstName}</span>}
          <label>Прізвище</label>
          <input name="lastName" value={state.data.lastName} onChange={handleChange} className={`lab-input ${state.errors.lastName ? 'input-error' : ''}`} />
          {state.errors.lastName && <span className="error-text">{state.errors.lastName}</span>}
        </div>
      )}

      {state.step === 2 && (
        <div className="form-group">
          <label>Email</label>
          <input name="email" value={state.data.email} onChange={handleChange} className={`lab-input ${state.errors.email ? 'input-error' : ''}`} />
          {state.errors.email && <span className="error-text">{state.errors.email}</span>}
          <label>Телефон</label>
          <input name="phone" value={state.data.phone} onChange={handleChange} className={`lab-input ${state.errors.phone ? 'input-error' : ''}`} />
          {state.errors.phone && <span className="error-text">{state.errors.phone}</span>}
        </div>
      )}

      {state.step === 3 && (
        <div style={{ background: 'var(--color-background)', padding: '16px', border: '2px solid var(--color-border)' }}>
          <p style={{ margin: '4px 0' }}>Ім'я: {state.data.firstName} {state.data.lastName}</p>
          <p style={{ margin: '4px 0' }}>Email: {state.data.email}</p>
          <p style={{ margin: '4px 0' }}>Телефон: {state.data.phone}</p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button className="btn" onClick={() => dispatch({ type: WIZARD_ACTIONS.PREV })} disabled={state.step === 1}>← Назад</button>
        {state.step < 3 ? <button className="btn" onClick={handleNext}>Далі →</button> : <button className="btn" onClick={() => dispatch({ type: WIZARD_ACTIONS.RESET })}>Завершити</button>}
      </div>
    </div>
  );
}
