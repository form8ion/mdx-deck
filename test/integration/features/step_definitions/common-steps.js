import {resolve} from 'path';
import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '../../../../', 'node_modules'));

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const mdxDeck = require('@form8ion/mdx-deck');
  const {scaffold} = mdxDeck;

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  this.results = await scaffold();
});
