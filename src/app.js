import { render } from 'react-dom';
import data from './__mock__/collections.success.json';

export const App = ({ list }) => {
    return (
        <main>
            {list.slice(0, 10).map(({ objectNumber, longTitle, webImage }) => {
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

const node = document.querySelector('.app');

if (node) {
    render(<App list={data.artObjects} />, node);
}
