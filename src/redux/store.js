import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
let middleware = [thunk];

if (__DEV__) {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
  middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
  middleware = [...middleware];
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );
}
