export function article_reducer(state, action) {
    if (!state)
        return { loading: false,  items: [] };
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
    }
    return state;
};
