import axios from 'axios';

import { ArticleActions } from './actions';

jest.mock('axios');

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

describe('search action', () => {

    it('should use axios and dispatch other actions', async () => {
        let dispatch = jest.fn(),
			url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nadal&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU',
            result;
		axios.get.mockResolvedValue(JSON.stringify(json_stub));
        result = ArticleActions.search('nadal');
        result = await result(dispatch);
        expect(dispatch).toBeCalledWith(ArticleActions.start_req());
		expect(axios.get).toBeCalledWith(url);
        expect(dispatch).toBeCalledWith(ArticleActions.load(json_stub['response']['docs']));
        expect(dispatch).toBeCalledWith(ArticleActions.end_req());
    });

    it('should use axios and dispatch other actions with different parameters', async () => {
        let dispatch = jest.fn(),
			url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=otherthing&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU',
            result;
		axios.get.mockResolvedValue(JSON.stringify(json_stub));
        result = ArticleActions.search('otherthing');
        result = await result(dispatch);
        expect(dispatch).toBeCalledWith(ArticleActions.start_req());
		expect(axios.get).toBeCalledWith(url);
        expect(dispatch).toBeCalledWith(ArticleActions.load(json_stub['response']['docs']));
        expect(dispatch).toBeCalledWith(ArticleActions.end_req());
    });
});
