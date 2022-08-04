import {resolve} from 'path';
import {promises as fs} from 'fs';
import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const packagePreviewDirectory = '../__package_previews__/mdx-deck';
const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '../../../../', 'node_modules'));

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const mdxDeck = require('@form8ion/mdx-deck');
  const {scaffold} = mdxDeck;

  stubbedFs({
    node_modules: stubbedNodeModules,
    [packagePreviewDirectory]: {
      '@form8ion': {
        'mdx-deck': {
          node_modules: {
            '.pnpm': {
              '@form8ion+cypress-scaffolder@3.0.0': {
                node_modules: {
                  '@form8ion': {
                    'cypress-scaffolder': {
                      templates: {
                        'canary-spec.js': await fs.readFile(resolve(
                          __dirname,
                          '../../../../',
                          'node_modules/@form8ion/cypress-scaffolder/templates/canary-spec.js'
                        ))
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  this.results = await scaffold({projectRoot: process.cwd()});
});
