import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import article_reducer from './article/reducer';
import ArticleSearch from './article/component';
import { article_request } from './article/sagas';

let sagaMiddleware = createSagaMiddleware(),
    store = createStore(article_reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(article_request);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NYT Searcher Tool</h1>
        <Provider store={store}>
            <ArticleSearch />
        </Provider>
      </header>
    </div>
  );
}

export default App;
