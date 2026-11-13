export const CART_ACTIONS = { ADD: 'ADD', REMOVE: 'REMOVE', UPDATE_QTY: 'UPDATE_QTY', CLEAR: 'CLEAR', APPLY_PROMO: 'APPLY_PROMO' };

const MOCK_ITEMS = [
  { id: 1, name: 'Керамічна ваза', price: 450 },
  { id: 2, name: 'В’язаний плед', price: 1200 },
  { id: 3, name: 'Дерев’яна шкатулка', price: 680 }
];

export const initialCartState = { items: [], promoCode: '', discount: 0, availableItems: MOCK_ITEMS };

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case CART_ACTIONS.REMOVE:
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case CART_ACTIONS.UPDATE_QTY:
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.qty) } : i) };
    case CART_ACTIONS.CLEAR:
      return { ...state, items: [], promoCode: '', discount: 0 };
    case CART_ACTIONS.APPLY_PROMO: {
      const code = action.payload.trim().toUpperCase();
      const discount = code === 'SAVE10' ? 0.1 : code === 'SAVE20' ? 0.2 : 0;
      return { ...state, promoCode: code, discount };
    }
    default:
      return state;
  }
}
