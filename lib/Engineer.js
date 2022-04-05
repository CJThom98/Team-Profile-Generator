const Employee = require('../lib/Employee');

class Engineer extends Employee {
    constructor(name, id, github, email) {
        super(name, id, email);
        this.github = github;
    }

    getGitHub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;