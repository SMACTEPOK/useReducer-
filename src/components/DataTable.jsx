import React, { useReducer, useEffect } from 'react';
import { tableReducer, initialTableState, TABLE_ACTIONS } from '../reducers/tableReducer';

export function DataTable() {
  const [state, dispatch] = useReducer(tableReducer, initialTableState);

  useEffect(() => {
    dispatch({ type: TABLE_ACTIONS.FETCH_START });
    const timer = setTimeout(() => dispatch({ type: TABLE_ACTIONS.FETCH_SUCCESS }), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = state.data.filter(item => item.name.toLowerCase().includes(state.filter.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    if (a[state.sortCol] < b[state.sortCol]) return state.sortDir === 'asc' ? -1 : 1;
    if (a[state.sortCol] > b[state.sortCol]) return state.sortDir === 'asc' ? 1 : -1;
    return 0;
  });
  const paginated = sorted.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
  const totalPages = Math.ceil(sorted.length / state.pageSize);

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">02 / Таблиця (Пагінація, Сортування)</h2>
      <input type="text" placeholder="Пошук..." className="lab-input" style={{ width: '100%', marginBottom: '16px' }} onChange={e => dispatch({ type: TABLE_ACTIONS.SET_FILTER, payload: e.target.value })} />
      
      {state.loading ? <p>Завантаження даних...</p> : (
        <table className="brutal-table">
          <thead>
            <tr>
              <th onClick={() => dispatch({ type: TABLE_ACTIONS.SET_SORT, payload: 'id' })}>ID {state.sortCol === 'id' && (state.sortDir === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => dispatch({ type: TABLE_ACTIONS.SET_SORT, payload: 'name' })}>Назва {state.sortCol === 'name' && (state.sortDir === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => dispatch({ type: TABLE_ACTIONS.SET_SORT, payload: 'price' })}>Ціна {state.sortCol === 'price' && (state.sortDir === 'asc' ? '▲' : '▼')}</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(item => (
              <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.price} грн</td></tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination" style={{ marginTop: '16px' }}>
        <button className="btn" disabled={state.page === 1} onClick={() => dispatch({ type: TABLE_ACTIONS.SET_PAGE, payload: state.page - 1 })}>← Назад</button>
        <span>Стор. {state.page} з {totalPages || 1}</span>
        <button className="btn" disabled={state.page === totalPages || totalPages === 0} onClick={() => dispatch({ type: TABLE_ACTIONS.SET_PAGE, payload: state.page + 1 })}>Далі →</button>
      </div>
    </div>
  );
}
