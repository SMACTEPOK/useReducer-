import React, { useReducer } from 'react';
import { cartReducer, initialCartState, CART_ACTIONS } from '../reducers/cartReducer';

export function CartApp() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = total - (total * state.discount);

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">01 / Кошик (useReducer)</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h4>Доступні товари:</h4>
          {state.availableItems.map(item => (
            <div key={item.id} className="list-item">
              <span>{item.name} - {item.price} грн</span>
              <button className="btn btn--small" onClick={() => dispatch({ type: CART_ACTIONS.ADD, payload: item })}>+ Додати</button>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h4>Ваш кошик:</h4>
          {state.items.length === 0 ? <p className="empty-text">Порожньо</p> : (
            <>
              {state.items.map(item => (
                <div key={item.id} className="list-item">
                  <span>{item.name}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="number" min="1" value={item.quantity} onChange={(e) => dispatch({ type: CART_ACTIONS.UPDATE_QTY, payload: { id: item.id, qty: +e.target.value } })} className="mini-input" />
                    <button className="btn btn--small btn--danger" onClick={() => dispatch({ type: CART_ACTIONS.REMOVE, payload: item.id })}>✕</button>
                  </div>
                </div>
              ))}
              <div className="lab-controls" style={{ marginTop: '16px' }}>
                <input type="text" placeholder="Промокод (SAVE10)" className="lab-input" onBlur={(e) => dispatch({ type: CART_ACTIONS.APPLY_PROMO, payload: e.target.value })} />
                <button className="btn" onClick={() => dispatch({ type: CART_ACTIONS.CLEAR })}>Очистити</button>
              </div>
              <div className="total-box">
                <p>Знижка: {state.discount * 100}%</p>
                <p>Разом: <b>{finalTotal.toFixed(2)} грн</b></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
