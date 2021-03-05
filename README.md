### Explore Rijksmuseum

This is a simple proof of concept app thah pulls the data from Rijksmuseum API and then display it as tiles of 1, 2 or 4 pieces. Right now it depends only on `react`, `react-dom` and `lodash` (mainly for my obsession with fp notation but it is a not nesessety).

What I done up to that point
* Set up a `xo` linter and prettier
* Set up Parcel bundler to work with `react` and `jest`
* Set up Jest
* Wrote few abstractions for UI (`Gallery`, `Painting`)
* Wrote a simple resolver to fetch data from API
* Made basic pagination

What nneds to be done next
* Add infinite scrolling feature with lazy-loading
* Add `react-window` for virtualizing big lists
* Use redux or any else state manager for stored data
* Add skeletons for loading pictures
* Improve UI to masonry layout
* Improve design