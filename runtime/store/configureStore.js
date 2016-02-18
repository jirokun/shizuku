import { createStore } from 'redux'
import rootReducer from '../reducers'

var defaultState = {
  data: [
  ]
};
export default function configureStore(initialState = defaultState) {
  const store = createStore(rootReducer, initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
