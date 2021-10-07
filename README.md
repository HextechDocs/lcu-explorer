## Ray's Nextron Template

---

## Features

- Easy to build binaries thanks to electron builder#'
- Easy theming(styled-components & styled theming).
- Easy global state management.
- Typescript support(optional but preferred).
- Fully linted(with prettier and eslint).
- Global css using sass.
- Sass support.
- Css-in-js.
- Fast development with easy component,layout and state creation.
- Isolated scss with scss modules or styled components
- Easy dependency upgrading

## Technologies used
- [Electron](https://www.electronjs.org/)
- [NextJS](https://nextjs.org/)
- [RecoilJS](https://recoiljs.org/)
- [Sass](https://sass-lang.com/)
- [Css-in-js](https://cssinjs.org/?v=v10.7.1)
- [Styled-components](https://styled-components.com/)
- [Styled-theming](https://www.npmjs.com/package/styled-theming)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Scripts

**Below are scripts that you can use to make development easier**

### Development

This runs the basic Next.js Server.

```shell
yarn dev
```

### Building

This builds the files in to an end result.

```shell
yarn build
```

### Linting

Below you can use both, however the eslint command is recommended before pushing to a repo.
**Eslint:**

```shell
yarn eslint
```

or

**Prettier:**

```shell
yarn lint
```

## Templates

You can easily create components, state or layouts using the templates provided. All you have to do is run these simple
commands:

### Components

```shell
yarn create:component <name>
```

### Layouts

```shell
yarn create:layout <name>
```

### States

```shell
yarn create:state <name>
```

## Upgrading dependencies

You can easily upgrade the projects dependencies using:

```shell
yarn update:deps
```
