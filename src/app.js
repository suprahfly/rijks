import React from 'react';
import * as PropTypes from 'prop-types';
import { render } from 'react-dom';
import data from './__mock__/collections.success.json';

export const App = ({ list }) => {
    return (
        <main>
            {list?.map(({ objectNumber, longTitle, webImage }) => {
                return (
                    <figure key={objectNumber}>
                        <img width="100%" src={webImage?.url} />
                        <figcaption>{longTitle}</figcaption>
                    </figure>
                );
            })}
        </main>
    );
};

App.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectNumber: PropTypes.string.isRequired,
            longTitle: PropTypes.string.isRequired,
            webImage: PropTypes.string.isRequired,
        })
    ),
};

const node = document.querySelector('.app');

if (node) {
    render(<App list={data.artObjects.slice(0, 10)} />, node);
}
