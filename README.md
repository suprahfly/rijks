### Explore Rijksmuseum

[![Deploy](https://github.com/suprahfly/rijks/actions/workflows/gh-pages.yml/badge.svg?branch=main)](https://github.com/suprahfly/rijks/actions/workflows/gh-pages.yml)

This is a simple proof of concept app that pulls the data from Rijksmuseum API and then display it as tiles of 1, 2 or 4 pieces.
Right now it depends only on `react`, `react-dom` and `lodash` (mainly for my obsession with fp notation but it is not a necessity).

To start the application you need to clone the repo, copy `.env.test.local -> .env` and replace it's content with your `API_KEY`.
Then run following commands in the app root directory:
```
// Feel free to use `npm` as well
yarn install
yarn start
```

The server will available at `localhost:1234`. Also build is deployed to https://suprahfly.github.io

---

What I have done up to that point
- [x] Set up a `xo` linter, `prettier`, and pre-commit hook with `husky`
- [x] Set up Parcel bundler to work with `react` and `jest`
- [x] Set up Jest
- [x] Wrote few abstractions for UI (`Gallery`, `Painting`)
- [x] Wrote a simple resolver to fetch data from API
- [x] Made a basic pagination
- [x] Fix current UI test
- [x] Add simple CI/CD flow with Github Actions

What needs to be done next
- [ ] Add an infinite scrolling feature with lazy-loading
- [ ] Add `react-window` for virtualizing big lists
- [ ] Use a state manager for data and side-effects (`redux` or else)
- [ ] Add skeletons for the loading pictures
- [ ] Improve UI to a masonry layout
- [ ] Improve design 
