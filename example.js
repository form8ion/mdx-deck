// #### Import
// remark-usage-ignore-next 2
import {resolve} from 'path';
import stubbedFs from 'mock-fs';
import {scaffold} from './lib/index.cjs';

// remark-usage-ignore-next 3
stubbedFs({
  node_modules: stubbedFs.load(resolve(...[__dirname, 'node_modules']))
});

// #### Execute

(async () => {
  await scaffold({projectRoot: process.cwd()});
})();
