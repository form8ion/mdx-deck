import {promises as fs} from 'fs';

export default async function ({projectRoot}) {
  await fs.writeFile(`${projectRoot}/deck.mdx`, '# Hello World');

  return {
    devDependencies: ['mdx-deck'],
    scripts: {start: 'mdx-deck deck.mdx --no-open'}
  };
}
