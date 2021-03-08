import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { render } from 'react-dom';
import noop from 'lodash/fp/noop';
import { Gallery } from './components/gallery/gallery';
import { resolvePaintings } from './resolvers/resolve-paintings';
import './styles.css';

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

    async componentDidMount() {
        try {
            const list = await this.props.onLoad();

            this.setState(({ page }) => ({
                list,
                isLoading: false,
                page: page + 1,
            }));
        } catch {
            this.setState({ hasError: true });
        }
    }

    componentDidCatch() {
        this.props?.onError();
    }

    render() {
        const { list } = this.state;
        const { hasError } = this.state;

        return (
            <main>
                <h1>Enjoy Rijksmuseum masterpieces!</h1>

                {hasError ? (
                    <Error />
                ) : (
                    <Gallery
                        list={list}
                        isLoading={this.state.isLoading}
                        onLoadMore={this.handleLoadMore}
                    />
                )}
            </main>
        );
    }

    handleLoadMore = async () => {
        this.setState({ isLoading: true });

        const addition = await this.props.onLoad({ page: this.state.page });

        this.setState(({ page, list }) => ({
            page: page + 1,
            list: [...list, ...addition],
            isLoading: false,
        }));
    };
}

const node = document.querySelector('.app');

if (node) {
    render(<App onLoad={resolvePaintings} />, node);
}
