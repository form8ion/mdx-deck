import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('an initial deck is available', async function () {
  const {devDependencies, scripts} = this.results;

  assert.deepEqual(devDependencies, ['mdx-deck']);
  assert.deepEqual(scripts, {start: 'mdx-deck deck.mdx'});
});
