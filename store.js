import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';  // Your rootReducer
import { rootSaga } from './rootSaga';    // Your rootSaga
import createSagaMiddleware from 'redux-saga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the logger middleware
const logger = createLogger({
  collapsed: true, // Automatically collapse the log for each action
});

// Create the Redux store with the saga and logger middleware
const store = createStore(
  rootReducer,                       // Your root reducer
  applyMiddleware(sagaMiddleware, logger)  // Apply both saga and logger middleware
);

// Run the rootSaga
sagaMiddleware.run(rootSaga);

export default store;
