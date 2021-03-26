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
    //begins questioning
    mainMenu();
  });
};