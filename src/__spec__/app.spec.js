import React from 'react';
import fetchMock from 'fetch-mock-jest';
import { render, cleanup, waitFor } from '@testing-library/react';
import data from '../__mocks__/collections.success.json';
import { App } from '../app';
import { resolvePaintings } from '../resolvers/resolve-paintings';

afterEach(() => {
    cleanup();
    fetchMock.reset();
});

beforeEach(() => {
    fetchMock.get('glob:https://www.rijksmuseum.nl/*', data.artObjects);
});

describe('App', () => {
    it('should render first titles', () => {
        const { getByText } = render(<App onLoad={resolvePaintings} />);

        const text =
            'A Windmill on a Polder Waterway, Known as ‘In the Month of July’, Paul Joseph Constantin Gabriël, c. 1889';
        
        expect(() => getByText(text)).not.toThrow();
    });

    it('should fetch API', () => {
        render(<App onLoad={resolvePaintings} />);

        expect(fetchMock).toHaveFetched(
            'https://www.rijksmuseum.nl/api/en/collection?technique=painting&imgonly=true&ondisplay=true&ps=30&p=1&key=hb24HuF8'
        );
    });
});
