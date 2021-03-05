import React from 'react';
import fetchMock from 'fetch-mock-jest';
import { render, cleanup } from '@testing-library/react';
import data from '../__mock__/collections.success.json';
import { App } from '../app';

afterEach(() => {
    cleanup();
    fetchMock.reset();
});

beforeEach(() => {
    fetchMock.get('https://www.rijksmuseum.nl/*', data.artObjects);
});

describe('App', () => {
    it('should render titles', () => {
        const { getByText } = render(
            <App list={data.artObjects.slice(0, 10)} />
        );

        const title = getByText(
            'A Windmill on a Polder Waterway, Known as ‘In the Month of July’, Paul Joseph Constantin Gabriël, c. 1889'
        );
        expect(title).toBeDefined();
    });

    it('should fetch API', () => {
        render(<App />);

        expect(fetchMock).toHaveFetched(
            'https://www.rijksmuseum.nl/api/en/collection?technique=painting&imgonly=true&ps=50&p=1&ondisplay=true'
        );
    });

    it('should render titles', () => {
        const { getByText } = render(
            <App list={data.artObjects.slice(0, 10)} />
        );

        const title = getByText('Rembrandt’s Son Titus in a Monk’s Habit');

        expect(title).toBeDefined();
    });
});
