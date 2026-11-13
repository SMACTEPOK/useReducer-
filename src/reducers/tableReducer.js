export const TABLE_ACTIONS = { FETCH_START: 'FETCH_START', FETCH_SUCCESS: 'FETCH_SUCCESS', SET_PAGE: 'SET_PAGE', SET_SORT: 'SET_SORT', SET_FILTER: 'SET_FILTER' };

const MOCK_DATA = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1, name: `Товар ${i + 1}`, price: Math.floor(Math.random() * 1000) + 100, category: i % 2 === 0 ? 'Електроніка' : 'Одяг'
}));

export const initialTableState = { data: [], loading: false, page: 1, pageSize: 5, sortCol: 'id', sortDir: 'asc', filter: '' };

export function tableReducer(state, action) {
  switch (action.type) {
    case TABLE_ACTIONS.FETCH_START:
      return { ...state, loading: true };
    case TABLE_ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, data: MOCK_DATA };
    case TABLE_ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    case TABLE_ACTIONS.SET_SORT:
      return { ...state, sortCol: action.payload, sortDir: state.sortCol === action.payload && state.sortDir === 'asc' ? 'desc' : 'asc' };
    case TABLE_ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload, page: 1 };
    default:
      return state;
  }
}
