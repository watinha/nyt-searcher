import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ArticleActions } from './actions';

class ArticleSearch extends React.Component {
    constructor (props) {
        super(props);
        this.state = { query: '' };
    }

    change (ev) { this.setState({ 'query': ev.target.value }); }
    search () { this.props.search(this.state.query); }

    render () {
        return (
        <div>
            <label htmlFor="search_field">Query:</label>
            <input type="text" name="search_field" value={this.state.query}
                   onChange={this.change.bind(this)} />
            <button onClick={this.search.bind(this)}>search!!!</button>
            <ul>
            {this.props.items.map((item, index) => { return (
                <li key={index}><a href={item['web_url']}>
                    {item['headline']['main']}</a> {item['headline']['kicker']}</li>
            );})}
            </ul>
        </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        items: state.items
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        search: (query) => { dispatch(ArticleActions.search(query)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearch);
