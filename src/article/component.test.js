import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReactTestUtils from 'react-dom/test-utils';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

import ArticleSearch from './component';
import { article_reducer } from './reducer';

let div = null;
jest.mock('axios');

let json_stub = {
  "status": "OK",
  "response": {
    "docs": [
      {
        "web_url": "https://www.nytimes.com/2019/09/04/sports/tennis/us-open-rafael-nadal.html",
        "headline": {
          "main": "The Endless Intensity of Rafael Nadal",
          "kicker": "On TENNIS"
        }
      }
    ]
  }
};

beforeEach(() => {
    let store = createStore(
        article_reducer,
        applyMiddleware(thunkMiddleware));
    div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <ArticleSearch />
        </Provider>, div);
});

afterEach(() => {
    if (div) ReactDOM.unmountComponentAtNode(div);
});

it('should render HTML structure', () => {
    let search_field = div.querySelectorAll('input'),
        label = div.querySelectorAll('label'),
        button = div.querySelectorAll('button'),
        articles_container = div.querySelectorAll('ul'),
        items;
    expect(search_field.length).toBe(1);
    expect(articles_container.length).toBe(1);
    expect(label.length).toBe(1);
    expect(button.length).toBe(1);
    items = articles_container[0].querySelectorAll('li');
    expect(items.length).toBe(0);
});

it('should render article when button is clicked', (done) => {
    let search_field = div.querySelector('input'),
        button = div.querySelector('button'),
        articles_container = div.querySelector('ul'),
        items;
    axios.get.mockResolvedValue({ 'data': json_stub });
    search_field.value = 'nadal';
    ReactTestUtils.Simulate.change(search_field);
    ReactTestUtils.Simulate.click(button);
    expect(axios.get).toBeCalledWith('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nadal&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU');
    setTimeout(() => {
        items = articles_container.querySelectorAll('li');
        expect(items.length).toBe(1);
        expect(items[0].innerHTML).toBe(
            '<a href=\"https://www.nytimes.com/2019/09/04/' +
                      'sports/tennis/us-open-rafael-nadal.html\">' +
                'The Endless Intensity of Rafael Nadal' +
            '</a> On TENNIS');
        done();
    }, 1);
});

it('should render article when button is clicked with different arguments', (done) => {
    let search_field = div.querySelector('input'),
        button = div.querySelector('button'),
        articles_container = div.querySelector('ul'),
        items;
    json_stub['response']['docs'] = [
        {
            'web_url': 'http://other1.com',
            'headline': {
                'main': 'Federer awesome',
                'kicker': 'other TENNIS'
            }
        },
        {
            'web_url': 'http://other2.com',
            'headline': {
                'main': 'Djokovic playing cool',
                'kicker': 's TENNIS'
            }
        }
    ];
    axios.get.mockResolvedValue({ 'data': json_stub });
    search_field.value = 'otherplayers';
    ReactTestUtils.Simulate.change(search_field);
    ReactTestUtils.Simulate.click(button);
    expect(axios.get).toBeCalledWith('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=otherplayers&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU');
    setTimeout(() => {
        items = articles_container.querySelectorAll('li');
        expect(items.length).toBe(2);
        expect(items[0].innerHTML).toBe(
            '<a href=\"http://other1.com\">' +
                'Federer awesome' +
            '</a> other TENNIS');
        expect(items[1].innerHTML).toBe(
            '<a href=\"http://other2.com\">' +
                'Djokovic playing cool' +
            '</a> s TENNIS');
        done();
    }, 1);
});
