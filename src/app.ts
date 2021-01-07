#!/usr/bin/env node

import { program } from 'commander';
import init from './logic';
import load from './logic/loadCompose';
import { loadUserData } from './logic/data/userData'

loadUserData().then((templatePath: string) => {
  if (process.argv.length <= 2) {
    init();
  } else {
    program
      .version('0.0.1')
      .option('-l, --load <path>', 'loads docker-compose file and extracts services', 'docker-compose.yml')
      .parse(process.argv);
  
      if (program.load.length > 0) {
        load(templatePath, program.load);
      }
  }
});