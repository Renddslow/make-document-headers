# Make Document Headers

> 

## Install

```
yarn add make-document-headers
```

## Usage

```js
const makeDocumentHeaders = require('make-document-headers');

makeDocumentHeaders('Neat Site', [
	{
		type: 'meta',
		attributes: { 
			name: 'viewport', 
			content: 'initial-scale=1.0',
        },
		selfClosing: true,
	},
	{
        type: 'meta',
        attributes: { 
        	name: 'description', 
        	content: 'This is the coolest site!',
        },
        selfClosing: true,
    },
    {
        type: 'script',
        attributes: { 
        	src: 'http://cdn.example.com/hello.js',
        },
        children: '(function() { run(); })();',
    },
]);
```

Generates:

```html
<head>
    <meta charset="utf-8" />
    <title>Neat Site</title>
    <meta name="viewport" content="initial-scale=1.0" />
    <meta name="description" content="This is the coolest site!" />
    <script src="http://cdn.example.com/hello.js">(function() { run(); })();</script>
</head>
```

## API

### makeDocumentHeaders(title, tags)


**title**

Type: `string`

The document title

**tags**

Type: `Array<Object>`

An array of tag objects

**Tag**

- `type`: The tag type as a string (e.g. `script`, `meta`, `link`)
- `attributes`: An object of attributes where the key is the attribute and the value is the attribute value
- `selfClosing`: A boolean denoting whether or not the tag should be self-closing
- `children`: A string with the children to be nested inside the tag
