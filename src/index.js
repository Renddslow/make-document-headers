// @flow
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { get } = require('dot-prop');

type Tag = {
  type: string;
  attributes?: Object;
  children?: any;
  selfClosing: boolean;
}

module.exports = (title: string, tags: Array<Tag>): string => {
  const document = fs.readFileSync(path.join(__dirname, '..', 'src/template', 'document.ejs'));
  const documentTemplate = ejs.compile(document.toString());

  const renderedTags = tags.map(tag).join(`\n\t`);
  return documentTemplate({ title, tags: renderedTags });
};

const tag = (data: Tag) => {
  const attributes = get(data, 'attributes', {});
  const tagAttributes = Object.keys(attributes)
    .map((key) => `${key}="${attributes[key]}"`);

  const tagOpening = (`<${data.type} ${tagAttributes.join(' ')}`).trim();

  if (data.children) {
    return `${tagOpening}>${data.children}</${data.type}>`;
  }

  if (data.selfClosing) {
    return `${tagOpening} />`;
  }

  return `${tagOpening}></${data.type}>`;
};
