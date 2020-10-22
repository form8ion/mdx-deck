import deepmerge from 'deepmerge';
import {scaffold as scaffoldCypress} from '@form8ion/cypress-scaffolder';

export default async function ({projectRoot}) {
  return deepmerge(
    await scaffoldCypress({projectRoot, testDirectory: 'test/smoke/'}),
    {
      scripts: {
        'test:served': 'start-server-and-test '
          + "'npm start' http://localhost:8000 'npm-run-all --print-label --parallel test:served:*'",
        'test:served:smoke': 'run-s cypress:run'
      },
      devDependencies: ['start-server-and-test']
    }
  );
}
