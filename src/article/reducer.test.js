import { article_reducer } from './reducer';
import { ArticleActions } from './actions';

it('should return empty initial state', () => {
    let state = article_reducer();
    expect(state).not.toBeUndefined();
    expect(state.loading).toBe(false);
    expect(state.items).not.toBeUndefined();
    expect(state.items.length).toBe(0);
});

it('should change loading status to true', () => {
    let initial_state = article_reducer(),
        state = article_reducer(initial_state, ArticleActions.start_req());
    expect(state.loading).toBe(true);
    expect(state.items).not.toBeUndefined();
    expect(state.items.length).toBe(0);
    expect(initial_state).not.toBe(state);
});

it('should change loading status to false', () => {
    let initial_state = article_reducer(),
        state = article_reducer(initial_state, ArticleActions.end_req());
    expect(state.loading).toBe(false);
    expect(state.items).not.toBeUndefined();
    expect(state.items.length).toBe(0);
    expect(initial_state).not.toBe(state);
});

it('should load new articles', () => {
    let initial_state = article_reducer(),
        items = ['abobrinha', 'pepino', 'abacaxi'],
        state = article_reducer(initial_state, ArticleActions.load(items));
    expect(state.items).not.toBeUndefined();
    expect(state.items.length).toBe(3);
    expect(state.items).not.toBe(items);
    expect(state.items[0]).toBe('abobrinha');
    expect(state.items[1]).toBe('pepino');
    expect(state.items[2]).toBe('abacaxi');
});
