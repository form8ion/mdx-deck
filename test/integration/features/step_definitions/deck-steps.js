import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('an initial deck is available', async function () {
  const {devDependencies, scripts} = this.results;

  assert.include(devDependencies, 'mdx-deck');
  assert.equal(scripts.start, 'mdx-deck deck.mdx --no-open');
  assert.equal(await fs.readFile(`${process.cwd()}/deck.mdx`, 'utf-8'), '# Hello World');
});
