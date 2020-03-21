import * as yargs from 'yargs';
import {default as chalk} from 'chalk';
import {default as clear} from 'clear';
import {default as figlet} from 'figlet';

import {mainMenu, newUser} from './lib/inquirer.js';
import * as files from './lib/files.js';

const main = async () => {
    clear();

    const equals = chalk.blue('\n==============================================\n');
    const appName = chalk.yellow(figlet.textSync('VPN Cli', { horizontalLayout: 'full' }));
    const appVersion = '1.0.0';
    const versionStr = chalk.red(`Version: ${appVersion}`);
    const authorStr = chalk.red('Author: Carl Eiserman');

    console.log(`${equals}${appName}\n${versionStr}\n${authorStr}${equals}`);

    if (files.directoryExists('.git')) {
        console.log(chalk.red('Git repository detected!'));
    } else {
        // console.log(chalk.red('not a git repo yet!'));
    }

    const { selectedAction } = await mainMenu();

    switch(selectedAction) {
        case 'create_new': {
            const { clientName } = await newUser();
            console.log(clientName);
            break;
        }
        case 'exit': {
            break;
        }
        default:
            break;
    }
}

main();