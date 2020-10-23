import {promises as fs} from 'fs';
import deepmerge from 'deepmerge';
import scaffoldTesting from './testing-scaffolder';

export default async function ({projectRoot}) {
  const [testingResults] = await Promise.all([
    scaffoldTesting({projectRoot}),
    fs.writeFile(`${projectRoot}/deck.mdx`, '# Hello World')
  ]);

  return deepmerge(
    {
      devDependencies: ['mdx-deck'],
      scripts: {
        start: 'mdx-deck deck.mdx --no-open',
        build: 'mdx-deck build deck.mdx'
      },
      buildDirectory: 'public'
    },
    testingResults
  );
}
