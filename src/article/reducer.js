let article_reducer = (state, action = { type: '' }) => {
    if (!state)
        state = { loading: false,  items: [] };
    switch (action.type) {
        case 'ARTICLE_REQUEST_START':
            state = { ...state, loading: true }
            break;
        case 'ARTICLE_REQUEST_END':
            state = { ...state, loading: false }
            break;
        case 'ARTICLE_LOAD':
            state = { ...state, items: [ ...action.items ] }
            break;
        default:
            break;
    }
    return state;
};
export default article_reducer;
