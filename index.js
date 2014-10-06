#!/usr/bin/env node
'use strict';

var inquirer = require("inquirer");
var spawny = require("spawny");
var chalk = require('chalk');

var commands =  {
    'See Memory Usage': 'ps aux --sort -rss',
    'Show Apache Logs': 'sudo tail -f /var/log/apache2/error.log',
    'Install Server Updates': 'sudo unattended-upgrade',
    'Restart Server': 'sudo reboot',
    'Restart Apache': 'sudo service apache2 restart',
    'Restart MySQL': 'sudo service mysql restart',
    'sep': '',
    'Update Server Tools': 'sudo npm install -g robinsoncollegeboatclub/server-tools --update',
    'Close Server Tools': 'echo "this should never be executed"'
};

chooseCommand();

function chooseCommand() {
  var choices = [];

  for (var choice in commands) {
    if (commands.hasOwnProperty(choice)) {
      if(choice == 'sep') {
        choices.push(new inquirer.Separator());
      } else {
        choices.push(choice);
      }
    }
  }

  inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'What would you like to do?',
      choices: choices
    }
  ], function(answers) {
    parseCommand(answers.command);
  });
}

function parseCommand(command) {
  if(command == 'Close Server Tools') {
    return;
  }

  executeCommand(commands[command]);
}

function executeCommand(command) {
  console.log("Executing command: " + chalk.cyan(command));
  spawny(command, true, chooseCommand);
}
