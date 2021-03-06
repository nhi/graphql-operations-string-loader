# graphql-operations-string-loader <img height="36" src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" alt="GraphQL logo"/> <img height="36" src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.svg" alt="Webpack logo"/>

![npm version](https://img.shields.io/npm/v/graphql-operations-string-loader?style=for-the-badge) ![npm trends](https://img.shields.io/npm/dw/graphql-operations-string-loader?style=for-the-badge)

A webpack loader to import operations from .graphql or .gql file as simple strings 

Supports:
- any operation type
- export multiple operations per file (named exports)
- default and named export if there is only a single operation in a file

Does not support (yet?)
- No support for `graphql-tag/loader` like imports in .gql files (if you need this feature, please open an issue)


## Example
Source file:
```books.query.gql
query Books {
  book {
    name
    author
  }
}

query Book($id: String!) {
  book($id) {
    name
    author
  }
}
```
Produces:
```js
export const Books = `query Books {
  book {
    name
    author
  }
}`

export const Book = `query Book($id: String!) {
  book($id) {
    name
    author
  }
}`
```

If you only have one operation in a file, it will also be exported as the default.

```gql
query Foo {
  bar
}
```

```js
export const Foo = `query Foo {
  bar
}`
export default `query Foo {
  bar
}`
```

## Installation

`npm install -D graphql-operations-string-loader`

or

`yarn add -D graphql-operations-string-loader`

## Usage

Add the following to your webpack configuration:

```js
rules: [
  //...
  {
    exclude: /node_modules/,
    loader: "graphql-operations-string-loader",
    test: /\.(graphql|gql)$/,
  },
  // ...
],
```

Created at [Norsk Helseinformatikk AS](https://nhi.no)
