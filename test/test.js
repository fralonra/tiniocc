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

test('register modules which depends on other module', t => {
  t.plan(2)

  const tiniocc = createContainer()
  tiniocc.register('moduleA', 'content')
  tiniocc.register('moduleB', container => container.moduleA + ' content')
  tiniocc.register('moduleC', container => container.moduleA + ' content')
  t.equal(tiniocc.moduleB, 'content content')
  t.equal(tiniocc.moduleC, 'content content')
})

test('register modules correctly regardless of their orders', t => {
  t.plan(1)

  const tiniocc = createContainer()
  tiniocc.register('moduleB', container => container.moduleA + ' content')
  tiniocc.register('moduleA', 'content')
  t.equal(tiniocc.moduleB, 'content content')
})

test('throw if there is any circular dependency', t => {
  t.plan(5)

  const tiniocc = createContainer()
  tiniocc.register('moduleA', container => container.moduleB)
  tiniocc.register('moduleB', container => container.moduleA)
  tiniocc.register('moduleC', container => container.moduleD)
  tiniocc.register('moduleD', container => container.moduleE)
  tiniocc.register('moduleE', container => container.moduleC)
  t.throw(() => tiniocc.moduleA)
  t.throw(() => tiniocc.moduleB)
  t.throw(() => tiniocc.moduleC)
  t.throw(() => tiniocc.moduleD)
  t.throw(() => tiniocc.moduleE)
})

test('mix normal modules and circular dependencies', t => {
  t.plan(2)

  const tiniocc = createContainer()
  tiniocc.register('module', 'content')
  tiniocc.register('moduleA', container => container.moduleB)
  tiniocc.register('moduleB', container => container.moduleA)
  t.equal(tiniocc.module, 'content')
  t.throw(() => tiniocc.moduleA)
})
