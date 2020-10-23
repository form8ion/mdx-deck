import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the deck can be deployed as a static site', async function () {
  const {scripts, buildDirectory} = this.results;

  assert.equal(buildDirectory, 'public');
  assert.equal(scripts.build, 'mdx-deck build deck.mdx');
});
