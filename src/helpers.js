/**
 * No-operation stub
 * @returns {void}
 */
export const noop = () => {};

/**
 * Returns Rijksmuseum API URL based on passed params
 * @param {string} apiKey Rijksmuseum API key
 * @param {number} [page] number of page that need to be fetched
 * @param {number} [qty] quantity of fetched paintings
 * @param {boolean} [onDisplay] fetch pantings only displayed in museum
 * @returns {string}
 */
export const getEndpoint = ({
    apiKey,
    page = 1,
    qty = 30,
    onDisplay = true,
}) => {
    const queryParameters =
        'technique=painting&' +
        'imgonly=true&' +
        `ondisplay=${onDisplay}&` +
        `ps=${qty}&` +
        `p=${page}&` +
        `key=${apiKey}`;
    return `https://www.rijksmuseum.nl/api/en/collection?${queryParameters}`;
};
