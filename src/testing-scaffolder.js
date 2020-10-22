import deepmerge from 'deepmerge';
import {scaffold as scaffoldCypress} from '@form8ion/cypress-scaffolder';

export default async function ({projectRoot}) {
  const devServerUrl = 'http://localhost:8000';

  return deepmerge(
    await scaffoldCypress({projectRoot, testDirectory: 'test/smoke/', testBaseUrl: devServerUrl}),
    {
      scripts: {
        'test:served': 'start-server-and-test '
          + `'npm start' ${devServerUrl} 'npm-run-all --print-label --parallel test:served:*'`,
        'test:served:smoke': 'run-s cypress:run'
      },
      devDependencies: ['start-server-and-test']
    }
  );
}
