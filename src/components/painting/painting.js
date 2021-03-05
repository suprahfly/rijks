import React, { useCallback, useState } from 'react';
import * as PropTypes from 'prop-types';
import errorIllustration from './resources/error.jpg';
import styles from './styles.css';

/**
 * Returns caption for painting
 * @param {string} title
 * @param {boolean} hasError
 * @retunrs {string} caption
 */
const getCaption = (title, hasError) => {
    if (!hasError) {
        return title;
    }

    return `The «${title}» painting on a maintenance. Sorry for inconvenience`;
};

/**
 * Gallery for displaying images
 */
export const Painting = ({ src, title }) => {
    const [hasError, setHasError] = useState(false);
    const handleError = useCallback(() => setHasError(true), []);
    const _src = hasError ? errorIllustration : src;

    return (
        <figure className={styles.root}>
            <img width="100%" src={_src} onError={handleError} />
            <figcaption>{getCaption(title, hasError)}</figcaption>
        </figure>
    );
};

Painting.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
