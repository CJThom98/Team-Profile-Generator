const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./src/generate-site');
const generatePage = require('./src/page-template');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the of your Team Manager? (Required)',
            validate: managerNameInput => {
                if (managerNameInput) {
                    return true;
                } else {
                    console.log('You must provide the name of your Manager!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee ID of your Team Manager? (Required)',
            validate: managerIdInput => {
                if (managerIdInput) {
                    return true;
                } else {
                    console.log('You must provide the ID of your Manager!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            email: 'email',
            message: 'What is the email of your Team Manager? (Required)',
            validate: managerEmailInput => {
                if (managerEmailInput) {
                    return true;
                } else {
                    console.log('You must provide the email of your Manager!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'office',
            message: 'What is the office number of your Team Manager? (Required)',
            validate: managerOfficeInput => {
                if (managerOfficeInput) {
                    return true;
                } else {
                    console.log('You must provide the office number of your Manager!');
                    return false;
                }
            }
        }
    ]).then(managerData => {
        const {name, id, email, officeNumber} = managerData
            employee = new Manager(name, id, email, officeNumber)
            let role = {role: "Manager"};
            return {...managerData, ...role}
    })
};