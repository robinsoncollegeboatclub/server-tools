#!/usr/bin/env node
'use strict';

var inquirer = require("inquirer");
var spawny = require("spawny");
var chalk = require('chalk');

var commands =  [
    'Restart apache',
    'Update Server Tools',
    'Close Server Tools'
];

chooseCommand();

function chooseCommand() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'What would you like to do?',
      choices: commands
    }
  ], function(answers) {
    parseCommand(answers.command);
  });
}

function parseCommand(command) {
  if(command == 'Close Server Tools') {
    return;
  }

  if(command == 'Restart apache') {
    executeCommand('service apache2 restart')
  }

  if(command == 'Update Server Tools') {
    executeCommand('npm install -g robinsoncollegeboatclub/server-tools')
  }
}

function executeCommand(command) {
  console.log("Executing command: " + chalk.cyan(command));
  spawny(command, true, chooseCommand);
}
