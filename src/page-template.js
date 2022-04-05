const fs = require('fs');

const generateManager = Manager => {
    return `
        <div class="card cardA" style="width: 20rem;">
        <h4 class="card-header">${Manager.name}</h4>
        <h5 class="card-header">${Manager.role}</h5>
            <div class="card-body">
                <ul class="list-group list-group-flush'>
                    <li class="list-group-item">ID: ${Manager.id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${Manager.email}">${Manager.email}</a></li>
                    <li class="list-group-item">Office Number: ${Manager.office}</li>
                </ul>
            </div>
        </div>
    `;
};

const generateEngineers = engineersArr => {
    return `
        ${engineersArr
            .map(({ name, id, email, github, role }) => {
                return `
                <div class="card cardB" style="width: 20rem;">
                <h4 class="card-header">${name}</h4>
                <h5 class="card-header">👓${role}</h5>  
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${id}</li>
                            <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                            <li class="list-group-item">GitHub: <a href="https://www.github.com/${github}" target="_blank">${github}</a></li>
                        </ul>  
                    </div>
                </div>
                `;
            })
        .join('')}
    `};

const generateInters = internsArr => {

};

module.exports = templateData => {

};