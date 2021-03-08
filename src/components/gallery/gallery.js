import React from 'react';
import * as PropTypes from 'prop-types';
import { Masonry, useInfiniteLoader } from 'masonic';
import { Painting } from '../painting/painting';
import throttle from 'lodash/fp/throttle';

const THROTTLE_TIMEOUT = 500;

export const Gallery = ({ totalItems, list = [], onLoadMore }) => {
    const LOADER_OPTIONS = {
        threshold: 6,
        minimumBatchSize: 30,
        totalItems,
        isItemLoaded: (index, items) => {
            return Boolean(items[index]);
        },
    };

    // Infinity loader handler
    const loadMore = useInfiniteLoader(
        throttle(THROTTLE_TIMEOUT, onLoadMore),
        LOADER_OPTIONS
    );

    return (
        <div>
            <Masonry
                items={list}
                render={Painting}
                columnGutter={16}
                columnWidth={300}
                overscanBy={5}
                onRender={loadMore}
            />
        </div>
    );
};

Gallery.propTypes = {
    totalItems: PropTypes.number,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectNumber: PropTypes.string.isRequired,
            longTitle: PropTypes.string.isRequired,
            webImage: PropTypes.object.isRequired,
        })
    ),
    onLoadMore: PropTypes.func,
};
