import { getEndpoint } from '../helpers';
import { getOr, pick, pipe, map } from 'lodash/fp';

/**
 * Omit unused data from Rijksmuseum API response
 * @param {object} data API data
 * @returns {object[]} data API data
 */
const processData = pipe([
    getOr([], ['artObjects']),
    map(pick(['id', 'objectNumber', 'longTitle', 'webImage'])),
]);

/**
 * Fetch and process response from Rijksmuseum API
 * @param {number} [page] number of page that need to be fetched
 * @param {number} [qty] quantity of fetched paintings
 * @param {boolean} [onDisplay] fetch pantings only displayed in museum
 * @returns {Promise<object[], Error>}
 */
export const resolvePaintings = async ({ page, qty, onDisplay } = {}) => {
    const endpoint = getEndpoint({ page, qty, onDisplay });

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    const data = await response.json();

    return processData(data);
};
