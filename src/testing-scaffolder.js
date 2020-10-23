import deepmerge from 'deepmerge';
import {scaffold as scaffoldCypress} from '@form8ion/cypress-scaffolder';
import {scaffold as scaffoldVulnerable} from '@form8ion/is-website-vulnerable';

export default async function ({projectRoot}) {
  const devServerUrl = 'http://localhost:8000';

  const [cypressResults, vulnerableResults] = await Promise.all([
    scaffoldCypress({projectRoot, testDirectory: 'test/smoke/', testBaseUrl: devServerUrl}),
    scaffoldVulnerable({baseUrl: devServerUrl})
  ]);

  return deepmerge.all([
    cypressResults,
    vulnerableResults,
    {
      scripts: {
        'test:served': 'start-server-and-test '
          + `'npm start' ${devServerUrl} 'npm-run-all --print-label --parallel test:served:*'`,
        'test:served:smoke': 'run-s cypress:run'
      },
      devDependencies: ['start-server-and-test']
    }
  ]);
}
