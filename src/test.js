const test = require('tape');

const makeDocumentHeaders = require('./index');

const TITLE = 'Hello World';

const formatExpectedTags = (tags) => `<head>\n\t${tags.join('\n\t')}\n</head>\n`;

test('Given a self-closing tag with no attributes the head will return as expected', (t) => {
  const tags = [
    {
      type: 'amp',
      attributes: {},
      selfClosing: true,
    },
  ];

  const expected = formatExpectedTags([
    `<meta charset="utf-8" />`,
    `<title>Hello World</title>`,
    `<amp />`,
  ]);

  const actual = makeDocumentHeaders(TITLE, tags);

  t.equal(actual, expected);
  t.end();
});

test('Given a tag with children and no attributes, the head will return as expected', (t) => {
  const tags = [
    {
      type: 'content',
      children: '<h1>This is some stuff!</h1>',
    }
  ];

  const expected = formatExpectedTags([
    `<meta charset="utf-8" />`,
    `<title>Hello World</title>`,
    `<content><h1>This is some stuff!</h1></content>`,
  ]);

  const actual = makeDocumentHeaders(TITLE, tags);

  t.equal(actual, expected);
  t.end();
});

test(`Given a tag that is not self-closing and has no attributes, the head will return as expected`, (t) => {
  const tags = [
    {
      type: 'script',
    }
  ];

  const expected = formatExpectedTags([
    `<meta charset="utf-8" />`,
    `<title>Hello World</title>`,
    `<script></script>`,
  ]);

  const actual = makeDocumentHeaders(TITLE, tags);

  t.equal(actual, expected);
  t.end();
});

test(`Given a tag with attributes, the head will return as expected`, (t) => {
  const tags = [
    {
      type: 'meta',
      attributes: {
        name: 'viewport',
        content: 'user-scalable=no'
      },
      selfClosing: true,
    },
  ];

  const expected = formatExpectedTags([
    `<meta charset="utf-8" />`,
    `<title>Hello World</title>`,
    `<meta name="viewport" content="user-scalable=no" />`,
  ]);

  const actual = makeDocumentHeaders(TITLE, tags);

  t.equal(actual, expected);
  t.end();
});

test(`Given a tag with attributes and children, the head will return as expected`, (t) => {
  const tags = [
    {
      type: 'stuff',
      attributes: {
        name: 'viewport',
        content: 'user-scalable=no'
      },
      children: '<h1>Hello world</h1>',
    },
  ];

  const expected = formatExpectedTags([
    `<meta charset="utf-8" />`,
    `<title>Hello World</title>`,
    `<stuff name="viewport" content="user-scalable=no"><h1>Hello world</h1></stuff>`,
  ]);

  const actual = makeDocumentHeaders(TITLE, tags);

  t.equal(actual, expected);
  t.end();
});

test(`Given a number of tags with attributes and some children, the head will return as expected`, (t) => {
  const tags = [
    {
      type: 'stuff',
      attributes: {
        name: 'viewport',
        content: 'user-scalable=no'
      },
      children: '<h1>Hello world</h1>',
    },
    {
      type: 'meta',
      attributes: {
        name: 'stuff',
        content: 'things=true,lol=true'
      },
      selfClosing: true,
    },
    {
      type: 'script',
      attributes: {
        src: 'http://example.com',
      },
    },
  ];

  const expected = formatExpectedTags([
    `<meta charset="utf-8" />`,
    `<title>Hello World</title>`,
    `<stuff name="viewport" content="user-scalable=no"><h1>Hello world</h1></stuff>`,
    `<meta name="stuff" content="things=true,lol=true" />`,
    `<script src="http://example.com"></script>`,
  ]);

  const actual = makeDocumentHeaders(TITLE, tags);

  t.equal(actual, expected);
  t.end();
});
