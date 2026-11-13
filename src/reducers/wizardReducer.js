export const WIZARD_ACTIONS = { NEXT: 'NEXT', PREV: 'PREV', UPDATE_FIELD: 'UPDATE_FIELD', SET_ERRORS: 'SET_ERRORS', RESET: 'RESET' };

const INITIAL_DATA = { firstName: '', lastName: '', email: '', phone: '', address: '', city: '' };

export const initialWizardState = { step: 1, data: INITIAL_DATA, errors: {} };

export function wizardReducer(state, action) {
  switch (action.type) {
    case WIZARD_ACTIONS.NEXT: return { ...state, step: Math.min(3, state.step + 1) };
    case WIZARD_ACTIONS.PREV: return { ...state, step: Math.max(1, state.step - 1) };
    case WIZARD_ACTIONS.UPDATE_FIELD: return { ...state, data: { ...state.data, [action.payload.name]: action.payload.value } };
    case WIZARD_ACTIONS.SET_ERRORS: return { ...state, errors: action.payload };
    case WIZARD_ACTIONS.RESET: return initialWizardState;
    default: return state;
  }
}
