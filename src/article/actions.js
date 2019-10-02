export class ArticleActions {
    static start_req () { return { type: 'ARTICLE_REQUEST_START'}; }
    static end_req () { return { type: 'ARTICLE_REQUEST_END'}; }
    static load (items) {
        return {
            type: 'ARTICLE_LOAD',
            items: items
        };
    }
};
