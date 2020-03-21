import * as yargs from 'yargs';
import { default as chalk } from 'chalk';
import { default as clear } from 'clear';
import { default as figlet } from 'figlet';
import { execSync } from 'child_process';

import { mainMenu, newUser } from './lib/inquirer.js';
import * as files from './lib/files.js';

// Hard-coded working directory
const EASY_RSA_DIRECTORY = `/root/EasyRSA-3.0.4`;

const createClient = (clientName) => {
    // Setup working directory config
    const config = {
        cwd: `${EASY_RSA_DIRECTORY}/`,
    };

    const commands = [{
        info: `Generating client key for: "${clientName}"`,
        command: `(echo "${clientName}" && cat) | ${EASY_RSA_DIRECTORY}/easyrsa gen-req ${clientName} nopass`,
    }, {
        info: `Coping key to keys folder: "${clientName}"`,
        command: `cp pki/private/${clientName}.key ~/client-configs/keys/`,
    }, {
        info: `Signing client request: "${clientName}"`,
        command: `(echo "yes" && cat) | ./easyrsa sign-req client ${clientName}`,
    }, {
        info: `Copying client certificate back to user keys directory`,
        command: `cp pki/issued/${clientName}.crt /root/client-configs/keys`,
    }, {
        info: `Copying ca and ta files to config directory (1)`,
        command: `cp ${EASY_RSA_DIRECTORY}/ta.key ~/client-configs/keys/`,
    }, {
        info: `Copying ca and ta files to config directory (2)`,
        command: `/etc/openvpn/ca.crt ~/client-configs/keys/`,
    }]

    commands.forEach(({ command, info }) => {
        console.log('\n' + chalk.red(info));
        execSync(command, config);
    })
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

    switch (selectedAction) {
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
