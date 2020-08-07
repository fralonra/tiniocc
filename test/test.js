const t = require('tap')
const test = t.test

const { createContainer } = require('../dist/tiniocc.cjs.js')

test('register a module', t => {
  t.plan(1)

  const tiniocc = createContainer()
  tiniocc.register('module', 'content')
  t.equal(tiniocc.module, 'content')
})

test('register a module with a function', t => {
  t.plan(1)

  const tiniocc = createContainer()
  tiniocc.register('module', () => 'content')
  t.equal(tiniocc.module, 'content')
})

test('register a module which depends other module', t => {
  t.plan(1)

  const tiniocc = createContainer()
  tiniocc.register('moduleA', "content")
  tiniocc.register('moduleB', container => container.moduleA + ' content')
  t.equal(tiniocc.moduleB, 'content content')
})

test('register modules correctly regardless of their orders', t => {
  t.plan(1)

  const tiniocc = createContainer()
  tiniocc.register('moduleB', container => container.moduleA + ' content')
  tiniocc.register('moduleA', "content")
  t.equal(tiniocc.moduleB, 'content content')
})