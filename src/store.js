// store.js

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Define your reducer function here
const rootReducer = (state = { tasks: [] }, action) => {
  // Handle your state changes based on actions here
  return state;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks'] // Reducer keys to be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
