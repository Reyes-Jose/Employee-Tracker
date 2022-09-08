const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db'
},
    console.log('>>>Connected to the employee DB<<<')
);


function promptUser(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do? ',
            name: 'choice',
            choices: [
                'View All Departments',
                'View All Employees',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'Add Department',
                'Add Employee',
                'Exit'
            ]
        }
        
    ]).then(data => {
        switch(data.choice){
            case 'View All Departments': viewAllDepartments();
             break;

            case 'View All Roles': viewAllRoles();
             break;

            case 'View All Employees': viewAllEmployees();
            break;             
            
            case 'Add Department': addDepartment();
             break;

            case 'Add Role': addRole();
             break;
            
            case 'Update Employee Role': updateEmployeeRole();
             break;

            case 'Add Employee': addEmployee();
             break;

            
            case 'Exit': console.log('Thank you, and goodbye');
             break;
        }
    })
}

function viewAllDepartments(){
    db.query('SELECT * FROM department', (err, results) => {
        console.table(results);
        promptUser();
    })    
}

function viewAllRoles(){
    db.query('SELECT * FROM role', (err, results) => {
        console.table(results);
        promptUser();
    })
}

function viewAllEmployees(){
    db.query('SELECT * FROM employee', (err, results) => {
        console.table(results);
        promptUser();
    })
}

function addDepartment(){
    inquirer.prompt(
        {
            type: 'input',
            message: 'Add department name: ',
            name: 'depName',
        }
    ).then((data) => {
        db.query('INSERT INTO department (name) VALUES (?)', [data.depName], () =>{
            console.log('Department has been added');
            promptUser();
        })
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Add role name: ',
            name: 'roleName',
        },
        {
            type: 'input',
            message: 'Add department I.D: ',
            name: 'depId',
        },
        {
            type: 'input',
            message: 'Add Salary: ',
            name: 'salaryBase',
        },
    ]).then(data => {
        db.query('INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)', [data.roleName, data.depId, data.salaryBase], (err, results) => {
            console.log('Role has been added');
            promptUser();
        })
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Add employees first name',
            name: 'empName',
        },
        {
            type: 'input',
            message: 'Add employees last name',
            name: 'empLastName',
        },
        {
            type: 'input',
            message: 'Add employees role',
            name: 'empRole',
        },
        {
            type: 'input',
            message: 'Add managers ID',
            name: 'manId',
        },
    ]).then(data => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.empName, data.empLastName, data.empRole, data.manId], (err, results) => {
            console.log('Employee has been added');
            promptUser();
        })
    })
}

promptUser();







