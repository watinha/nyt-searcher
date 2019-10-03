import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import article_reducer from './article/reducer';
import ArticleSearch from './article/component';

let store = createStore(
    article_reducer, applyMiddleware(thunkMiddleware));

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
