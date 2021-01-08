import { program } from 'commander';
import init from '..';
import { exportService } from '../service/serviceIO';
import loadUserData from '../config/configService';

export default class Application {
  private readonly MINIMUM_ARGS_SIZE = 2;

  private processArgs = (args: string[]) => {
    console.log(args);
    program
      .version('0.0.1')
      .option('-e, --extract <path>', 'extracts services from docker-compose', 'docker-compose.yml')
      .parse(args);
  };

  run() {
    loadUserData()
      .then((templatePath: string) => {
        if (process.argv.length <= this.MINIMUM_ARGS_SIZE) {
          init();
        } else {
          this.processArgs(process.argv);

          const extractPath = program.extract;

          if (extractPath.length > 0) {
            exportService(templatePath, extractPath);
          }
        }
      });
  }
}
