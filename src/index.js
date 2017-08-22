import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import todoApp from './reducers';
import App from './components/App';
import { initAuth } from './auth';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store';
import _ from 'lodash';
import history from './history';
import 'bootstrap/dist/css/bootstrap.css';
// import './firebase';

const store = configureStore();
const rootElement = document.getElementById('root');

function render(Component) {
	ReactDOM.render(
  <Provider store={store}>
    	<ConnectedRouter history={history}>
        <div>
          <Component/>
        </div>
	</ConnectedRouter>
  </Provider>,
  rootElement
  );
}

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(require('./components/App').default);
  })
}

initAuth(store.dispatch)
  .then(() => render(App))
.catch(error => console.error(error));