import React from 'react';
import * as PropTypes from 'prop-types';
import { noop } from '../../helpers';
import { Painting } from '../painting/painting';

import styles from './styles.css';

/**
 * Gallery for displaying images
 */
export const Gallery = ({ list, onClick = noop }) => {
    return (
        <section className={styles.root}>
            {list?.map(({ objectNumber, longTitle, webImage }) => {
                if (!webImage?.url) {
                    return null;
                }

                const { url, width, height } = webImage;

                return (
                    <Painting
                        key={objectNumber}
                        width={width}
                        height={height}
                        src={url}
                        title={longTitle}
                    />
                );
            })}

            <button type="button" onClick={onClick}>
                Load more pieces
            </button>
        </section>
    );
};

Gallery.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectNumber: PropTypes.string.isRequired,
            longTitle: PropTypes.string.isRequired,
            webImage: PropTypes.object.isRequired,
        })
    ),
    onClick: PropTypes.func,
};
