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
            name: 'email',
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

const promptEmployee = managerData => {
    if (!managerData.engineers) {
        managerData.engineers = [];
    }

    if (!managerData.interns) {
        managerData.interns = [];
    }

    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Would you like to add an Engineer, Intern, or have you finished building your team?",
            choices: ['Engineer', 'Intern', 'Finished']
        }
    ]).then(({ role }) => {
        if (role === "Engineer") {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is their name? (Required)',
                    validate: engineerNameInput => {
                        if (engineerNameInput) {
                            return true;
                        } else {
                            console.log('Your Engineer is a person, you must provide their name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'What is your Engineer\'s employee ID? (Required)',
                    validate: engineerIdInput => {
                        if (engineerIdInput) {
                            return true;
                        } else {
                            console.log('Oh come on, you have to know this. Provide the ID of your Engineer.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'What is the email of your Engineer? (Required)',
                    validate: engineerEmailInput => {
                        if (engineerEmailInput) {
                            return true;
                        } else {
                            console.log('Seriously? How do you not know their email? How have you all been communicating? Please give their email address.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'github',
                    message: 'What is their GitHub username? (Required)',
                    validate: engineerGithubInput => {
                        if (engineerGithubInput) {
                            return true;
                        } else {
                            console.log('Their GitHub. You know, the site that holds all of their work? The site you judged on whether they are appropriate for the role? That is the username we need, please provide it.');
                            return false;
                        }
                    }
                }
            ]).then(employeeData => {
                employee = new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github)
                let role = {role: "Engineer"}
                managerData.engineers.push({...employeeData, ...role})
                return promptEmployee(managerData)
            })
        } else if (role === "Intern") {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of your Intern? (Required)',
                    validate: internNameInput => {
                        if (internNameInput) {
                            return true;
                        } else {
                            console.log('Oh come on! The poor kid isn\'t even getting paid! The least you could do is learn their name. Please provide their name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'What is the ID of your Intern? (Required)',
                    validate: internIdInput => {
                        if (internIdInput) {
                            return true;
                        } else {
                            console.log('I am beginning to worry about the organization of your team. Please provide their ID.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'What is the email your Intern uses? (Required)',
                    validate: internEmailInput => {
                        if (internEmailInput) {
                            return true;
                        } else {
                            console.log('Do you even communicate with your team? They have to at least have a school email. Please provide the Interns email!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'school',
                    message: 'What is school you Intern goes to? (Required)',
                    validate: internSchoolInput => {
                        if (internSchoolInput) {
                            return true;
                        } else {
                            console.log('*Sigh* How do you not--you know, nevermind. Just ask them what their school is and come back to provide it.');
                            return false;
                        }
                    }
                },
            ]).then(employeeData => {
                employee = new Intern(employeeData.name, employeeData.id, employeeData.email, employeeData.school)
                let role = {role: "Intern"}
                managerData.interns.push({...employeeData, ...role})
                return promptEmployee(managerData)
            })
        } else {
            return managerData
        }
    })
};

promptManager()
.then(promptEmployee)
.then(managerData => {
    return generatePage(managerData);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
})
.then(copyFileResponse => {
    console.log(copyFileResponse);
})
.catch(err => {
    console.log(err);
});