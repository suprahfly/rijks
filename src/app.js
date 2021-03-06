import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { render } from 'react-dom';
import noop from 'lodash/fp/noop';
import { Gallery } from './components/gallery/gallery';
import { resolvePaintings } from './resolvers/resolve-paintings';

// Simple error
const Error = () => {
    return <h3>Oops.. Something went wrong 😰 Try to reload page</h3>;
};

export class App extends PureComponent {
    static propTypes = {
        onError: PropTypes.func,
        onLoad: PropTypes.func,
    };

    static defaultProps = {
        onError: noop,
        onLoad: noop,
    };

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    state = {
        hasError: false,
        isLoading: true,
        page: 1,
        list: [],
    };

    componentDidMount() {
        this.props
            .onLoad()
            .then((list) => {
                this.setState(({ page }) => ({
                    list,
                    isLoading: false,
                    page: page + 1,
                }));
            })
            .catch(() => this.setState({ hasError: true }));
    }

    componentDidCatch() {
        this.props?.onError();
    }

    render() {
        const { list } = this.state;
        const { hasError } = this.state;

        return (
            <main>
                {hasError ? (
                    <Error />
                ) : (
                    <Gallery
                        list={list}
                        isLoading={this.state.isLoading}
                        onClick={this.handleLoadMoreClick}
                    />
                )}
            </main>
        );
    }

    handleLoadMoreClick = async () => {
        this.setState({ isLoading: true });

        const addition = await this.props.onLoad({ page: this.state.page });

        this.setState(({ page, list }) => ({
            page: page + 1,
            list: list.concat(addition),
            isLoading: false,
        }));
    };
}

const node = document.querySelector('.app');

if (node) {
    render(<App onLoad={resolvePaintings} />, node);
}
