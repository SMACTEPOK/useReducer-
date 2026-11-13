export const CALENDAR_ACTIONS = { NEXT_MONTH: 'NEXT_MONTH', PREV_MONTH: 'PREV_MONTH', ADD_EVENT: 'ADD_EVENT', DELETE_EVENT: 'DELETE_EVENT' };

export const initialCalendarState = { currentDate: new Date(), events: [] };

export function calendarReducer(state, action) {
  switch (action.type) {
    case CALENDAR_ACTIONS.NEXT_MONTH: {
      const d = new Date(state.currentDate);
      d.setMonth(d.getMonth() + 1);
      return { ...state, currentDate: d };
    }
    case CALENDAR_ACTIONS.PREV_MONTH: {
      const d = new Date(state.currentDate);
      d.setMonth(d.getMonth() - 1);
      return { ...state, currentDate: d };
    }
    case CALENDAR_ACTIONS.ADD_EVENT: {
      // Перевірка на накладання
      const isOverlap = state.events.some(e => e.date === action.payload.date && e.time === action.payload.time);
      if (isOverlap) return state;
      return { ...state, events: [...state.events, { ...action.payload, id: Date.now() }] };
    }
    case CALENDAR_ACTIONS.DELETE_EVENT:
      return { ...state, events: state.events.filter(e => e.id !== action.payload) };
    default: return state;
  }
}
