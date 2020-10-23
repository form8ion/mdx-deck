import {promises as fs} from 'fs';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as testingScaffolder from './testing-scaffolder';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'writeFile');
    sandbox.stub(testingScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the mdx-deck details are defined', async () => {
    const projectRoot = any.string();
    const testingDevDependencies = any.listOf(any.word);
    const testingScripts = any.simpleObject();
    testingScaffolder.default
      .withArgs({projectRoot})
      .resolves({devDependencies: testingDevDependencies, scripts: testingScripts});

    const {devDependencies, scripts, buildDirectory} = await scaffold({projectRoot});

    assert.deepEqual(devDependencies, ['mdx-deck', ...testingDevDependencies]);
    assert.deepEqual(
      scripts,
      {
        start: 'mdx-deck deck.mdx --no-open',
        build: 'mdx-deck build deck.mdx',
        ...testingScripts
      }
    );
    assert.equal(buildDirectory, 'public');
    assert.calledWith(fs.writeFile, `${projectRoot}/deck.mdx`, '# Hello World');
  });
});
