import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { article_request, article_search } from './sagas';

let json_stub = {
  "status": "OK",
  "response": {
    "docs": [
      {
        "web_url": "https://www.nytimes.com/2019/09/04/sports/tennis/us-open-rafael-nadal.html",
        "headline": {
          "main": "The Endless Intensity of Rafael Nadal",
          "kicker": "On TENNIS",
          "print_headline": "Nobody Plays Like Nadal. Nobody Practices Like Him, Either.",
        }
      }
    ]
  }
};

describe('article_request --> ', () => {
    it('should takeEvery ARTICLE_SEARCH', () => {
        const generator = article_request();
        expect(generator.next().value)
            .toEqual(takeEvery('ARTICLE_SEARCH', article_search));
    });
});

describe('article_search -->', () => {
    it('should load call axios.get, load and end request', () => {
        const generator = article_search({ type: 'ARTICLE_SEARCH', query: 'nadal'});
        expect(generator.next().value)
            .toEqual(put({ type: 'ARTICLE_REQUEST_START' }));
        expect(generator.next().value).toEqual(
            call(axios.get, 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
		    'q=nadal&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU'));
        expect(generator.next({ 'data': json_stub }).value)
            .toEqual(put({ type: 'ARTICLE_LOAD', items: json_stub['response']['docs']}));
        expect(generator.next().value)
            .toEqual(put({ type: 'ARTICLE_REQUEST_END' }));
    });
    it('should load call axios.get, load and end request with other parameter', () => {
        const generator = article_search({ type: 'ARTICLE_SEARCH', query: 'federer'});
        expect(generator.next().value)
            .toEqual(put({ type: 'ARTICLE_REQUEST_START' }));
        expect(generator.next().value).toEqual(
            call(axios.get, 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
		    'q=federer&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU'));
        expect(generator.next({ 'data': json_stub }).value)
            .toEqual(put({ type: 'ARTICLE_LOAD', items: json_stub['response']['docs']}));
        expect(generator.next().value)
            .toEqual(put({ type: 'ARTICLE_REQUEST_END' }));
    });
});
