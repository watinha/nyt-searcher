import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let div = null;

beforeEach(() => {
    div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

afterEach(() => {
    if (div) ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    let h1 = div.querySelectorAll('h1');
    expect(h1.length).toBe(1);
    expect(h1[0].innerHTML).toBe('NYT Searcher Tool');
});
