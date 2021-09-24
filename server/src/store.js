import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import sagas from './sagas';

const store = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const configStore = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(sagas);

  return configStore;
};

export default store;
