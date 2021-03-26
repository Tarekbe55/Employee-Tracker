const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const connection = require("./db.js");
const { printTable } = require("console-table-printer");

const init = () => {
  connection.connect((err) => {
    if (err) throw err;

    console.log(
      chalk.redBright(
        "===================================================================================================="
      )
    );

    console.log(chalk.blueBright(figlet.textSync("Employee Tracker")));

    console.log(
      chalk.yellowBright(
        "                                         Created By: Tarek Behairy"
      )
    );

    console.log(
      chalk.redBright(
        "===================================================================================================="
      )
    );

    mainMenu();
  });
};

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "mainMenuChoice",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Departments",
          "View Roles",
          "View Employees",
          "Update Employee Role",
          "Update Employee Managers",
          "View Employees by Manager",
          "View Total Utilized Budget by Department",
          "Remove Employee",
          "Remove Department",
          "Remove Role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      const answer = response.mainMenuChoice;
      console.log(answer);
      switch (answer) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRoles();
          break;
        case "Add Employee":
          addEmployees();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update Employee Role":
          updateRoles();
          break;
        case "Update Employee Managers":
          updateEmployeeMgr();
          break;
        case "View Employees by Manager":
          viewEmployeeByMgr();
          break;
        case "View Total Utilized Budget by Department":
          departmentBudget();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Remove Department":
          removeDept();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you are adding?",
        name: "addDepartment",
      },
    ])
    .then((response) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: response.addDepartment,
        },
        (err) => {
          if (err) throw err;
          console.log("Your department was created successfully!");

          mainMenu();
        }
      );
    });
};

const addRoles = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    const dept = res.map((dept) => {
      return {
        name: dept.department_name,
        value: dept.id,
      };
    });
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role you are adding?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary of the role you are adding?",
          name: "salary",
        },
        {
          type: "list",
          message: "What is the department of the role?",
          name: "department_id",
          choices: dept,
        },

        //need to join with department id?
      ])
      .then((response) => {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: response.title,
            salary: response.salary,
            department_id: response.department_id,
          },
          (err) => {
            if (err) throw err;
            console.log("Your role was created successfully!");
            mainMenu();
          }
        );
      });
  });
};