# Virtual Visit of the Met Museum

This is a sample [React](https://react.dev/) against [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/) navigating, browsing and searching the different gallery and object.

Technically, this contains many features a React app would require:
- react router
- fetch data from [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/)
- custom pagination (there' no pagination in the met's API)
- cache using Session Storage
- Github Action for automatic deployment as Github pages
- The hosted version uses the react router's `HashRouter` but would be preferable `BrowserRouter`
- With the help of [Tailwind css](https://tailwindcss.com/) to handle all css design