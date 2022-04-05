const inquiere = require('inquirer');
const { writeFile, copyFile } = require('./src/generate-site');
const generatePage = require('./src/page-template');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');