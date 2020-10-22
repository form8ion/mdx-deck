import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('smoke tests are wired up', async function () {
  const {devDependencies, scripts} = this.results;

  ['cypress', 'start-server-and-test'].forEach(dependency => assert.include(devDependencies, dependency));
  assert.include(
    scripts,
    {
      'cypress:run': 'cypress run',
      'cypress:open': 'cypress open',
      'test:served':
        "start-server-and-test 'npm start' http://localhost:8000 'npm-run-all --print-label --parallel test:served:*'",
      'test:served:smoke': 'run-s cypress:run'
    }
  );
  assert.deepEqual(
    JSON.parse(await fs.readFile(`${process.cwd()}/cypress.json`)),
    {
      integrationFolder: 'test/smoke/',
      baseUrl: 'http://localhost:8000'
    }
  );
});
