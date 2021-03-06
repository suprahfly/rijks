import React from 'react';
import fetchMock from 'fetch-mock-jest';
import { render, cleanup, waitFor } from '@testing-library/react';
import data from '../__mocks__/collections.success.json';
import { App } from '../app';
import { resolvePaintings } from '../resolvers/resolve-paintings';

fetchMock.config.overwriteRoutes = true;

afterEach(() => {
    cleanup();
    fetchMock.reset();
});

beforeEach(() => {
    fetchMock.get('glob:https://www.rijksmuseum.nl/*', data);
});

describe('App', () => {
    it('should fetch API', () => {
        render(<App onLoad={resolvePaintings} />);

        expect(fetchMock).toHaveFetched(
            'https://www.rijksmuseum.nl/api/en/collection?technique=painting&imgonly=true&ondisplay=true&ps=30&p=1&key=apikey12'
        );
    });

    it('should render first titles', async () => {
        const { getByText } = render(<App onLoad={resolvePaintings} />);

        const text =
            'A Windmill on a Polder Waterway, Known as ‘In the Month of July’, Paul Joseph Constantin Gabriël, c. 1889';

        await waitFor(() => {
            expect(() => getByText(text)).not.toThrow();
        });
    });

    it('should show an error', async () => {
        fetchMock.get('glob:https://www.rijksmuseum.nl/*', 500);
        const { getByText } = render(<App onLoad={resolvePaintings} />);

        const text = 'Oops.. Something went wrong 😰 Try to reload page';

        await waitFor(() => {
            expect(() => getByText(text)).not.toThrow();
        });
    });
});
