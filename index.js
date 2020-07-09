const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    password: "Pacman444#1",
    user: "root",
    database: "employeesql"

})

connection.connect(function (err) {
    if (err) throw err
    start()
})

function start() {
    inquirer.prompt([
        {
            name: 'options',
            type: 'list',
            message: 'will you like to do?',
            choices: [
                "add department",
                "add roles",
                "add employees",
                "view department",
                "view roles",
                "view employees",
                "update employee role"
            ]

        }


    ]).then(function (answers) {
        switch (answers.options) {
            case "add department": addDepartment()

                break;
            case "view department": viewDepartment()

                break;
            case "add roles": addRole()

                break;
            case "view roles": viewRole()

                break;
            case "add employees": addEmployees()

                break;
            case "view employees": viewEmployees()
                break;
            case "update employee role": updateEmployeesRole()
                break;
            default:
                break;
        }
    })




}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "what is the department's name?"
        },
        {
            type: "number",
            name: "depId",
            message: "what is the department's id"
        }

    ]).then(function (answer) {
        const query = "Insert Into department SET ?"
        connection.query(query, {
            name: answer.departmentName,
            id: answer.depId
        },
            function (err) {
                if (err) throw err
                console.log("Department added")
                start()
            })
    })



};

function viewDepartment() {
    const query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "-" + res[i].name)
        }
        start()
    })
}

function addRole() {

    inquirer.prompt([
        {
            type: "number",
            name: "roleId",
            message: "what is the role id?"
        },
        {
            type: "input",
            name: "roleTitle",
            message: "what is the roles title?"
        },
        {
            type: "number",
            name: "roleSalary",
            message: "what is the salary for this role?"
        },
        {
            type: "input",
            name: "roleDepId",
            message: "what is the roles department id?"
        }
    ]).then(function (answers) {
        const query = "INSERT INTO roles SET ?";
        connection.query(query, {
            id: answers.roleId,
            salary: answers.roleSalary,
            title: answers.roleTitle,
            department_id: answers.roleDepId
        },
            function (err) {
                if (err) throw err;
                console.log("role added")
                start()
            })

    })

}

function viewRole() {
    const query = "SELECT * FROM roles"
    connection.query(query, function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            console.log('role id:' + res[i].id + "||" + ' role salary:' + res[i].salary + "||" + ' role title:' + res[i].title + "||" + ' roles department id:' + res[i].department_id)
        }
        start()
    })
}

function addEmployees() {
    inquirer.prompt([
        {
            name: 'employeeId',
            type: 'number',
            message: 'what is the employees id?'
        },
        {
            name: 'employeesFirstName',
            type: 'input',
            message: 'what is the employees first name?'
        },
        {
            name: 'employeesLastName',
            type: 'input',
            message: 'what is the employees last name?'
        },
        {
            name: 'employeeRoleId',
            type: 'number',
            message: 'what is the employees role id?'
        },
        {
            name: 'employeeManagerId',
            type: 'number',
            message: 'what is the employees managers id?'
        }
    ]).then(function (answers) {
        const query = "INSERT INTO employees SET ?"
        connection.query(query, {
            id: answers.employeeId,
            first_name: answers.employeesFirstName,
            last_name: answers.employeesLastName,
            role_id: answers.employeeRoleId,
            manager_id: answers.employeeManagerId

        }, function (err) {
            if (err) throw err;
            console.log("employee added")
            start()
        })
    })
}

function viewEmployees() {
    const query = "SELECT * FROM employees"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('employee id: ' + res[i].id + '||' + ' employee first name: ' + res[i].first_name + '||' + 'employee last name: ' + res[i].last_name + '||' + 'employees role id: ' + res[i].role_id + '||' + 'employees manager id: ' + res[i].manager_id)
        }
        start()
    })
}

function updateEmployeesRole() {

    inquirer.prompt([
        {
            name: 'emploId',
            type: 'number',
            message: 'what is the emplyees id?'
        },
        {
            name: 'newRoleId',
            type: 'number',
            message: 'what do you want to update the employees role id to?'
        }
    ]).then(function (answer) {
        connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [answer.newRoleId, answer.emploId],
            function (err, res) {
                if (err) throw err
                console.log('update complete ' + res.affectedRows + " role id updated")
                start()
            }
        )
    })


}