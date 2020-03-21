import * as yargs from 'yargs';
import {default as chalk} from 'chalk';
import {default as clear} from 'clear';
import {default as figlet} from 'figlet';
import {execSync} from 'child_process';

import {mainMenu, newUser} from './lib/inquirer.js';
import * as files from './lib/files.js';

const createClient = (clientName) => {
    console.log(chalk.red(`Creating new client: "${clientName}"`));
    execSync(`/root/EasyRSA-3.0.4/easyrsa gen-req ${clientName} nopass`);
}

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
            createClient(clientName);
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