import deepmerge from 'deepmerge';
import * as cypressScaffolder from '@form8ion/cypress-scaffolder';
import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';
import scaffoldTesting from './testing-scaffolder';

suite('testing scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(cypressScaffolder, 'scaffold');
  });

  teardown(() => sandbox.restore());

  test('that cypress is configured for smoke testing', async () => {
    const projectRoot = any.string();
    const cypressResults = any.simpleObject();
    cypressScaffolder.scaffold
      .withArgs({projectRoot, testDirectory: 'test/smoke/', testBaseUrl: 'http://localhost:8000'})
      .resolves(cypressResults);

    assert.deepEqual(
      await scaffoldTesting({projectRoot}),
      deepmerge(
        cypressResults,
        {
          scripts: {
            'test:served': "start-server-and-test 'npm start' http://localhost:8000"
              + " 'npm-run-all --print-label --parallel test:served:*'",
            'test:served:smoke': 'run-s cypress:run'
          },
          devDependencies: ['start-server-and-test']
        }
      )
    );
  });
});
