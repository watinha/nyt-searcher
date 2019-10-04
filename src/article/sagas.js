import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ArticleActions } from './actions';

export function* article_search (action) {
    yield put(ArticleActions.start_req());
    const query = action.query,
          response = yield call(axios.get,
        'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
		`q=${query}&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU`);
    yield put(ArticleActions.load(response['data']['response']['docs']));
    yield put(ArticleActions.end_req());
}

export function* article_request () {
    yield takeEvery('ARTICLE_SEARCH', article_search);
};
