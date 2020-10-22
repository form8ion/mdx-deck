import {assert} from 'chai';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  test('that the mdx-deck details are defined', async () => {
    const {devDependencies, scripts} = await scaffold();

    assert.deepEqual(devDependencies, ['mdx-deck']);
    assert.deepEqual(scripts, {start: 'mdx-deck deck.mdx'});
  });
});
