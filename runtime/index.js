import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import JPipesApp from './containers/JPipesApp'
import configureStore from './store/configureStore'
import state from '../state.js'
import '../www/css/jpipes.scss'

const store = configureStore(state);

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <JPipesApp />
  </Provider>,
  rootElement
)
