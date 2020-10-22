import {promises as fs} from 'fs';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that the mdx-deck details are defined', async () => {
    const projectRoot = any.string();

    const {devDependencies, scripts} = await scaffold({projectRoot});

    assert.deepEqual(devDependencies, ['mdx-deck']);
    assert.deepEqual(scripts, {start: 'mdx-deck deck.mdx'});
    assert.calledWith(fs.writeFile, `${projectRoot}/deck.mdx`, '# Hello World');
  });
});
