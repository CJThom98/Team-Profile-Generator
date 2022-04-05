const Employee = require('../lib/Employee');

class Manager extends Employee {
    constructor(name, id, office, email) {
        super(name, id, email);
        this.office = office;
    }

    getOffice() {
        return this.office;
    }

    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;