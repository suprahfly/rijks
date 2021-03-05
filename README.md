### Explore Rijksmuseum

This is a simple proof of concept app that pulls the data from Rijksmuseum API and then display it as tiles of 1, 2 or 4 pieces. Right now it depends only on `react`, `react-dom` and `lodash` (mainly for my obsession with fp notation but it is not a nesessety).

What I have done up to that point
* Set up a `xo` linter and prettier
* Set up Parcel bundler to work with `react` and `jest`
* Set up Jest
* Wrote few abstractions for UI (`Gallery`, `Painting`)
* Wrote a simple resolver to fetch data from API
* Made basic pagination

What needs to be done next
* Add infinite scrolling feature with lazy-loading
* Add `react-window` for virtualizing big lists
* Fix current UI test and add more
* Use state manager for data and side-effects (redux or else)
* Add skeletons for loading pictures
* Improve UI to a masonry layout
* Improve design 
