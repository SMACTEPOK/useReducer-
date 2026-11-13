export const NOTIF_ACTIONS = { ADD: 'ADD', REMOVE: 'REMOVE' };

export const initialNotifState = { notifications: [] };

export function notificationReducer(state, action) {
  switch (action.type) {
    case NOTIF_ACTIONS.ADD: {
      const newNotif = { ...action.payload, id: Date.now() + Math.random() };
      const newList = [newNotif, ...state.notifications].slice(0, 5);
      return { ...state, notifications: newList };
    }
    case NOTIF_ACTIONS.REMOVE:
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    default: return state;
  }
}
