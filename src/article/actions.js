import axios from 'axios';

export class ArticleActions {
    static start_req () { return { type: 'ARTICLE_REQUEST_START'}; }
    static end_req () { return { type: 'ARTICLE_REQUEST_END'}; }
    static load (items) {
        return {
            type: 'ARTICLE_LOAD',
            items: items
        };
    }
    static search (query) {
        return async (dispatch) => {
            dispatch(ArticleActions.start_req());
			let response = await axios.get(
				'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
				`q=${query}&api-key=j2SELYz4iSc3GfFXVxPtCbR2YZ7QGrCU`),
				json = JSON.parse(response);
			dispatch(ArticleActions.load(json['response']['docs']));
            dispatch(ArticleActions.end_req());
        };
    }
};
