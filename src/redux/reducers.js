import {combineReducers} from 'redux';
import initialState from './initialState';

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      return {
        ...state,
        app: {
          ...state.app,
          data: [...state.app.data, action.payload],
        },
      };
    }

    case 'EDIT_ITEM': {
      return {
        ...state,
        app: {
          ...state.app,
          data: action.payload,
        },
      };
    }

    case 'DELETE_ITEM': {
      return {
        ...state,
        app: {
          ...state.app,
          data: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

const appReducer = combineReducers({
  reducers,
});

const rootReducer = (state, action) => {
  if (action.type === 'persist/PURGE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
