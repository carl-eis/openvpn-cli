import { default as inquirer } from 'inquirer';

export const newUser = () => {
    const questions = [{
        name: 'clientName',
        type: 'input',
        message: 'Enter the vpn client name:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a name.';
            }
        }
    }];
    return inquirer.prompt(questions);
}

export const mainMenu = () => {
    const questions = [
        {
            name: 'selectedAction',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                { name: 'Create a new user', value: 'create_new' },
                { name: 'Exit', value: 'exit' },
            ],
        },
    ];
    return inquirer.prompt(questions);
}
