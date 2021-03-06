import fetchMock from 'fetch-mock-jest';
import responseSuccess from '../../__mocks__/collections.success.json';
import { resolvePaintings } from '../resolve-paintings';
import { slice, update } from 'lodash/fp';

afterEach(() => {
    fetchMock.reset();
});

// Cut down the mock art objects to 3 for concise expectation blocks
const responseSuccessMock = update(
    ['artObjects'],
    slice(0, 3),
    responseSuccess
);

beforeEach(() => {
    fetchMock.get('glob:https://www.rijksmuseum.nl/**', responseSuccessMock);
});

describe('Resolvers', () => {
    describe('success response', () => {
        it('should resolve painting from API with default parameters', async () => {
            await resolvePaintings();
            const expected =
                'https://www.rijksmuseum.nl/api/en/collection?technique=painting&imgonly=true&ondisplay=true&ps=30&p=1&key=apikey12';
            expect(fetchMock).toHaveFetched(expected);
        });

        it('should respect passed params', async () => {
            await resolvePaintings({ page: 3, qty: 20, onDisplay: false });

            expect(fetchMock).toHaveFetched(
                'https://www.rijksmuseum.nl/api/en/collection?technique=painting&imgonly=true&ondisplay=false&ps=20&p=3&key=apikey12'
            );
        });

        it('should process response from server', async () => {
            const response = await resolvePaintings();

            expect(response).toEqual([
                {
                    id: 'en-SK-A-447',
                    longTitle:
                        'Fishing for Souls, Adriaen Pietersz. van de Venne, 1614',
                    objectNumber: 'SK-A-447',
                    webImage: {
                        guid: '60a5c836-c8f9-4265-8afe-a14706259554',
                        height: 3940,
                        offsetPercentageX: 0,
                        offsetPercentageY: 0,
                        url:
                            'https://lh3.googleusercontent.com/6sHAvl6_uu8UUg2tQ5I7HC3X5TCEW9JlWKLfdjxSQGXv9Xnur1VQbiN2CIXDq7rFtnhjes0ga-YFg6obNIUX9GPdv_z81LufDtSndtmEAw=s0',
                        width: 6531,
                    },
                },
                {
                    id: 'en-SK-A-1505',
                    longTitle:
                        'A Windmill on a Polder Waterway, Known as ‘In the Month of July’, Paul Joseph Constantin Gabriël, c. 1889',
                    objectNumber: 'SK-A-1505',
                    webImage: {
                        guid: '3e83eca2-5306-4d6d-b499-f86091c81d39',
                        height: 2748,
                        offsetPercentageX: 0,
                        offsetPercentageY: 0,
                        url:
                            'https://lh3.googleusercontent.com/nfJiRConmXf4QR1bK3-E456qIEp2bYtuemyy3P3t7PonntyGJ8iPzFNKJPhZFCSSmJmj2AHePE4V1xl3BOz2NT8mfbNg=s0',
                        width: 1767,
                    },
                },
                {
                    id: 'en-SK-A-175',
                    longTitle:
                        "A Pelican and other Birds near a Pool, Known as ‘The Floating Feather’, Melchior d'Hondecoeter, c. 1680",
                    objectNumber: 'SK-A-175',
                    webImage: {
                        guid: '6753e473-6fea-4c5c-8014-454ba4c393ec',
                        height: 2640,
                        offsetPercentageX: 0,
                        offsetPercentageY: 0,
                        url:
                            'https://lh3.googleusercontent.com/3UIOtn2DLhEC4W92V0_pIdChloiYyzpXvehK0BYaM3NHJR5zWhcA7uXlcNX_mCAt9xBh3gaHo3pDuriYzYm3uEDbeUEr=s0',
                        width: 2388,
                    },
                },
            ]);
        });
    });
});
