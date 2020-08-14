# tiniocc

[![npm version](https://img.shields.io/npm/v/tiniocc.svg)](https://www.npmjs.com/package/tiniocc) ![Node.js CI](https://github.com/fralonra/tiniocc/workflows/Node.js%20CI/badge.svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A dead simple IoC container, with lazyload support.

### Installation

```bash
yarn add tiniocc
```

or

```bash
npm i tiniocc
```

### Usage

```javascript
// import the exported function
// you can also require it when using CommonJS
// const { createContainer } = require('tiniocc')
import { createContainer } from 'tiniocc'

// create a container
const container = createContainer()
// register a module named 'module' with plain text content 'content'
container.register('module', 'content')

// access the module via dot notation
// will print 'content'
console.log(container.module)
```

```javascript
import { createContainer } from 'tiniocc'

const container = createContainer()
container.register('moduleA', 'content')
// register another module which depends on moduleA
container.register('moduleB', container => container.moduleA + ' content')

console.log(container.moduleA) // will print 'content'
console.log(container.moduleB) // will print 'content content'
```

***note***: when using with [snowpack](https://www.snowpack.dev/), you should import the module as follow:

```javascript
import tiniocc from 'tiniocc'

const container = tiniocc.createContainer()
```
